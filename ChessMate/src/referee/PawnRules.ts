import { TeamType } from "../Types";
import { Piece, Position } from "../models";
import { Pawn } from "../models/Pawn";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralLogic";

export const isPawnValidMove = (
    newPosition: Position,
    initialPosition: Position,
    team: TeamType,
    boardState: Piece[]): boolean => {

    const specialRow = team === TeamType.TEAMMATE ? 1 : 6;
    const pawnDirection = team === TeamType.TEAMMATE ? 1 : -1;
    const specialPostionMove = new Position(newPosition.x, newPosition.y - pawnDirection);

    //Movement Logic 
    if (newPosition.x === initialPosition.x && newPosition.y === initialPosition.y) {
        return false;
    }
    if (initialPosition.x === newPosition.x && initialPosition.y === specialRow && newPosition.y - initialPosition.y === 2 * pawnDirection) {
        if (!tileIsOccupied(newPosition, boardState) &&
            !tileIsOccupied(specialPostionMove, boardState)
        ) {

            return true;
        }
    } else if (initialPosition.x === newPosition.x && newPosition.y - initialPosition.y === pawnDirection) {
        if (!tileIsOccupied(newPosition, boardState)
        ) {
            return true;
        }
    }
    // Attack Logic for the pawn
    else if (newPosition.x - initialPosition.x === -1 && newPosition.y - initialPosition.y === pawnDirection) {
        if (tileIsOccupiedByOpponent(newPosition, boardState, team)) {
            return true;
        }
    }
    else if (newPosition.x - initialPosition.x === 1 && newPosition.y - initialPosition.y === pawnDirection) {
        console.log('upper / bottom right');
        if (tileIsOccupiedByOpponent(newPosition, boardState, team)) {
            return true;
        }
    }
    return false;
}

export const getPossiblePawnMoves = (pawn: Piece, boardState: Piece[]): Position[] => {

    let possibleMoves: Position[] = [];

    const specialRow = pawn.team === TeamType.TEAMMATE ? 1 : 6;
    const pawnDirection = pawn.team === TeamType.TEAMMATE ? 1 : -1;


    const normalMove = new Position(pawn.position.x, pawn.position.y + pawnDirection);
    const specialMove = new Position(normalMove.x, normalMove.y + pawnDirection);
    const upperLeftAttack = new Position(pawn.position.x - 1, pawn.position.y + pawnDirection);
    const upperRightAttack = new Position(pawn.position.x + 1, pawn.position.y + pawnDirection);
    const leftPostion = new Position(pawn.position.x - 1, pawn.position.y);
    const rightPostion = new Position(pawn.position.x + 1, pawn.position.y);

    if (!tileIsOccupied(normalMove, boardState)) {
        possibleMoves.push(normalMove);

        if (!tileIsOccupied(specialMove, boardState) &&
            pawn.position.y === specialRow) {

            possibleMoves.push(specialMove);
        };
    }


    if (tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
        possibleMoves.push(upperLeftAttack);
    } else if (!tileIsOccupied(upperLeftAttack, boardState)) {
        const leftPiece = boardState.find(p => p.position.samePosition(leftPostion))
        if (leftPiece && (leftPiece as Pawn).enPassant) {
            possibleMoves.push(upperLeftAttack)
        };
    };

    if (tileIsOccupiedByOpponent(upperRightAttack, boardState, pawn.team)) {
        possibleMoves.push(upperRightAttack);
    }
    else if (!tileIsOccupied(upperRightAttack, boardState)) {
        const rightPiece = boardState.find(p => p.position.samePosition(rightPostion))
        if (rightPiece && (rightPiece as Pawn).enPassant) {
            possibleMoves.push(upperRightAttack)
        };
    };






    return possibleMoves;


}