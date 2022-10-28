import { TeamType, Piece, Position } from "../../Constants";
import { tileIsOccupied, tileIsEmptyorOccupiedByOpponent } from "./GeneralRules";

export function bishopMove(initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean {
 for (let i = 1; i < 8; i++) {
     // upper right movement
     if(desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
         let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y + i};
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

     // bottom right movement
     if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
         let passedPosition: Position = {x: initialPosition.x + i, y: initialPosition.y - i};
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

     // upper left movement
     if(desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
         let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y + i};
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

     // bottom left movement
     if(desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
         let passedPosition: Position = {x: initialPosition.x - i, y: initialPosition.y - i};
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

export function getPossibleBishopMoves(bishop: Piece, boardState: Piece[]) : Position [] {
    const possibleMoves: Position[] = [];

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: bishop.position.x + i, y: bishop.position.y + i }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, bishop.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: bishop.position.x - i, y: bishop.position.y + i }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, bishop.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: bishop.position.x + i, y: bishop.position.y - i }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, bishop.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: bishop.position.x - i, y: bishop.position.y - i }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, bishop.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }
    return possibleMoves;
}