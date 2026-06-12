import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./Components/Game";
import Index from "./Components/Index";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Index />}></Route>
				<Route path="/game" element={<Game />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
