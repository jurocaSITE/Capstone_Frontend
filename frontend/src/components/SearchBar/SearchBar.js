import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "services/apiClient";
import { useSearchContext } from "contexts/search";
import { BiSearch } from "react-icons/bi";
import "./SearchBar.css";

const testKey = "hunger games"

export default function SearchBar() {
  const navigate = useNavigate();
//   const [searchResults, setSearchResults] = useState([])
    const { searchResults, setSearchResults } = useSearchContext()
  const [isFetching, setIsFetching] = useState(false)
  const [errors, setErrors] = useState(null)

  const handleOnSubmit = async () => {
    navigate("/search");
    setIsFetching(true)

    const { data, error } = await apiClient.getBooksByKeyword(testKey);
    if (error) {
      setErrors((e) => ({ ...e, db: error }));
      setSearchResults([]);
    }
    if (data?.books) {
      setErrors(null);
      setSearchResults(data.books);
      console.log("Search Results...", searchResults)
    }

    setIsFetching(false)
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        // value={form.searchTerm}
        // onChange={handleOnInputChange}
      />
      <button className="search-btn" onClick={handleOnSubmit}>
        <BiSearch className="search-icon" />
      </button>
    </div>
  );
}
