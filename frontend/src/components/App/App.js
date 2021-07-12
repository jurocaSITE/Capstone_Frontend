import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register, Login, Navbar, Home } from "../../components";


export default function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
