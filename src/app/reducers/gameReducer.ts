import { Game } from "@/objects/Game";
import { GameDispatchAction } from "@/context/GameDispatchContext";


export function gameReducer(game: Game, action: GameDispatchAction) {

  switch (action.type) {
    case 'play':
      console.log(`play ${game.playing}`);
      if (game.play(action.pos)) {
        return game.clone();
      } else {
        return game;
      }
    case 'reset':
      console.log('reset');
      return Game.newGame();
    default:
      throw Error('Unknown action: ' + action.type);
  }
}

