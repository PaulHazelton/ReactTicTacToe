import type { CellValue } from "../Types/GameTypes";
import { colorMap } from "../Constants/Colors";

export default function Square(props: {
	value: CellValue;
	setCell: () => void;
}) {
	const cssVariables = colorMap[props.value];

	return (
		<>
			<button
				className="square"
				style={cssVariables}
				onClick={props.setCell}
			>
				{props.value}
			</button>
		</>
	);
}
