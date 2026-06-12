import { type ReactNode } from "react";
import "./Card.css";

export default function Card(props: { header: string, color: string, children: ReactNode }) {

	const customStyle = { "--card-color": props.color } as React.CSSProperties;

	return (
		// <div className="card" style={{borderColor: props.color}}>
		<div className="card" style={customStyle}>
			<h3>{props.header}</h3>
			<div className="card-content">{props.children}</div>
		</div>
	)
}