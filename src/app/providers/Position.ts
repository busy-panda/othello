export class Position {

    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    substract(sub: Position): Position {
        return new Position(this.x - sub.x, this.y - sub.y);
    }

    add(sub: Position): Position {
        return new Position(this.x + sub.x, this.y + sub.y);
    }

    static of(x: number, y: number): Position {
        return new Position(x, y);
    }

    isNegative(): boolean {
        return (this.x < 0 || this.y < 0);
    }

    isGreaterThan(p: Position): boolean {
        return (this.x > p.x || this.y > p.y);
    }

    isOutsideBoard(boardSize: number): boolean {
        const max = new Position(boardSize - 1, boardSize - 1);
        return this.isNegative() || this.isGreaterThan(max);
    }
}