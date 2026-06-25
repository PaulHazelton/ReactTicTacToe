import "./Game.css";
import React from "react";
import Board from "./Board.tsx";
import { colorMap3 } from "../../constants/Colors.ts";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../constants/AppRoutes.ts";
import EndScreen from "./EndScreen.tsx";
import { ArrowLeft, Undo2 } from "lucide-react";
import * as GameState from "../../types/GameState.ts";
import * as BoardState from "../../types/BoardState.ts";

export default function Game() {
	const [history, setHistory] = React.useState<GameState.GameState[]>([]);
	const [gameState, setGameState] = React.useState<GameState.GameState>(GameState.createGameState);

	const turnIndicatorCss = colorMap3[gameState.Turn];

	return (
		<>
			<div className="header">
				<Link className="btn" to={AppRoutes.Home}>
					<ArrowLeft />Back
				</Link>
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
					<button type="button" className="btn" onClick={undo}>
						<Undo2 />Undo
					</button>
				</div>
				<div
					className={`game ${gameState.ActiveBoard == null ? "active" : ""}`}
					style={turnIndicatorCss}
				>
					{gameState.SmallBoards.map((boardState, boardIndex) => (
						<Board
							key={boardIndex}
							gameState={gameState}
							boardIndex={boardIndex}
							boardState={boardState}
							bigCellValue={gameState
								.BigBoard[boardIndex]}
							active={gameState.ActiveBoard == boardIndex}
							setCell={(cellIndex) => setCell(boardIndex, cellIndex)}
						/>
					))}
					<EndScreen status={gameState.Status} />
				</div>
			</div>
		</>
	);

	function setCell(selectedBoard: number, selectedCell: number) {
		if (!GameState.cellIsPlayable(gameState, selectedBoard, selectedCell)) {
			return;
		}

		// Update History
		history.push(gameState);
		setHistory(history);

		// Generate next state
		const newSmallBoards = gameState.SmallBoards.map(
			(boardData, boardIndex) => {
				if (boardIndex == selectedBoard) {
					const newBoard = [...boardData] as BoardState.BoardState;
					newBoard[selectedCell] = gameState.Turn;

					return newBoard;
				} else {
					return boardData;
				}
			},
		);

		const newBigBoard = BoardState.generateBigBoard(newSmallBoards);

		const activeBoardIndex = BoardState.isBoardPlayable(newSmallBoards[selectedCell]) ? selectedCell : null;

		const turn: "X" | "O" = gameState.Turn == "O" ? "X" : "O";

		setGameState({
			ActiveBoard: activeBoardIndex,
			BigBoard: newBigBoard,
			SmallBoards: newSmallBoards,
			Turn: turn,
			LastMove: [selectedBoard, selectedCell],
			Status: GameState.calcGameStatus(newSmallBoards, newBigBoard),
		});
	}

	function undo() {
		if (history.length == 0)
			return;

		setGameState(history[history.length - 1]);
		setHistory(history.slice(0, -1));
	}
}
