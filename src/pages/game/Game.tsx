import "./Game.css";
import React from "react";
import Board from "./Board";
import {
	type BoardState,
	calcGameStatus,
	cellIsPlayable,
	type CellValue,
	createBoard,
	createGameState,
	type GameState,
} from "../../types/GameTypes";
import { colorMap3 } from "../../constants/Colors";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../constants/AppRoutes";
import EndScreen from "./EndScreen";
import { ArrowLeft, Undo2 } from "lucide-react";

export default function Game() {
	const initialGameState = createGameState();

	const [history, setHistory] = React.useState<GameState[]>([]);
	const [gameState, setGameState] = React.useState<GameState>(initialGameState);

	const rows = [
		gameState.SmallBoards.slice(0, 3),
		gameState.SmallBoards.slice(3, 6),
		gameState.SmallBoards.slice(6, 9),
	];

	const turnIndicatorCss = colorMap3[gameState.Turn];

	return (
		<>
			<div className="header">
				<Link className="btn" to={AppRoutes.Home}><ArrowLeft />Back</Link>
				<h1>Ultimate Tic Tac Toe</h1>
			</div>
			<div className="subheader">
				<h2>Pass & Play</h2>
			</div>
			<div className="game-control-box">
				<div className="control-panel">
					<div className="turn-indicator" style={turnIndicatorCss}>
						<h3>Turn</h3>
						<div>{gameState.Turn}</div>
					</div>
					<button className="btn" onClick={undo}><Undo2 />Undo</button>
				</div>
				<div className={`game ${gameState.ActiveBoard == null ? "active" : ""}`} style={turnIndicatorCss}>
					{rows.map((row, r) =>
						row.map((boardState, c) => {
							const boardIndex = r * 3 + c;

							return (
								<Board
									key={boardIndex}
									gameState={gameState}
									boardIndex={boardIndex}
									boardState={boardState}
									bigCellValue={gameState
										.BigBoard[boardIndex]}
									active={gameState.ActiveBoard == boardIndex}
									setCell={(cellIndex) =>
										setCell(boardIndex, cellIndex)}
								/>
							);
						})
					)}
					<EndScreen status={gameState.Status} />
				</div>
			</div>
		</>
	);

	function setCell(selectedBoard: number, selectedCell: number) {

		if (!cellIsPlayable(gameState, selectedBoard, selectedCell))
			return;

		// Update History
		history.push(gameState);
		setHistory(history);

		// Generate next state
		const newSmallBoards = gameState.SmallBoards.map(
			(boardData, boardIndex) => {
				if (boardIndex == selectedBoard) {
					const newBoard = [...boardData] as BoardState;
					newBoard[selectedCell] = gameState.Turn;

					return newBoard;
				} else {
					return boardData;
				}
			},
		);

		const newBigBoard = generateBigBoard(newSmallBoards);

		const activeBoardIndex = isBoardPlayable(newSmallBoards[selectedCell])
			? selectedCell
			: null;

		const turn: "X" | "O" = gameState.Turn == "O" ? "X" : "O";

		setGameState({
			ActiveBoard: activeBoardIndex,
			BigBoard: newBigBoard,
			SmallBoards: newSmallBoards,
			Turn: turn,
			LastMove: [selectedBoard, selectedCell],
			Status: calcGameStatus(newSmallBoards, newBigBoard),
		});
	}

	function undo() {
		const previousState = history.pop();

		if (!previousState) {
			return;
		}

		setGameState(previousState);
		setHistory(history);
	}

	function isBoardPlayable(boardState: BoardState): boolean {
		if (boardState.every((value) => value != " ")) {
			return false;
		}

		return getWinner(boardState) == " ";
	}

	function generateBigBoard(gameState: BoardState[]): BoardState {
		let bigBoard = createBoard();

		for (let i = 0; i < 9; i++) {
			bigBoard[i] = getWinner(gameState[i]);
		}

		return bigBoard;
	}

	function getWinner(boardState: BoardState): CellValue {
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
}
