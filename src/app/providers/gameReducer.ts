import { util } from "./util";
import { Position } from "./Position";

export enum Color {
  BLACK = 'B',
  WHITE = 'W',
  NONE = ' '
}

const BOARD_SIZE: number = 8;

const POSITIONS_AROUND: Position[] = [
  Position.of( -1,   0 ),
  Position.of( +1,   0 ),
  Position.of(  0,  -1 ),
  Position.of(  0,  +1 ),
  Position.of( -1,  -1 ),
  Position.of( -1,  +1 ),
  Position.of( +1,  -1 ),
  Position.of( +1,  +1 )
];

export const retrieveGame = () => {
  const val = localStorage.getItem('othello');
  if (val == null) {
    return newGame();
  } else {
    return JSON.parse(val);
  }
}

export const newGame = () => {
  const game = {
    playing: Color.WHITE,
    board: [
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', 'B', 'W', ' ', ' ', ' '],
      [' ', ' ', ' ', 'W', 'B', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ]
  };
  localStorage.setItem('othello', JSON.stringify(game))
  return game;
}

export const getColor = (board: any, pos: Position): Color => {

  return board[pos.y][pos.x];
}

const setColor = (board: any, pos: Position, color: Color) => {
  board[pos.y][pos.x] = color;
}

const playPosition = (game: any, currPos: Position, play: Position) => {

  const dir = getDirection(currPos, play);
  const dist = getDistance(currPos, play);
  let curr = currPos;
  for (let i = 1; i < dist; i++) {
    curr = curr.add(dir);
    setColor(game.board, curr, game.playing);
  }

}

const getDistance = (a: Position, b: Position): number => {
  const p = b.substract(a);
  return Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
}

const getDirection = (a: Position, b: Position): Position => {

  const p = b.substract(a);
  if (p.x > 1) { p.x = 1; }
  if (p.x < -1) { p.x = -1; }
  if (p.y > 1) { p.y = 1; }
  if (p.y < -1) { p.y = -1; }
  return p;
}

const play = (game: any, play: Position) => {

  const positions = findPositions(game, game.playing, play);
  if (positions.length == 0) {
    console.log('wrong selection')
    return game;
  }

  positions.forEach(currPos => {
    playPosition(game, currPos, play);
  });

  setColor(game.board, play, game.playing)
  switchPlayer(game);
  localStorage.setItem('othello', JSON.stringify(game))
  return { ...game };
}



const findPosition = (game: any, pos: Position, shift: Position, distance: number): Position => {

  const currPos = pos.add(shift);
  if (util.isOutsideBoard(currPos, BOARD_SIZE)) {
    return null;
  }
  const currColor = getColor(game.board, currPos);
  if (getOppositeColor(game.playing) == currColor) {
    return findPosition(game, currPos, shift, distance + 1);
  } else if (Color.NONE == currColor) {
    return null;
  } else {
    if (distance == 0) {
      return null;
    } else {
      return currPos;
    }
  }
}



const getOppositeColor = (playing: Color): Color => {

  if (playing == Color.BLACK)
    return Color.WHITE;
  else
    return Color.BLACK;
}

const findPositions = (game: any, color: Color, play: Position): Position[] => {

  if (util.isOutsideBoard(play, BOARD_SIZE)) {
    return [];
  }
  const curr = getColor(game.board, play);

  if (curr != Color.NONE) {
    return [];
  } else {
    let positions: Position[] = [];

    POSITIONS_AROUND.forEach((a:Position) => {
      let p = findPosition(game, play, a, 0);
      if (p != null) {
        positions.push(p);
      }
    });

    return positions;
  }
}

const switchPlayer = (game: any): void => {
  if (game.playing === Color.WHITE) {
    game.playing = Color.BLACK;
  } else {
    game.playing = Color.WHITE;
  }
}

export function gameReducer(game: any, action: any) {

  switch (action.type) {
    case 'play':
      console.log(`play ${game.playing}`)
      return play(game, Position.of(action.pos.x, action.pos.y))
    case 'reset':
      console.log('reset')
      return newGame();
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

