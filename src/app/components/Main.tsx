
import InnerBoard from "./InnerBoard";
import OuterBoard from "./OuterBoard";
import Board from "./Board";
import ResetButton from "./ResetButton";
import { useReducer } from "react";
import { gameReducer } from "@/app/reducers/gameReducer";
import { GameContext } from "@/app/context/GameContext";
import { GameDispatchContext } from "../context/GameDispatchContext";
import WhoIsPlaying from "./WhoIsPlaying";
import { Game } from "../objects/Game";

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