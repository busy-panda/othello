import { createContext } from "react";
import { Dispatch } from "react";
import { Position } from "../objects/Position";

export interface GameDispatchAction {
    type: string,
    pos? : Position
}

export const GameDispatchContext = createContext<Dispatch<GameDispatchAction>>(null);