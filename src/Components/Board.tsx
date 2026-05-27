import Square from "./Square";

export default function Game() {
	
	const boardState = " ".repeat(9);

	const rows = [
		boardState.slice(0, 3),
		boardState.slice(3, 6),
		boardState.slice(6, 9),
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
