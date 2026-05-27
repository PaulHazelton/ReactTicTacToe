// interface SquareProps {
// 	value: "X" | "O" | " ";
// }

export default function Square(props: { value: string }) {
	return (
		<>
			<button className="square">{props.value}</button>
		</>
	);
}
