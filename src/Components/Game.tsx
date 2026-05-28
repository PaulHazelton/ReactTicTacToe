import React from "react";
import Board from "./Board";
import { type BoardState } from "../Types/GameTypes";

export default function Game() {

	const blankBoard = new Array<BoardState>(9).fill([
		" ", " ", " ",
		" ", " ", " ",
		" ", " ", " ",
	]);

	const [gameState, setGameState] = React.useState<BoardState[]>(blankBoard);
	const [turn, setTurn] = React.useState<"X" | "O">("X");

	const rows = [
		gameState.slice(0, 3),
		gameState.slice(3, 6),
		gameState.slice(6, 9),
	];

	// setCell(0, 0, "X");

	return (
		<>
			<div className="game">
				{rows.map((row, r) => row.map((_, c) => {

					const boardIndex = r*3+c;

					return (
						<>
							<Board
								key={boardIndex}
								index={boardIndex}
								boardState={rows[r][c]}
								bigCellValue="O"
								setCell={(cellIndex) => setCell(boardIndex, cellIndex)}
							/>
						</>
					)
				}))}
			</div>
			{/* <button onClick={() => setCell(4, 5)}>Test</button> */}
		</>
	);

	function setCell(board: number, cell: number) {

		const newGameState = gameState.map((boardData, boardIndex) => {
			if (boardIndex !== board)
				return boardData;
	
			const newBoard = [...boardData] as BoardState;
			newBoard[cell] = turn;

			return newBoard;
		})

		setGameState(newGameState);
		setTurn(turn == "O" ? "X" : "O");
	}
}
