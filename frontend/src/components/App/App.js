import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchContextProvider } from "contexts/search";
import { AuthContextProvider, useAuthContext } from "contexts/auth";
import apiClient from "services/apiClient";
import {
<<<<<<< HEAD
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
} from "components";

// var for testing purposes.
// TODO: remember to REMOVE (App, Navbar)
const userExists = false;

// this is for global context so all components can access searchResults
export default function AppContainer() {
	return (
		<SearchContextProvider>
			<App />
		</SearchContextProvider>
	);
}

function App() {
	const [topSellers, setTopSellers] = useState([]);
	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState({});
	const [appState, setAppState] = useState({});
=======
  Register,
  Login,
  Navbar,
  Footer,
  Home,
  UserHome,
  Book,
  SearchResults,
  Lists,
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
  // const [appState, setAppState] = useState({});
>>>>>>> 458c9f741a591f61dfea8ab2f4ffd6398721d9d1

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

<<<<<<< HEAD
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar userExists={userExists} />
				<Routes>
					<Route path="/books/id/:book_id" element={<Book />} />
					<Route path="/books/top/sellers/:title" element={<Book />} />
					<Route path="/my-lists" element={<Lists />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route
						path="/login"
						element={<Login user={user} setUser={setUser} />}
					/>
					<Route
						path="/signup"
						element={<Register setAppState={setAppState} />}
					/>
					<Route path="/search" element={<SearchResults />} />
					{userExists ? (
						<Route path="/" element={<UserHome />} />
					) : (
						<Route path="/" element={<Home topSellers={topSellers} />} />
					)}
				</Routes>
				<footer>
					<Footer />
				</footer>
			</BrowserRouter>
		</div>
	);
=======
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/books/id/:book_id" element={<Book />} />
          <Route path="/books/top/sellers/:title" element={<Book />} />
          <Route path="/my-lists" element={<Lists />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={<Register />}
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
>>>>>>> 458c9f741a591f61dfea8ab2f4ffd6398721d9d1
}
