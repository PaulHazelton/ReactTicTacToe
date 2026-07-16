import { useContext } from "react";
import { colorMap } from "../../constants/Colors.ts";
import type { BoardState } from "../../types/BoardState.ts";
import { cellIsPlayable } from "../../types/GameState.ts";
import type { CellValue, Index } from "../../types/GameTypes.ts";
import BigCell from "./BigCell.tsx";
import Square from "./Square.tsx";
import { GameStateContext } from "../../hooks/GameStateHook.ts";

export default function Board(props: {
	// gameState: GameState;
	boardIndex: number;
	boardState: BoardState;
	bigCellValue: CellValue;
	active: boolean;
	onCellClick: (cell: Index) => void;
}) {
	const gameState = useContext(GameStateContext);

	const cssVariables = colorMap[gameState.Turn];

	function cellWasPreviousMove(
		lastMove: [number, number] | null,
		boardIndex: number,
		cellIndex: number,
	): boolean {
		if (lastMove == null)
			return false;

		const [bi, ci] = lastMove;
		return (bi == boardIndex) && (ci == cellIndex);
	}

	return (
		<>
			<div
				className={`board ${props.active ? "active" : ""}`}
				style={cssVariables}
			>
				{props.boardState.map((cellValue, cellIndex) => (
					<Square
						key={cellIndex}
						value={cellValue}
						playable={cellIsPlayable(
							gameState,
							props.boardIndex,
							cellIndex,
						)}
						wasPreviousMove={cellWasPreviousMove(
							gameState.LastMove,
							props.boardIndex,
							cellIndex,
						)}
						onCellClick={() => props.onCellClick(cellIndex as Index)}
					/>
				))}
				<BigCell value={props.bigCellValue} />
			</div>
		</>
	);
}
