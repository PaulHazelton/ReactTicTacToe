export type CellValue = "X" | "O" | " ";

export type BoardState = [
	CellValue, CellValue, CellValue,
	CellValue, CellValue, CellValue,
	CellValue, CellValue, CellValue
];

export function createBoard(): BoardState {
	return [" ", " ", " ", " ", " ", " ", " ", " ", " "];
}

export interface GameState {
	SmallBoards: BoardState[];
	BigBoard: BoardState;
	ActiveBoard: number | null;
	Turn: "X" | "O";
}

export function createGameState(): GameState {
	return {
		ActiveBoard: null,
		SmallBoards: new Array<BoardState>(9).fill(createBoard()),
		BigBoard: createBoard(),
		Turn: "X",
	};
}

export function cellIsPlayable(gameState: GameState, selectedBoard: number, selectedCell: number): boolean {
	// Can only play in empty cells.
	if (gameState.SmallBoards[selectedBoard][selectedCell] != " ") {
		return false;
	}

	// Can only play in the active board, unless no board is active.
	if (
		gameState.ActiveBoard != null &&
		gameState.ActiveBoard != selectedBoard
	) {
		return false;
	}

	return true;
}