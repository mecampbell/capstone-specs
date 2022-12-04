import { TeamType, Piece, Position } from "../../Constants";
import { tileIsEmptyorOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

export function whiteLongCastle(initialPosition: Position, boardState: Piece[]): boolean {
    
    if(initialPosition.x === 0) {
        if(initialPosition.y === 0) {
            console.log(boardState.slice(0, boardState.length))
            return true;
        }
    }
    return false;
}

export function rookMove(initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean {
 if(desiredPosition.x === initialPosition.x) {
     for(let i = 1; i < 8; i++) {
         let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1;
         
         let passedPosition: Position = {x: initialPosition.x, y: initialPosition.y + (i*multiplier)}; 
         if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
             if(tileIsEmptyorOccupiedByOpponent(passedPosition, boardState, team)) {
                 return true;
             }
         } else {
             if (tileIsOccupied(passedPosition, boardState)) {
                 break;
             }
         }
     }
 }

 if(desiredPosition.y === initialPosition.y) {
     for(let i = 1; i < 8; i++) {
         let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1;
         
         let passedPosition: Position = {x: initialPosition.x + (i*multiplier), y: initialPosition.y}; 
         if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
             if(tileIsEmptyorOccupiedByOpponent(passedPosition, boardState, team)) {
                 return true;
             }
         } else {
             if (tileIsOccupied(passedPosition, boardState)) {
                 break;
             }
         }
     }
 }
 return false;
}

export function getPossibleRookMoves(rook: Piece, boardState: Piece[]) : Position [] {
    const possibleMoves: Position[] = [];

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: rook.position.x + i, y: rook.position.y }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, rook.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: rook.position.x - i, y: rook.position.y }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, rook.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: rook.position.x, y: rook.position.y + i }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, rook.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: rook.position.x, y: rook.position.y - i}

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, rook.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
}