
import InnerBoard from "./InnerBoard";
import OuterBoard from "./OuterBoard";
import Board from "./Board";
import ResetButton from "./ResetButton";
import { useReducer } from "react";
import { gameReducer } from "@/providers/gameReducer";
import { GameContext } from "@/providers/GameContext";
import { GameDispatchContext } from "@/providers/GameContext";
import WhoIsPlaying from "./WhoIsPlaying";
import { Game } from "../providers/Game";

export default function Main() {

    const [game, dispatchGame] = useReducer(gameReducer, Game.retrieveGame());

    return (
    <GameContext.Provider value={game}>
        <GameDispatchContext.Provider value={dispatchGame}>
            <ResetButton />
            <OuterBoard  image="table.png">
                <InnerBoard>
                    <Board />
                </InnerBoard>
            </OuterBoard>
            <WhoIsPlaying />
        </GameDispatchContext.Provider>
    </GameContext.Provider>
    );
}