import { Game } from "./Game";
import { GameDispatchAction } from "./GameContext";


export function gameReducer(game: Game, action: GameDispatchAction) {

  switch (action.type) {
    case 'play':
      console.log(`play ${game.playing}`);
      return game.play(game, action.pos);
    case 'reset':
      console.log('reset');
      return Game.newGame();
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

