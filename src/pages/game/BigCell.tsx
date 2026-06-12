import { colorMap2 } from "../../constants/Colors";
import type { CellValue } from "../../types/GameTypes";

export default function BigCell(props: { value: CellValue }) {

	const cssVariables = colorMap2[props.value];

	switch (props.value) {
		case "X":
		case "O":
			return <div className="bigCell" style={cssVariables}>{props.value}</div>
		default:
			return <></>
	}
}