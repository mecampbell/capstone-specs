import { TeamType, Piece, Position } from "../../Constants";
import { tileIsEmptyorOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

export function queenMove(initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean {
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

 if (desiredPosition.y === initialPosition.y) {
     for(let i = 1; i < 8; i++) {
         let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1;
         
         let passedPosition: Position = {x: initialPosition.x + (i*multiplier), y: initialPosition.y}; 
         if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
             if (tileIsEmptyorOccupiedByOpponent(passedPosition, boardState, team)) {                
                return true;
             }
         } else {
             if (tileIsOccupied(passedPosition, boardState)) {
                break;
             }
         }
     }
 }

//  this is where check will go.

 return false;
}

export function getPossibleQueenMoves(queen: Piece, boardState: Piece[]) : Position [] {
    const possibleMoves: Position[] = [];

    // vertical and horizontal movement
    for (let i =1; i < 8; i++) {
        const direction: Position = {x: queen.position.x + i, y: queen.position.y }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, queen.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: queen.position.x - i, y: queen.position.y }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, queen.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: queen.position.x, y: queen.position.y + i }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, queen.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: queen.position.x, y: queen.position.y - i}

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, queen.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }
    //diagonal
    for (let i =1; i < 8; i++) {
        const direction: Position = {x: queen.position.x + i, y: queen.position.y + i }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, queen.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: queen.position.x - i, y: queen.position.y + i }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, queen.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: queen.position.x + i, y: queen.position.y - i }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, queen.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }

    for (let i =1; i < 8; i++) {
        const direction: Position = {x: queen.position.x - i, y: queen.position.y - i }

        if(!tileIsOccupied (direction, boardState)) {
            possibleMoves.push(direction);
        } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, queen.team)) {
            possibleMoves.push(direction)
            break;
        } else {
            break;
        }
    }
    return possibleMoves;
}