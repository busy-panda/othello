export class Position {

    x:number;
    y:number;

    constructor(x : number, y : number) {
        this.x=x;
        this.y=y;
    }

    substract(sub: Position) : Position  {
        return new Position(this.x - sub.x, this.y - sub.y);
    }
    
    add(sub: Position) : Position  {
        return new Position(this.x + sub.x, this.y + sub.y);
    }

    static of(x:number, y:number) : Position {
        return new Position(x, y);
    }
}