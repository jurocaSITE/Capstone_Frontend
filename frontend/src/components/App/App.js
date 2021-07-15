import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { Register, Login, Navbar, Footer, Home, UserHome, Book, UserPortal } from "components";
import apiClient from "services/apiClient"

// var for testing purposes. 
// TODO: remember to REMOVE (App, Navbar)
const userExists = true;

export default function App() {
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

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar userExists={userExists} />
				<Routes>
					{ userExists ?
						<Route path="/" element={<UserHome />} /> :
						<Route path="/" element={<Home topSellers={topSellers} />} /> 
					}
					<Route path="/books/id/:book_id" element={<Book />} /> 					
					<Route path="/books/top/sellers/:title" element={<Book />} />
					<Route path="/test" element={<UserPortal />} /> 					
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}
