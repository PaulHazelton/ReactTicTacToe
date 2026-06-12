import type { CellValue } from "../../types/GameTypes";
import { colorMap } from "../../constants/Colors";

export default function Square(props: {
	value: CellValue;
	playable: boolean,
	setCell: () => void;
}) {
	const cssVariables = colorMap[props.value];

	return (
		<>
			<button
				className="square"
				style={cssVariables}
				disabled={!props.playable}
				onClick={props.setCell}
			>
				{props.value}
			</button>
		</>
	);
}
