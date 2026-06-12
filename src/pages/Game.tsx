import React from "react";
import Board from "../components/Board"
import { createBoard, type BoardState, type CellValue, type GameState } from "../types/GameTypes";

export default function Game() {

	const blankBoards = new Array<BoardState>(9).fill(createBoard());
	const initialGameState: GameState = {ActiveBoard: null, SmallBoards: blankBoards, BigBoard: createBoard(), Turn: "X" };

	const [history, setHistory] = React.useState<GameState[]>([]);
	const [gameState, setGameState] = React.useState<GameState>(initialGameState);

	const rows = [
		gameState.SmallBoards.slice(0, 3),
		gameState.SmallBoards.slice(3, 6),
		gameState.SmallBoards.slice(6, 9),
	];

	return (
		<div id="center">
			<div className="game">
				{rows.map((row, r) => row.map((boardState, c) => {

					const boardIndex = r * 3 + c;

					return (
						<Board
							key={boardIndex}
							boardState={boardState}
							bigCellValue={gameState.BigBoard[boardIndex]}
							active={gameState.ActiveBoard == boardIndex}
							setCell={(cellIndex) => setCell(boardIndex, cellIndex)}
						/>
					)
				}))}
			</div>
			<button onClick={undo}>Undo</button>
		</div>
	);

	function setCell(selectedBoard: number, selectedCell: number) {

		// Can only play in empty cells.
		if (gameState.SmallBoards[selectedBoard][selectedCell] != " ")
			return;

		// Can only play in the active board, unless no board is active.
		if (gameState.ActiveBoard != null && gameState.ActiveBoard != selectedBoard)
			return;

		// Update History
		history.push(gameState)
		setHistory(history);

		// Generate next state
		const newSmallBoards = gameState.SmallBoards.map((boardData, boardIndex) => {
			
			if (boardIndex == selectedBoard) {
				
				const newBoard = [...boardData] as BoardState;
				newBoard[selectedCell] = gameState.Turn;
	
				return newBoard;
			}
			else
				return boardData;
		});

		const newBigBoard = generateBigBoard(newSmallBoards);

		const activeBoardIndex = (isBoardPlayable(newSmallBoards[selectedCell]) ? selectedCell : null);

		const turn: "X" | "O" = (gameState.Turn == "O" ? "X" : "O");

		setGameState({ ActiveBoard: activeBoardIndex, BigBoard: newBigBoard, SmallBoards: newSmallBoards, Turn: turn });
	}

	function undo() {

		const previousState = history.pop();

		if (!previousState)
			return;

		setGameState(previousState);
		setHistory(history);
	}

	function isBoardPlayable(boardState: BoardState): boolean {

		if (boardState.every(value => value != " "))
			return false;

		return getWinner(boardState) == " ";
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
