import { TeamType, Piece, Position } from "../../Constants";
import { tileIsEmptyorOccupiedByOpponent, tileIsOccupied } from "./GeneralRules";

// export function rookMove(initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean
export function kingMove(initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean {
    //castling

    //white long castle
    if (initialPosition.x === 4) {
        if (initialPosition.y === 0) {
            let passedKingPosition: Position = {x: initialPosition.x - 2, y: initialPosition.y + 0};

            if (passedKingPosition.x === desiredPosition.x && passedKingPosition.y === desiredPosition.y) {
                if(tileIsEmptyorOccupiedByOpponent(passedKingPosition, boardState, team)) {
                    console.log('white castled long')
                    let whiteLongRook = boardState[16]
                    whiteLongRook.position.x = 3;

                    return true;
                }
            }
        }
    }

    //white short castle
    if (initialPosition.x === 4) {
        if (initialPosition.y === 0) {
            let passedPosition: Position = {x: initialPosition.x + 2, y: initialPosition.y + 0}
            if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                if(tileIsEmptyorOccupiedByOpponent(passedPosition, boardState, team)) {
                    console.log('white castled short')
                    let whiteShortRook = boardState[23]
                    whiteShortRook.position.x = 5;

                    return true;                
                }
            }
        }
    }
    //black long castle
    if (initialPosition.x === 4) {
        if (initialPosition.y === 7) {
            let passedPosition: Position = {x: initialPosition.x - 2, y: initialPosition.y + 0}
            if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                if(tileIsEmptyorOccupiedByOpponent(passedPosition, boardState, team)) {
                    console.log('black castled long')
                    let blackLongRook = boardState[0]
                    blackLongRook.position.x = 3;

                    return true;  
                }
            }
        }
    }

    //black short castle
    if (initialPosition.x === 4) {
        if (initialPosition.y === 7) {
            let passedPosition: Position = {x: initialPosition.x + 2, y: initialPosition.y + 0}
            if (passedPosition.x === desiredPosition.x && passedPosition.y === desiredPosition.y) {
                if(tileIsEmptyorOccupiedByOpponent(passedPosition, boardState, team)) {
                    console.log('black castled short')
                    let blackLongRook = boardState[7]
                    blackLongRook.position.x = 5;

                    return true;                  
                }
            }
        }
    }

 
    for (let i = 1; i < 2; i++) {
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
     for(let i = 1; i < 2; i++) {
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
     for(let i = 1; i < 2; i++) {
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
 return false;
}

export function getPossibleKingMoves(king: Piece, boardState: Piece[]) : Position [] {
    const possibleMoves: Position[] = [];

        // white/black short and long castle
        // coming back after implementing castle

        if(king.position.x === 4) {
            if(king.position.y === 0 || 7) {
                for (let i = 1; i < 3; i++) {
                    const longDirection: Position = {x: king.position.x - i, y: king.position.y}
                    const shortDirection: Position = {x: king.position.x + i, y: king.position.y}

                    if(!tileIsOccupied (longDirection, boardState)) {
                        possibleMoves.push(longDirection)
                    } if(!tileIsOccupied (shortDirection, boardState)) {
                        possibleMoves.push(shortDirection)
                    } else if (tileIsEmptyorOccupiedByOpponent(longDirection, boardState, king.team)) {
                        possibleMoves.push(longDirection)
                        break;
                    } else if (tileIsEmptyorOccupiedByOpponent(shortDirection, boardState, king.team)) {
                        possibleMoves.push(shortDirection)
                        break;
                    } else {
                        break;
                    }
                }
            }
            return possibleMoves;
        }

        // vertical and horizontal movement
        for (let i =1; i < 2; i++) {
            const direction: Position = {x: king.position.x + i, y: king.position.y }
    
            if(!tileIsOccupied (direction, boardState)) {
                possibleMoves.push(direction);
            } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, king.team)) {
                possibleMoves.push(direction)
                break;
            } else {
                break;
            }
        }
    
        for (let i =1; i < 2; i++) {
            const direction: Position = {x: king.position.x - i, y: king.position.y }
    
            if(!tileIsOccupied (direction, boardState)) {
                possibleMoves.push(direction);
            } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, king.team)) {
                possibleMoves.push(direction)
                break;
            } else {
                break;
            }
        }
    
        for (let i =1; i < 2; i++) {
            const direction: Position = {x: king.position.x, y: king.position.y + i }
    
            if(!tileIsOccupied (direction, boardState)) {
                possibleMoves.push(direction);
            } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, king.team)) {
                possibleMoves.push(direction)
                break;
            } else {
                break;
            }
        }
    
        for (let i =1; i < 2; i++) {
            const direction: Position = {x: king.position.x, y: king.position.y - i}
    
            if(!tileIsOccupied (direction, boardState)) {
                possibleMoves.push(direction);
            } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, king.team)) {
                possibleMoves.push(direction)
                break;
            } else {
                break;
            }
        }

        //diagonal
        for (let i =1; i < 2; i++) {
            const direction: Position = {x: king.position.x + i, y: king.position.y + i }
    
            if(!tileIsOccupied (direction, boardState)) {
                possibleMoves.push(direction);
            } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, king.team)) {
                possibleMoves.push(direction)
                break;
            } else {
                break;
            }
        }
    
        for (let i =1; i < 2; i++) {
            const direction: Position = {x: king.position.x - i, y: king.position.y + i }
    
            if(!tileIsOccupied (direction, boardState)) {
                possibleMoves.push(direction);
            } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, king.team)) {
                possibleMoves.push(direction)
                break;
            } else {
                break;
            }
        }
    
        for (let i =1; i < 2; i++) {
            const direction: Position = {x: king.position.x + i, y: king.position.y - i }
    
            if(!tileIsOccupied (direction, boardState)) {
                possibleMoves.push(direction);
            } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, king.team)) {
                possibleMoves.push(direction)
                break;
            } else {
                break;
            }
        }
    
        for (let i =1; i < 2; i++) {
            const direction: Position = {x: king.position.x - i, y: king.position.y - i }
    
            if(!tileIsOccupied (direction, boardState)) {
                possibleMoves.push(direction);
            } else if (tileIsEmptyorOccupiedByOpponent(direction, boardState, king.team)) {
                possibleMoves.push(direction)
                break;
            } else {
                break;
            }
        }  
    return possibleMoves;
}