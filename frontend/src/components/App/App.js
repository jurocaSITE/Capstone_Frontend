import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
	Register,
	Login,
	Navbar,
	Footer,
	Home,
	UserHome,
	Book,
} from "../../components";

// var for testing purposes.
// remember to REMOVE
const userExists = true;

export default function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					{userExists ? (
						<Route path="/" element={<UserHome />} />
					) : (
						<Route path="/" element={<Home />} />
					)}
					<Route path="/book" element={<Book />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}
