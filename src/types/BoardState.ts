import type { CellValue } from "./GameTypes.ts";

export type BoardState = [
	CellValue, CellValue, CellValue,
	CellValue, CellValue, CellValue,
	CellValue, CellValue, CellValue
];

export function createBoard(): BoardState {
	return [" ", " ", " ", " ", " ", " ", " ", " ", " "];
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

export function isBoardPlayable(boardState: BoardState): boolean {
	if (boardState.every((value) => value != " ")) {
		return false;
	}

	return getWinner(boardState) == " ";
}

export function generateBigBoard(boards: BoardState[]): BoardState {
	const bigBoard = createBoard();

	for (let i = 0; i < 9; i++) {
		bigBoard[i] = getWinner(boards[i]);
	}

	return bigBoard;
}