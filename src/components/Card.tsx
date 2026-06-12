import { type ReactNode } from "react";
import "./Card.css";

export default function Card(props: { header: string, color: string, route?: string, children: ReactNode }) {

	const customStyle = { "--card-color": props.color } as React.CSSProperties;

	return (
		<a className="card" style={customStyle} href={props.route}>
			<h3>{props.header}</h3>
			<div className="card-content">{props.children}</div>
		</a>
	)
}