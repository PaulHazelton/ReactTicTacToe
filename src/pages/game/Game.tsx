import "./Game.css";
import React from "react";
import Board from "./Board.tsx";
import { colorMap3 } from "../../constants/Colors.ts";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../constants/AppRoutes.ts";
import EndScreen from "./EndScreen.tsx";
import { ArrowLeft, Undo2 } from "lucide-react";
import * as GameState from "../../types/GameState.ts";
import type { GameMode, Index } from "../../types/GameTypes.ts";
import { GameStateContext } from "../../hooks/GameStateHook.ts";

export default function Game(props: { mode: GameMode }) {
	const [history, setHistory] = React.useState<GameState.GameState[]>([]);
	const [gameState, setGameState] = React.useState<GameState.GameState>(GameState.createGameState());

	const turnIndicatorCss = colorMap3[gameState.Turn];

	const aiTurn: boolean = props.mode == "Easy AI" && gameState.Status == "not over" && gameState.Turn == "O";

	// AI SLOP WARNNIG -------
	// 1. Add the useEffect hook for the AI's delay
	React.useEffect(() => {
		// Only run the timer if it's the AI's turn
		if (aiTurn) {
			const timerId = setTimeout(() => {
				// Assume this is your existing helper function
				const turn: [Index, Index] | null = GameState.easyAiTurn(gameState);

				if (turn == null)
					throw new Error("AI failed to select a turn");

				attempTurn(turn[0], turn[1]);
			}, 1000); // 1000ms = 1 second delay

			// 2. CRITICAL: Cleanup function
			// This clears the timeout if the component unmounts or if the state
			// changes before the timer finishes, preventing memory leaks and bugs.
			return () => clearTimeout(timerId);
		}
	}, [aiTurn, gameState]); // Re-run effect when turn or state changes
	// -------------

	function attempTurn(selectedBoard: Index, selectedCell: Index) {
		if (!GameState.cellIsPlayable(gameState, selectedBoard, selectedCell))
			return;

		// Update State
		const newState = GameState.setCell(gameState, selectedBoard, selectedCell);
		setGameState(newState);

		// Update History
		history.push(gameState);
		setHistory(history);
	}

	function undo() {
		if (history.length == 0)
			return;

		setGameState(history[history.length - 1]);
		setHistory(history.slice(0, -1));
	}

	return (
		<>
			<GameStateContext value={gameState}>
				<div className="header">
					<Link className="btn" to={AppRoutes.Home}>
						<ArrowLeft />Back
					</Link>
					<h1>Ultimate Tic Tac Toe</h1>
				</div>
				<div className="subheader">
					<h2>{props.mode}</h2>
				</div>
				<div className="game-control-box">
					<div className="control-panel">
						<div className="turn-indicator" style={turnIndicatorCss}>
							<h3>Turn</h3>
							<div>{gameState.Turn}</div>
						</div>
						{aiTurn && <div>Thinking...</div>}
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
								boardIndex={boardIndex}
								boardState={boardState}
								bigCellValue={gameState
									.BigBoard[boardIndex]}
								active={gameState.ActiveBoard == boardIndex}
								onCellClick={(cellIndex) => attempTurn(boardIndex as Index, cellIndex)}
							/>
						))}
						<EndScreen status={gameState.Status} />
					</div>
				</div>
			</GameStateContext>
		</>
	);
}
