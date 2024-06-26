import { Color } from "./Color";
import { Position } from "./Position";

export class Game {

    static readonly BOARD_SIZE: number = 8;

    private static readonly OTHELLO: string = 'othello';
    private static readonly POSITIONS_AROUND: Position[] = [
        Position.of(-1, 0),
        Position.of(+1, 0),
        Position.of(0, -1),
        Position.of(0, +1),
        Position.of(-1, -1),
        Position.of(-1, +1),
        Position.of(+1, -1),
        Position.of(+1, +1)
    ];

    playing: Color;
    board: Color[][];

    constructor(playing: Color, board: Color[][]) {

        this.playing = playing;
        this.board = board;
    }

    static of (json: any): Game {
        return new Game(json.playing, json.board);
    };

    static retrieveGame (): Game {

        const val = localStorage.getItem(Game.OTHELLO);
        if (val == null) {
            return this.newGame();
        } else {
            return this.of(JSON.parse(val));
        }
    };

    static newGame (): Game {

        const game = new Game(
            Color.WHITE,
            [
                [Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY],
                [Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY],
                [Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY],
                [Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.BLACK, Color.WHITE, Color.EMPTY, Color.EMPTY, Color.EMPTY],
                [Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.WHITE, Color.BLACK, Color.EMPTY, Color.EMPTY, Color.EMPTY],
                [Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY],
                [Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY],
                [Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY, Color.EMPTY],
            ]);

        localStorage.setItem(Game.OTHELLO, JSON.stringify(game));
        return game;
    };

    getColor (pos: Position): Color {

        return this.board[pos.y][pos.x];
    };

    private setColor (pos: Position, color: Color) {
        this.board[pos.y][pos.x] = color;
    };

    private playPosition (currPos: Position, play: Position) {

        const dir = this.getDirection(currPos, play);
        const dist = this.getDistance(currPos, play);
        let curr = currPos;
        for (let i = 1; i < dist; i++) {
            curr = curr.add(dir);
            this.setColor(curr, this.playing);
        }
    };

    private getDistance (a: Position, b: Position): number {
        const p = b.substract(a);
        return Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
    };

    private getDirection (a: Position, b: Position): Position {

        const p = b.substract(a);
        if (p.x > 1) { p.x = 1; }
        if (p.x < -1) { p.x = -1; }
        if (p.y > 1) { p.y = 1; }
        if (p.y < -1) { p.y = -1; }
        return p;
    };

    play(play: Position): boolean {

        const positions = this.findPositions(play);
        if (positions.length == 0) {
            console.log('wrong selection');
            return false;
        }

        positions.forEach(currPos => {
            this.playPosition(currPos, play);
        });

        this.setColor(play, this.playing);
        this.switchPlayer();
        localStorage.setItem(Game.OTHELLO, JSON.stringify(this));
        return true;
    };

    clone(): Game {
        return new Game(this.playing, this.board);
    };

    private findPosition(pos: Position, shift: Position, distance: number): Position {

        const currPos = pos.add(shift);
        if (currPos.isOutsideBoard(Game.BOARD_SIZE)) {
            return null;
        }
        const currColor = this.getColor(currPos);
        if (this.getOppositeColor(this.playing) == currColor) {
            return this.findPosition(currPos, shift, distance + 1);
        } else if (Color.EMPTY == currColor) {
            return null;
        } else {
            if (distance == 0) {
                return null;
            } else {
                return currPos;
            }
        }
    };

    private getOppositeColor(playing: Color): Color {

        if (playing == Color.BLACK)
            return Color.WHITE;
        else
            return Color.BLACK;
    };

    private findPositions(play: Position): Position[] {

        if (play.isOutsideBoard(Game.BOARD_SIZE)) {
            return [];
        }
        const curr = this.getColor(play);

        if (curr != Color.EMPTY) {
            return [];
        } else {
            let positions: Position[] = [];

            Game.POSITIONS_AROUND.forEach((a: Position) => {
                let p = this.findPosition(play, a, 0);
                if (p != null) {
                    positions.push(p);
                }
            });

            return positions;
        }
    };

    private switchPlayer(): void {
        if (this.playing === Color.WHITE) {
            this.playing = Color.BLACK;
        } else {
            this.playing = Color.WHITE;
        }
    };
}