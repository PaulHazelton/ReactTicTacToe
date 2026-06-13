import { colorMap4 } from "../../constants/Colors";

export default function EndScreen(props: { status: "not over" | "X" | "O" | "draw" }) {

	if (props.status == "not over")
		return <></>;

	const colors = colorMap4[props.status];

	const text = props.status == "draw" ? "Draw!" : `${props.status} wins!`

	return (
		<div className="end-screen" style={colors}>
			<span>{text}</span>
		</div>
	)
}