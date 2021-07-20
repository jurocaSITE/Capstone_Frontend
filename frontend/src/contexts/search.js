import { createContext, useState, useContext } from "react";
import { useSearchForm } from "hooks/useSearchForm";

const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const {
    form,
    errors,
    isSearching,
    resetForm,
    setErrors,
    setIsSearching,
    handleOnInputChange,
  } = useSearchForm();

  const searchValue = {
    searchResults,
    setSearchResults,
    form,
    errors,
    isSearching,
    resetForm,
    setErrors,
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
