import { createContext } from "react";
import * as GameState from "../types/GameState.ts";

export const GameStateContext = createContext(GameState.createGameState());