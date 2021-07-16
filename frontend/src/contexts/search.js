import { createContext, useState, useContext } from "react";

const SearchContext = createContext(null);

export const SearchContextProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([])

    const searchValue = { searchResults, setSearchResults }

    return (
        <SearchContext.Provider value={searchValue} >
            <>{children}</>
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext)