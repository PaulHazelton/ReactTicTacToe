export type CellValue = "X" | "O" | " ";

export type GameStatus = "not over" | "X" | "O" | "draw";

export const GameMode = {
	PassPlay: "Pass and Play",
	Easy: "Easy AI",
} as const;

export type GameMode = typeof GameMode[keyof typeof GameMode];

export type Index = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;