import { BrowserRouter, Route, Routes } from "react-router-dom";
import Game from "./pages/game/Game.tsx";
import Home from "./pages/home/Home.tsx";
import { AppRoutes } from "./constants/AppRoutes.ts";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRoutes.Home} element={<Home />}></Route>
				<Route path={AppRoutes.PassAndPlay} element={<Game mode="Pass and Play" />}></Route>
				<Route path={AppRoutes.Easy} element={<Game mode="Easy AI" />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
