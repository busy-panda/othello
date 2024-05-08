import { Position } from "./Position";


const isNegative = (pos: Position) : boolean => {
    return (pos.x < 0 || pos.y < 0);
}

const isGreaterThan = (pos: Position, p: Position) : boolean => {
    return (pos.x > p.x || pos.y > p.y);
}

const isOutsideBoard = (pos: Position, boardSize: number) : boolean => {
    const max = new Position(boardSize - 1,  boardSize - 1);
    return isNegative(pos) || isGreaterThan(pos, max);
}

export const util = {
    isNegative: isNegative,
    isGreaterThan: isGreaterThan,
    isOutsideBoard: isOutsideBoard
}