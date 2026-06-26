import Card from "../../components/Card.tsx";
import { AppRoutes } from "../../constants/AppRoutes.ts";
import "./Home.css";

export default function Home() {
	return (
		<div className="home">
			<div className="header">
				<h1>Ultimate Tic Tac Toe</h1>
			</div>
			<div id="center">
				<div className="zone">
					<h2>Single Player Game</h2>
					<div className="card-box">
						<Card header="Easy" color="lime" route={AppRoutes.Easy}>
							<p>Random AI</p>
						</Card>
						<Card header="Medium" color="yellow">
							<p>Coming soon!</p>
						</Card>
						<Card header="Hard" color="red">
							<p>Coming soon!</p>
						</Card>
					</div>
				</div>
				<div className="zone">
					<h2>Pass and Play Game</h2>
					<div className="card-box">
						<Card header="Duel" color="cyan" route={AppRoutes.PassAndPlay}>
							<p>You and a friend on this device.</p>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
