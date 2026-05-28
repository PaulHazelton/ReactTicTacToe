import type React from "react";
import type { CellValue } from "../Types/GameTypes";

export default function Square(props: {
	value: CellValue;
	setCell: () => void;
}) {

	const colorMap = {
		" ": {
			"--cellColor": "white",
			"--cellBgColor": "#21202a"
		},
		"X": {
			"--cellColor": "#c084fc",
			"--cellBgColor": "rgba(192, 132, 252, 0.15)",
		},
		"O": {
			"--cellColor": "#fcec84",
			"--cellBgColor": "rgba(252, 250, 132, 0.15)",
		}
	};

	const cssVariables = colorMap[props.value] as React.CSSProperties;

	return (
		<>
			<button className="square" style={cssVariables} onClick={props.setCell}>
				{props.value}
			</button>
		</>
	);
}