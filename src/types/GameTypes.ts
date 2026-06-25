export type CellValue = "X" | "O" | " ";

export type GameStatus = "not over" | "X" | "O" | "draw";

export const GameMode = {
	PassPlay: "Pass and Play",
	Easy: "Easy AI",
} as const;

export type GameMode = typeof GameMode[keyof typeof GameMode];