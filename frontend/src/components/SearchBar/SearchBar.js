import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "services/apiClient";
import { useSearchContext } from "contexts/search";
import { useSearchForm } from "hooks/useSearchForm";
import { BiSearch } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import "./SearchBar.css";

export default function SearchBar() {
  const navigate = useNavigate();
  const {
    setSearchResults,
    form,
    isSearching,
    setErrors,
    setIsSearching,
    handleOnInputChange,
  } = useSearchContext();
  
  const handleOnSubmit = async () => {
    navigate("/search");
    setIsSearching(true);

    const { data, error } = await apiClient.getBooksByKeyword(form.searchTerm);
    if (error) {
      setErrors((e) => ({ ...e, db: error }));
      setSearchResults([]);
    }
    if (data?.books) {
      setErrors(null);
      setSearchResults(data.books);
    }

    setIsSearching(false);
  };

  //activates if user presses enter key
  const keyPressEnter = (e) => {
    if (e.keyCode === 13) {
      handleOnSubmit()
    }
  }

  return (
    <div className="SearchBar">
      <input
        type="search"
        name="searchTerm"
        aria-label="Search for any book"
        placeholder="Search..."
        value={form.searchTerm}
        onChange={handleOnInputChange}
        onKeyDown={keyPressEnter}
      />

      <button
        className="search-btn"
        disabled={isSearching}
        onClick={handleOnSubmit}
      >
        <BiSearch className="search-icon" />
      </button>
    </div>
  );
}
