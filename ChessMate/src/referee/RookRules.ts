import { TeamType } from "../Types";
import { Piece, Position } from "../models";
import { tileIsOccupied, tileIsOccupiedByOpponent } from "./GeneralLogic";

export const isRookValidMove = (
    newPosition: Position,
    initialPosition: Position,
    team: TeamType,
    boardState: Piece[]
): boolean => {
    //BASIC MOVEMENT LOGIC FOR ROOK
    if (!(initialPosition.x === newPosition.x && initialPosition.y !== newPosition.y) && !(initialPosition.x !== newPosition.x && initialPosition.y === newPosition.y)) {
        return false;
    }
    const deltaX = Math.sign(newPosition.x - initialPosition.x)// 1 -1 0 -0
    const deltaY = Math.sign(newPosition.y - initialPosition.y);

    // let currentX = initialPosition.x; // 1-7
    // let currentY = initialPosition.y; // 1-7
    let currentPosition = new Position(initialPosition.x, initialPosition.y);

    while ((newPosition.x !== currentPosition.x && newPosition.y === initialPosition.y) || (newPosition.x === currentPosition.x && newPosition.y !== currentPosition.y)) {
        // Update the current position based on the movement direction
        // currentX += deltaX;
        // currentY += deltaY;
        currentPosition.x += deltaX;
        currentPosition.y += deltaY;

        // Process each tile on the way
        // Check if the current tile is occupied
        if (tileIsOccupied(currentPosition, boardState)) { //->Examples: If (3,3) is occupied by an opponent, it logs "Valid move: Capturing opponent's piece at (3,3)".
            // Check if the occupied tile is an opponent's piece
            if (tileIsOccupiedByOpponent(currentPosition, boardState, team)) {
                // Check to see there is  a clear path to attacked opponent's piece
                if (currentPosition.x !== newPosition.x || currentPosition.y !== newPosition.y) {
                    return false;
                }
                // console.log(`Valid move: Capturing opponent's piece at (${currentX}, ${currentY})`);
                return true; // Valid move: Capture opponent's piece
            } else {
                // console.log(`Invalid move: Tile is occupied by a teammate at (${currentX}, ${currentY})`);
                return false; // Invalid move: Tile is occupied by a teammate
            }
        }
    }
    return true;
};
/**
 * Calculates the possible moves for a rook on the chessboard.
 *
 * @param rook - The rook piece for which to calculate possible moves.
 * @param boardState - The current state of the chessboard.
 * @returns An array of positions representing possible moves for the rook.
 */
export const getPossibleRookMoves = (rook: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    /**
     * Helper function to check and push rook moves in a given direction.
     *
     * @param xOffset - The horizontal direction (-1 for left, 1 for right).
     * @param yOffset - The vertical direction (-1 for up, 1 for down).
     */
    const checkAndPushMove = (xOffset: number, yOffset: number) => {
        for (let index = 1; index <= 8; index++) {
            // Calculate the destination based on the direction and index
            const destination = new Position(rook.position.x + index * xOffset, rook.position.y + index * yOffset);

            // Check if the destination is a valid move
            if (!tileIsOccupied(destination, boardState)) {
                possibleMoves.push(destination);
            } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
                possibleMoves.push(destination);
                break; // Break if an opponent's piece is encountered (capture possible)
            } else {
                break; // Break if the destination is occupied by a teammate (cannot move past own pieces)
            }
        }
    };


    // Loop over possible horizontal and vertical directions
    checkAndPushMove(0, -1); // Move up
    checkAndPushMove(0, 1);  // Move down
    checkAndPushMove(1, 0);  // Move right
    checkAndPushMove(-1, 0); // Move left


    return possibleMoves;
};
