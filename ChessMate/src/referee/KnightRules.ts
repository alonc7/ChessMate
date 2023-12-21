import { TeamType } from "../Types";
import { Piece, Position } from "../models";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralLogic";

export const isKnightValidMove = (
    newPosition: Position,
    initialPosition: Position,
    team: TeamType,
    boardState: Piece[]
): boolean => {
    const deltaX = Math.abs(newPosition.x - initialPosition.x); // 1 - 0 = 1   || 7 -6 = 1 || 6 - 7 = 1(Math.abs) || 3 - 4 = 1(Math.abs) 
    const deltaY = Math.abs(newPosition.y - initialPosition.y); //4- 2 = 2|| 2- 0 = 2 

    const newPositionMove = new Position(newPosition.x, newPosition.y)
    //Movement Logic 
    if ((deltaX === 1 && deltaY === 2) || (deltaX === 2 && deltaY === 1)) {
        if (!tileIsOccupied(newPositionMove, boardState)) {
            return true;
            // Attack Logic for the KNIGHT
        } else if (tileIsOccupiedByOpponent(newPositionMove, boardState, team)) {
            return true;
        }
    }
    return false;
}
export const getPossibleKnightMoves = (knight: Piece, boardState: Piece[]): Position[] => {
    let possibleMoves: Position[] = [];

    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {


            const horizontalMove = new Position(knight.position.x + j, knight.position.y + i * 2);
            const verticalMove = new Position(knight.position.x + i * 2, knight.position.y + j)

            if (!tileIsOccupied(verticalMove, boardState) || tileIsOccupiedByOpponent(verticalMove, boardState, knight.team)) {
                possibleMoves.push(verticalMove)
            };

            if (!tileIsOccupied(horizontalMove, boardState) || tileIsOccupiedByOpponent(horizontalMove, boardState, knight.team)) {
                possibleMoves.push(horizontalMove)
            };
        }
    }

    return possibleMoves;
}