

const isNegative = (pos) => {
    return (pos.x < 0 || pos.y < 0);
}

const isGreaterThan = (pos, p) => {
    return (pos.x > p.x || pos.y > p.y);
}

const substract = (pos, sub) => {
    return {
        x: pos.x - sub.x,
        y: pos.y - sub.y
    };
}

const add = (pos, add) => {
    return {
        x: pos.x + add.x,
        y: pos.y + add.y
    };
}

const isOutsideBoard = (pos, boardSize) => {
    const max = {
        x: boardSize - 1,
        y: boardSize - 1
    };
    return isNegative(pos) || isGreaterThan(pos, max);
}

export const util = {
    isNegative: isNegative,
    isGreaterThan: isGreaterThan,
    substract: substract,
    add: add,
    isOutsideBoard: isOutsideBoard
}