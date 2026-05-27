import Square from "./Square";

export default function Board(props: { boardState: string }) {

	// const boardState = " ".repeat(9);

	const rows = [
		props.boardState.slice(0, 3),
		props.boardState.slice(3, 6),
		props.boardState.slice(6, 9),
	];

	return (
		<div className="board">
			{rows.map((row, rowIndex) =>
				[...row].map((value, colIndex) => {
					return (
						<Square
							key={rowIndex * 3 + colIndex}
							value={value}
						/>
					);
				})
			)}
		</div>
	);
}
