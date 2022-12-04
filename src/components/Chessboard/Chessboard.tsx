import './Chessboard.css'
import Referee from '../../referee/Referee';
import Tile from '../Tiles/Tile';
import React, { useRef, useState } from 'react';
import { VERTICAL_AXIS, HORIZONTAL_AXIS, Piece, TeamType, PieceType, initialBoardState, Position, GRID_SIZE, GRID_CENTER, samePosition } from '../../Constants';

export default function Chessboard() {
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [promotionPawn, setPromotionPawn] = useState<Piece>()
    const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 })
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const chessboardRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const referee = new Referee();

    function updateValidMoves() {
        setPieces((currentPieces) => {
            return currentPieces.map(p => {
                p.possibleMoves = referee.getValidMoves(p, currentPieces);
                return p;
            });
        });
    }

    function grabPiece(e: React.MouseEvent) {
        updateValidMoves();
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;
        if(element.classList.contains("chess-piece") && chessboard) {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));

            setGrabPosition({
                x: grabX,
                y: grabY,
            })

            const x = e.clientX - GRID_CENTER;
            const y = e.clientY - GRID_CENTER;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }

    function movePiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if (activePiece && chessboard) {
            const minX = chessboard.offsetLeft - 25;
            const minY = chessboard.offsetTop - 25;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
            const x = e.clientX - 50;
            const y = e.clientY - 50 ;
            activePiece.style.position = "absolute";
            // controls the movement of the pieces to stay within the board
            if (x < minX) {
                activePiece.style.left = `${minX}px`;                
            } else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;                
            } else {
                activePiece.style.left = `${x}px`;
            }

            if (y < minY) {
                activePiece.style.top = `${minY}px`;                
            } else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;                
            } else {
                activePiece.style.top = `${y}px`;
            }
        }
    }

    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE));
            
            const currentPiece = pieces.find((p) => 
                samePosition(p.position, grabPosition)
            );

            if (currentPiece) {                
                const validMove = referee.isValidMove(
                    grabPosition, 
                    {x, y}, 
                    currentPiece.type, 
                    currentPiece.team, 
                    pieces
                )

                const isEnPassantMove = referee.isEnPassantMove(
                    grabPosition, 
                    {x, y}, 
                    currentPiece.type, 
                    currentPiece.team, 
                    pieces
                );
                
                const pawnDirection = (currentPiece.team === TeamType.OUR) ? 1 : -1;

                if (isEnPassantMove) {
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if (samePosition(piece.position, grabPosition)) {
                            piece.enPassant = false;
                            piece.position.x = x;
                            piece.position.y = y;
                            results.push(piece);
                        } else if (!(samePosition(piece.position, {x, y: y-pawnDirection}))) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece)
                        }
                        return results;
                    }, [] as Piece[])
                    setPieces(updatedPieces);
                    console.log('en passant')
                }   else if (validMove) {
                    // ALLOWS PIECE TO MOVE TO X/Y POSITION IF MOVE IS VALID
                    const updatedPieces = pieces.reduce((results, piece) => {
                        if (samePosition(piece.position, grabPosition)) {
                            piece.enPassant = 
                                Math.abs(grabPosition.y - y) === 2 && 
                                piece.type === PieceType.PAWN

                            piece.position.x = x;
                            piece.position.y = y;

                            let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0;

                            if(y === promotionRow && piece.type === PieceType.PAWN) {
                                modalRef.current?.classList.remove("hidden");
                                setPromotionPawn(piece);
                                console.log('promote')
                            }
                            results.push(piece);
                        } else if (!(samePosition(piece.position, {x, y}))) {
                            if (piece.type === PieceType.PAWN) {
                                piece.enPassant = false;
                            }
                            results.push(piece)
                        }    
                        return results;
                    }, [] as Piece[]);
                    setPieces(updatedPieces);
                    console.log('move')
                } else {
                    // RESETS THE PIECES IF MOVE IS INVALID
                    activePiece.style.position = "relative";
                    activePiece.style.removeProperty("top");
                    activePiece.style.removeProperty("left");
                    console.log('invalid move')
                }
            }
            setActivePiece(null);
        }
    }

    function promotePawn(pieceType: PieceType) {
        if (promotionPawn === undefined) {
            return;
        }

        const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, promotionPawn.position)) {
                piece.type = pieceType;
                const teamType = (piece.team === TeamType.OUR) ? "w" : "b";
                let pieceImage = ""
                switch(pieceType) {
                    case PieceType.ROOK: {
                        pieceImage = "rook";
                        break;
                    }
                    case PieceType.KNIGHT: {
                        pieceImage = "knight";
                        break;
                    }
                    case PieceType.BISHOP: {
                        pieceImage = "bishop";
                        break;
                    }
                    case PieceType.QUEEN: {
                        pieceImage = "queen";
                        break;
                    }
                }
                piece.image = `assets/images/${pieceImage}_${teamType}.png`;
            }
            results.push(piece);
            return results;
        }, [] as Piece[])

        setPieces(updatedPieces);
        modalRef.current?.classList.add("hidden");
    }

    let board = [];

    function promotionTeamType () {
        return (promotionPawn?.team === TeamType.OUR) ? "w" : "b"
    }

    //RENDERS THE PIECE IMAGES
    for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
        for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
            const number = j + i + 2;
            const piece = pieces.find((p) => 
                samePosition(p.position, {x: i, y: j})
            );
            let image = piece ? piece.image : undefined;

            let currentPiece = activePiece != null ? pieces.find(p => samePosition(p.position, grabPosition)) : undefined;
            let highlight = currentPiece?.possibleMoves ?
            currentPiece.possibleMoves.some(p => samePosition(p, {x: i, y: j})) : false;

            board.push(<Tile key={`${j},${i}`} image={image} number={number} highlight={highlight} />)
        }
    }

    return (
    <>
    <div>
        <button onClick={() => window.location.reload()}>Reset board</button>
    </div>
        <div id="pawn-promotion-modal" className='hidden' ref={modalRef}>
            <div className="modal-body">
                <img onClick={() => {promotePawn(PieceType.ROOK)}} src={`/assets/images/rook_${promotionTeamType()}.png`} alt='Rook'/>
                <img onClick={() => {promotePawn(PieceType.KNIGHT)}} src={`/assets/images/knight_${promotionTeamType()}.png`} alt='Knight'/>
                <img onClick={() => {promotePawn(PieceType.BISHOP)}} src={`/assets/images/bishop_${promotionTeamType()}.png`} alt='Bishop'/>
                <img onClick={() => {promotePawn(PieceType.QUEEN)}} src={`/assets/images/queen_${promotionTeamType()}.png`} alt='Queen'/>
            </div>
        </div>
        <div 
            onMouseMove={(e) => movePiece(e)} 
            onMouseDown={(e) => grabPiece(e)} 
            onMouseUp={(e) => dropPiece(e)}
            id="chessboard"
            ref={chessboardRef}>
        {board}
        </div>
    </>
    )
}