import type { CellValue } from "../../types/GameTypes";
import { colorMap } from "../../constants/Colors";

export default function Square(props: {
	value: CellValue;
	playable: boolean,
	lastMove: boolean,
	setCell: () => void;
}) {
	const cssVariables = colorMap[props.value];

	return (
		<>
			<button
				className={`square ${props.lastMove ? "previous" : ""}`}
				style={cssVariables}
				disabled={!props.playable}
				onClick={props.setCell}
			>
				{props.value}
			</button>
		</>
	);
}
