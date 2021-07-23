import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchContextProvider } from "contexts/search";
import { AuthContextProvider, useAuthContext } from "contexts/auth";
import apiClient from "services/apiClient";

import {
	Account,
	Register,
	Login,
	Navbar,
	Footer,
	Home,
	UserHome,
	Book,
	SearchResults,
	Lists,
	ProfilePage,
	EditProfile,
	ListForm,
	ListFormCreateNew,
	DetailedList,
} from "components";

// this is for global context so all components can access searchResults, user
export default function AppContainer() {
	return (
		<AuthContextProvider>
			<SearchContextProvider>
				<App />
			</SearchContextProvider>
		</AuthContextProvider>
	);
}

function App() {
	const [topSellers, setTopSellers] = useState([]);
	const [errors, setErrors] = useState(null);
	const { user, setUser } = useAuthContext();
	const [listContents, setListContents] = useState([]);

	useEffect(() => {
		const fetchTopSellers = async () => {
			//setIsFetching(true)

			const { data, error } = await apiClient.getTopSellers();
			if (error) {
				setErrors((e) => ({ ...e, db: error }));
				setTopSellers([]);
			}
			if (data?.top_sellers) {
				setErrors(null);
				setTopSellers(data.top_sellers);
			}
		};
		//setIsFetching(false)
		fetchTopSellers();
	}, []);

	useEffect(() => {
		const fetchUser = async () => {
			const { data, error } = await apiClient.fetchUserFromToken();
			if (data) setUser(data.user);
			if (error) setErrors(error);
		};

		const token = localStorage.getItem("teca_token");
		if (token) {
			apiClient.setToken(token);
			fetchUser();
		}
	}, [setUser]);

	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/books/id/:book_id" element={<Book />} />
					<Route path="/books/top/sellers/:title" element={<Book />} />
					<Route path="/my-lists" element={<Lists />} />
					<Route path="/list/edit/:list_id/:listName" element={<ListForm />} />
					<Route path="/list/create-new" element={<ListFormCreateNew />} />
					<Route
						path="/list/create-new/:bookId"
						element={<ListFormCreateNew />}
					/>
					<Route path="/my-lists/:list_id" element={<DetailedList />} />
					<Route path="/account" element={<Account />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/edit-profile" element={<EditProfile />} />
					<Route
						path="/login"
						element={<Login user={user} setUser={setUser} />}
					/>
					<Route
						path="/signup"
						element={<Register user={user} setUser={setUser} />}
					/>
					<Route path="/search" element={<SearchResults />} />
					{user ? (
						<Route path="/" element={<UserHome />} />
					) : (
						<Route path="/" element={<Home topSellers={topSellers} />} />
					)}
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}
