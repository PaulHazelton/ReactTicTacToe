import React from "react";
import Board from "./Board";
import { createBoard, type BoardState, type CellValue } from "../Types/GameTypes";

export default function Game() {

	const blankBoard = new Array<BoardState>(10).fill(createBoard());

	const [gameState, setGameState] = React.useState<BoardState[]>(blankBoard);
	const [activeBoardIndex, setActiveBoardIndex] = React.useState<number | null>(null);
	const [turn, setTurn] = React.useState<"X" | "O">("X");

	const rows = [
		gameState.slice(0, 3),
		gameState.slice(3, 6),
		gameState.slice(6, 9),
	];

	return (
		<>
			<div className="game">
				{rows.map((row, r) => row.map((boardState, c) => {

					const boardIndex = r * 3 + c;

					return (
						<Board
							key={boardIndex}
							boardState={boardState}
							bigCellValue={gameState[9][boardIndex]}
							active={activeBoardIndex == boardIndex}
							setCell={(cellIndex) => setCell(boardIndex, cellIndex)}
						/>
					)
				}))}
			</div>
		</>
	);

	function setCell(selectedBoard: number, selectedCell: number) {

		// Can only play in empty cells.
		if (gameState[selectedBoard][selectedCell] != " ")
			return;

		// Can only play in the active board, unless no board is active.
		if (activeBoardIndex != null && selectedBoard != activeBoardIndex)
			return;

		let newGameState = gameState.map((boardData, boardIndex) => {
			
			if (boardIndex == selectedBoard) {
				
				const newBoard = [...boardData] as BoardState;
				newBoard[selectedCell] = turn;
	
				return newBoard;
			}
			else
				return boardData;
		});

		newGameState[9] = generateBigBoard(newGameState);

		setGameState(newGameState);
		setTurn(turn == "O" ? "X" : "O");
		setActiveBoardIndex(newGameState[9][selectedCell] == " " ? selectedCell : null);
	}

	function generateBigBoard(gameState: BoardState[]) : BoardState {

		let bigBoard = createBoard();

		for (let i = 0; i < 9; i++) {
			bigBoard[i] = getWinner(gameState[i]);
		}

		return bigBoard;
	}

	function getWinner(boardState: BoardState): CellValue {
		const WINNING_LINES = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
			[0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
			[0, 4, 8], [2, 4, 6],            // diagonals
		];

		for (const [a, b, c] of WINNING_LINES) {
			const cell = boardState[a];
			if (cell !== " " && cell === boardState[b] && cell === boardState[c]) {
				return cell;
			}
		}

		return " ";
	}
}
