import { createContext } from "react";
import { Game } from "../objects/Game";
import { Context } from "react";

export const GameContext : Context<Game> = createContext<Game>(null);
