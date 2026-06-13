import { colorMap } from "../../constants/Colors";
import { cellIsPlayable, type BoardState, type CellValue, type GameState } from "../../types/GameTypes";
import BigCell from "./BigCell";
import Square from "./Square";

export default function Board(props: {
	gameState: GameState,
	boardIndex: number,
	boardState: BoardState,
	bigCellValue: CellValue,
	active: boolean,
	setCell: (cell: number) => void }
) {

	const rows = [
		props.boardState.slice(0, 3),
		props.boardState.slice(3, 6),
		props.boardState.slice(6, 9),
	];

	const cssVariables = colorMap[props.gameState.Turn];

	return (
		<>
			<div className={`board ${props.active ? "active" : ""}`} style={cssVariables}>
				{rows.map((row, r) => row.map((value, c) => {

						const cellIndex = r * 3 + c;

						return (
							<Square
								key={cellIndex}
								value={value}
								playable={cellIsPlayable(props.gameState, props.boardIndex, cellIndex)}
								lastMove={lastMoveCell(props.gameState.LastMove, props.boardIndex, cellIndex)}
								setCell={() => {props.setCell(cellIndex)}}
							/>
						);
					})
				)}
				<BigCell value={props.bigCellValue} />
			</div>
		</>
	);

	function lastMoveCell(lastMove: [number, number] | null, boardIndex: number, cellIndex: number): boolean {
		if (lastMove == null)
			return false;

		const [bi, ci] = lastMove;
		return (bi == boardIndex) && (ci == cellIndex);
	}
}