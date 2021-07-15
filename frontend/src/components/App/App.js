import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { SearchContextProvider, useSearchContext } from "contexts/search";
import apiClient from "services/apiClient";
import {
  Register,
  Login,
  Navbar,
  Footer,
  Home,
  UserHome,
  Book,
  SearchResults,
} from "components";

// var for testing purposes.
// TODO: remember to REMOVE (App, Navbar)
const userExists = true;

// this is for global context so all components can access searchResults
export default function AppContainer() {
	return (
		<SearchContextProvider>
			<App />
		</SearchContextProvider>
	)
}

function App() {
  const [topSellers, setTopSellers] = useState([]);
  const [errors, setErrors] = useState(null);

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

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar userExists={userExists} />
        <Routes>
          {userExists ? (
            <Route path="/" element={<UserHome />} />
          ) : (
            <Route path="/" element={<Home topSellers={topSellers} />} />
          )}
          <Route path="/books/id/:book_id" element={<Book />} />
          <Route path="/books/top/sellers/:title" element={<Book />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
