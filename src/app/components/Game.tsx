
import InnerBoard from "./InnerBoard";
import OuterBoard from "./OuterBoard";
import Board from "./Board";
import ResetButton from "./ResetButton";
import { useReducer } from "react";
import { gameReducer } from "@/providers/gameReducer";
import { GameContext } from "@/providers/GameContext";
import { GameDispatchContext } from "@/providers/GameContext";
import { retrieveGame } from "@/providers/gameReducer";
import { useLoadingStatus } from "@/providers/useLoadingStatus";
import WhoIsPlaying from "./WhoIsPlaying";

export default function Game() { 

    const [game, dispatchGame] = useReducer(gameReducer, retrieveGame());
    const isLoading = useLoadingStatus();

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
    )
}