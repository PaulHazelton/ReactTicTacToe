import Board from "./Board";

export default function Game() {

	const gameState = new Array<string>(9).fill("O".repeat(9));

	const rows = [
		gameState.slice(0, 3),
		gameState.slice(3, 6),
		gameState.slice(6, 9),
	];

	return (
		<div className="game">
			{
				rows.map((row, r) => row.map((_, c) => {
						return (<Board boardState={rows[r][c]} />)
				}))
			}
		</div>
	);
}
