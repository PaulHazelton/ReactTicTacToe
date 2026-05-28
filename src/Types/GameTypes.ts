export type CellValue = "X" | "O" | " ";

export type BoardState = [
	CellValue, CellValue, CellValue,
	CellValue, CellValue, CellValue,
	CellValue, CellValue, CellValue
];

export function createBoard(): BoardState {
	return [" ", " ", " ", " ", " ", " ", " ", " ", " "];
}