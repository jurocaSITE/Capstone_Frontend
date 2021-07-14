import "./App.css";
import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register, Login, Navbar, Footer, Home, UserHome, Book } from "components";
import apiClient from "services/apiClient"

// var for testing purposes. 
// remember to REMOVE (App, Navbar)
const userExists = false;

export default function App() {
	const [user, setUser] = useState({})
	const [appState, setAppState] = useState({})
	const [topSellers, setTopSellers] = useState([])
	const [errors, setErrors] = useState(null)

	useEffect(() => {
		const fetchTopSellers = async () => {
			//setIsFetching(true)

			const { data, error } = await apiClient.getTopSellers()
			if (error) {
				setErrors((e) => ({ ...e, db: error}))
				setTopSellers([])
			}
			if(data?.top_sellers) {
				setErrors(null)
				setTopSellers(data.top_sellers)
			}
		}
		//setIsFetching(false)
		fetchTopSellers()
	}, [])

	console.log("Top Sellers after call...", topSellers)

	return (

		<div className="App">
			<BrowserRouter>
				<Navbar userExists={userExists} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login user={user} setUser={setUser} />} />
					<Route path="/signup" element={<Register setAppState={setAppState} />} />
					{ userExists ?
						<Route path="/" element={<UserHome />} /> :
						<Route path="/" element={<Home topSellers={topSellers} />} /> 
					}
					<Route path="/book" element={<Book />} /> 					
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}
