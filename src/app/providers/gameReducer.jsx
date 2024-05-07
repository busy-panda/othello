import { util } from "./util";

export const Color = {
  BLACK: 'B',
  WHITE: 'W',
  NONE: ' '
}

const BOARD_SIZE = 8;

const POSITIONS_AROUND = [
  { x: -1, y: 0 },
  { x: +1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: +1 },
  { x: -1, y: -1 },
  { x: -1, y: +1 },
  { x: +1, y: -1 },
  { x: +1, y: +1 }
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

export const getColor = (board, pos) => {

  return board[pos.y][pos.x];
}

const setColor = (board, pos, color) => {
  board[pos.y][pos.x] = color;
}

const playPosition = (game, currPos, play) => {

  const dir = getDirection(currPos, play);
  const dist = getDistance(currPos, play);
  let curr = currPos;
  for (let i = 1; i < dist; i++) {
    curr = util.add(curr, dir);
    setColor(game.board, curr, game.playing);
  }

}

const getDistance = (a, b) => {
  const p = util.substract(b, a);
  return Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
}

const getDirection = (a, b) => {

  const p = util.substract(b, a);
  if (p.x > 1) { p.x = 1; }
  if (p.x < -1) { p.x = -1; }
  if (p.y > 1) { p.y = 1; }
  if (p.y < -1) { p.y = -1; }
  return p;
}

const play = (game, play) => {

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



const findPosition = (game, pos, shift, distance) => {

  const currPos = util.add(pos, shift);
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



const getOppositeColor = (playing) => {

  if (playing == Color.BLACK)
    return Color.WHITE;
  else
    return Color.BLACK;
}

const findPositions = (game, color, play) => {

  if (util.isOutsideBoard(play, BOARD_SIZE)) {
    return [];
  }
  const curr = getColor(game.board, play);

  if (curr != Color.NONE) {
    return [];
  } else {
    let positions = [];

    POSITIONS_AROUND.forEach(a => {
      let p = findPosition(game, play, a, 0);
      if (p != null) {
        positions.push(p);
      }
    });

    return positions;
  }
}

const switchPlayer = (game) => {
  if (game.playing === Color.WHITE) {
    game.playing = Color.BLACK;
  } else {
    game.playing = Color.WHITE;
  }
}

export function gameReducer(game, action) {

  switch (action.type) {
    case 'play':
      console.log(`play ${game.playing}`)
      return play(game, action.pos)
    case 'reset':
      console.log('reset')
      return newGame();
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

