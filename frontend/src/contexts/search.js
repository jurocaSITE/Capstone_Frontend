import { createContext, useState, useContext } from "react";
import { useSearchForm } from "hooks/useSearchForm";

const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const {
    form,
    errors,
    isSearching,
    filteredData,
    resetForm,
    setErrors,
    setIsSearching,
    setFilteredData,
    handleFilter,
    handleOnInputChange,
  } = useSearchForm();

  const searchValue = {
    searchResults,
    setSearchResults,
    form,
    errors,
    filteredData,
    isSearching,
    resetForm,
    setErrors,
    setFilteredData,
    handleFilter,
    setIsSearching,
    handleOnInputChange,
  };

  return (
    <SearchContext.Provider value={searchValue}>
      <>{children}</>
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);
