import { createContext } from "react";
import { Game } from "./Game";
import { Context } from "react";
import { Dispatch } from "react";
import { Position } from "./Position";

export interface GameDispatchAction {
    type: string,
    pos : Position
}

export const GameContext : Context<Game> = createContext<Game>(null);
export const GameDispatchContext = createContext<Dispatch<GameDispatchAction>>(null);