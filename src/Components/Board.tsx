import type { BoardState, CellValue } from "../Types/GameTypes";
import BigCell from "./BigCell";
import Square from "./Square";

export default function Board(props: {
	boardState: BoardState,
	bigCellValue: CellValue,
	setCell: (cell: number) => void }
) {

	const rows = [
		props.boardState.slice(0, 3),
		props.boardState.slice(3, 6),
		props.boardState.slice(6, 9),
	];

	return (
		<>
			<div className="board">
				{rows.map((row, r) => row.map((value, c) => {

						const cellIndex = r * 3 + c;

						return (
							<Square
								key={cellIndex}
								value={value as CellValue}
								setCell={() => {props.setCell(cellIndex)}}
							/>
						);
					})
				)}
				<BigCell value={props.bigCellValue} />
			</div>
		</>
	);
}