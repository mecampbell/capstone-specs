import { Piece, Position, samePosition, TeamType } from "../../Constants";

export function tileIsOccupied(position: Position, boardState: Piece[]): boolean {

 const piece = boardState.find((p) => samePosition(p.position, position));
 
 if (piece) {
     return true
 } else {
     return false;
 }
}

export function tileIsOccupiedByOpponent (position: Position, boardState: Piece[], team: TeamType): boolean {
 
 const piece = boardState.find((p) => samePosition(p.position, position) && p.team !== team);
 
 if (piece) {
     return true;
 } else {
     return false;
 }

}

export function tileIsEmptyorOccupiedByOpponent (position: Position, boardState: Piece[], team: TeamType) {
    return (
     !tileIsOccupied(position, boardState) || 
     tileIsOccupiedByOpponent(position, boardState, team)
 );
}




export function stalemate () {
    console.log('stalemate')
}
// STILL A WORK IN PROGRESS
export function check () {
    console.log('check')
}

export function checkmate () {
    console.log('checkmate')
}

