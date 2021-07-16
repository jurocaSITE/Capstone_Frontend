import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "services/apiClient";
import { useSearchContext } from "contexts/search";
import { BiSearch } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import "./SearchBar.css";

const testKey = "hunger games";

export default function SearchBar() {
  const navigate = useNavigate();
  const {
    setSearchResults,
    form,
    errors,
    resetForm,
    setErrors,
    handleOnInputChange,
  } = useSearchContext();

  const [isFetching, setIsFetching] = useState(false);

  const handleOnSubmit = async () => {
    navigate("/search");
    setIsFetching(true);

    const { data, error } = await apiClient.getBooksByKeyword(form.searchTerm);
    if (error) {
      setErrors((e) => ({ ...e, db: error }));
      setSearchResults([]);
      
    }
    if (data?.books) {
      setErrors(null);
      setSearchResults(data.books);
    }

    setIsFetching(false);
  };

  return (
    <div className="SearchBar">
      <input
        type="text"
        name="searchTerm"
        placeholder="Search..."
        value={form.searchTerm}
        onChange={handleOnInputChange}
      />
      {form.searchTerm.length > 0 && (
        <IoCloseCircle className="close-icon" onClick={resetForm} />
      )}
      <button
        className="search-btn"
        disabled={isFetching}
        onClick={handleOnSubmit}
      >
        <BiSearch className="search-icon" />
      </button>
    </div>
  );
}
