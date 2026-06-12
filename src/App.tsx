import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/game/Game";
import Home from "./pages/home/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/game" element={<Game />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
