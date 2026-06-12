import { type ReactNode } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card(
	props: {
		header: string;
		color: string;
		route?: string;
		children: ReactNode;
	},
) {
	const customStyle = { "--card-color": props.color } as React.CSSProperties;

	if (props.route == undefined) {
		return (
			<div className="card" style={customStyle}>
				<h3>{props.header}</h3>
				<div className="card-content">{props.children}</div>
			</div>
		);
	} else {
		return (
			<Link className="card" style={customStyle} to={props.route}>
				<h3>{props.header}</h3>
				<div className="card-content">{props.children}</div>
			</Link>
		);
	}
}
