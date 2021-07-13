import "./App.css";
import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register, Login, Navbar, Home } from "../../components";

export default function App() {
	const [user, setUser] = useState({})
	
	return (

		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login user={user} setUser={setUser} />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
