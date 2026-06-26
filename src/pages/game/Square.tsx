import type { CellValue } from "../../types/GameTypes.ts";
import { colorMap } from "../../constants/Colors.ts";

export default function Square(props: {
	value: CellValue;
	playable: boolean;
	wasPreviousMove: boolean;
	onCellClick: () => void;
}) {
	const cssVariables = colorMap[props.value];

	return (
		<>
			<button
				type="button"
				className={`square ${props.wasPreviousMove ? "previous" : ""}`}
				style={cssVariables}
				disabled={!props.playable}
				onClick={props.onCellClick}
			>
				<span>{props.value}</span>
			</button>
		</>
	);
}
