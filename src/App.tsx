import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/game/Game";
import Home from "./pages/home/Home";
import { AppRoutes } from "./constants/AppRoutes";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRoutes.Home} element={<Home />}></Route>
				<Route path={AppRoutes.PassAndPlay} element={<Game />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
