export type CellValue = "X" | "O" | " ";
export type GameStatus = "not over" | "X" | "O" | "draw";

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
	LastMove: [number, number] | null;
	Status: GameStatus;
}

export function createGameState(): GameState {
	return {
		ActiveBoard: null,
		SmallBoards: new Array<BoardState>(9).fill(createBoard()),
		BigBoard: createBoard(),
		Turn: "X",
		LastMove: null,
		Status: "not over"
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

export function calcGameStatus(smallBoards: BoardState[], bigBoard: BoardState): GameStatus {
	// Win: Just check big board
	const bigBoardResult = getWinner(bigBoard);

	if (bigBoardResult != " ")
		return bigBoardResult;

	// If no win, check if there is any move to make. If so, not over.
	for (let boardIndex = 0; boardIndex < 9; boardIndex++) {
		if (bigBoard[boardIndex] == " ") {
			for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
				if (smallBoards[boardIndex][cellIndex] == " ")
					return "not over";
			}
		}
	}

	// Otherwise, not over.
	return "draw";
}

export function getWinner(boardState: BoardState): CellValue {
	const WINNING_LINES = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8], // rows
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8], // columns
		[0, 4, 8],
		[2, 4, 6], // diagonals
	];

	for (const [a, b, c] of WINNING_LINES) {
		const cell = boardState[a];
		if (
			cell !== " " && cell === boardState[b] && cell === boardState[c]
		) {
			return cell;
		}
	}

	return " ";
}