import * as BoardState from "./BoardState.ts";
import type { GameStatus, Index } from "./GameTypes.ts";

export interface GameState {
	SmallBoards: BoardState.BoardState[];
	BigBoard: BoardState.BoardState;
	ActiveBoard: Index | null;
	Turn: "X" | "O";
	LastMove: [Index, Index] | null;
	Status: GameStatus;
}

export function createGameState(): GameState {
	return {
		ActiveBoard: null,
		SmallBoards: new Array<BoardState.BoardState>(9).fill(BoardState.createBoard()),
		BigBoard: BoardState.createBoard(),
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

export function calcGameStatus(smallBoards: BoardState.BoardState[], bigBoard: BoardState.BoardState): GameStatus {
	// Win: Just check big board
	const bigBoardResult = BoardState.getWinner(bigBoard);

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

export function setCell(gameState: GameState, selectedBoard: Index, selectedCell: Index): GameState {
	// Generate next state
	const newSmallBoards = gameState.SmallBoards.map((boardData, boardIndex) => {
		if (boardIndex == selectedBoard) {
			const newBoard = [...boardData] as BoardState.BoardState;
			newBoard[selectedCell] = gameState.Turn;

			return newBoard;
		} else
			return boardData;
	});

	const newBigBoard = BoardState.generateBigBoard(newSmallBoards);

	const activeBoardIndex = BoardState.isBoardPlayable(newSmallBoards[selectedCell]) ? selectedCell : null;

	const turn: "X" | "O" = gameState.Turn == "O" ? "X" : "O";

	return ({
		ActiveBoard: activeBoardIndex,
		BigBoard: newBigBoard,
		SmallBoards: newSmallBoards,
		Turn: turn,
		LastMove: [selectedBoard, selectedCell],
		Status: calcGameStatus(newSmallBoards, newBigBoard),
	});
}

export function easyAiTurn(gameState: GameState): [Index, Index] | null {
	// Now collect all possible turns, return random one
	const possibleMoves: [Index, Index][] = [];

	if (gameState.ActiveBoard == null) {
		for (const [boardIndex, board] of gameState.SmallBoards.entries()) {
			if (gameState.BigBoard[boardIndex] != " ")
				continue;

			for (const [cellIndex, cell] of board.entries()) {
				if (cell == " ")
					possibleMoves.push([boardIndex as Index, cellIndex as Index]);
			}
		}
	} else {
		for (const [cellIndex, cell] of gameState.SmallBoards[gameState.ActiveBoard].entries()) {
			if (cell == " ")
				possibleMoves.push([gameState.ActiveBoard, cellIndex as Index]);
		}
	}

	if (possibleMoves.length == 0)
		return null;

	return possibleMoves[getRandomInt(possibleMoves.length)];
}

function getRandomInt(max: number): number {
	return Math.floor(Math.random() * max);
}