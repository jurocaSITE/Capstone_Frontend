import "./SearchResults.css";
import { useState } from "react";
import { useSearchContext } from "contexts/search";
import { BookPreview, ActionButton } from "components";
import apiClient from "services/apiClient";
import { useEffect } from "react";

export default function SearchResults() {
  const [loading, setLoading] = useState(false);
  let offset = 0;
  const {
    searchResults,
    form,
    errors,
    isSearching,
    setErrors,
    setSearchResults,
  } = useSearchContext();

  useEffect(() => {
    scrollToTop();
    setSearchResults([]);
  }, [setSearchResults]);

  const loadMore = async () => {
    setLoading(true);
    offset = searchResults.length;
    const { data, error } = await apiClient.getBooksByKeyword(
      form.searchTerm,
      offset
    );
    if (error) {
      setErrors((e) => ({ ...e, db: error }));
      setSearchResults([]);
    }
    if (data?.books) {
      setErrors(null);
      setSearchResults((x) => [...x, ...data.books]);
    }
    setLoading(false);
  };

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div className="SearchResults">
      <h1>Search Results for '{form.searchTerm}'</h1>
      {isSearching && <div className="loader">Loading...</div>}
      {errors?.db && <p>Error: {errors.db}</p>}

      <div className="search-feed">
        {searchResults?.map((book) => (
          <BookPreview book={book} key={book.id} />
        ))}
      </div>

      {searchResults.length > 0 && (
        <div className="search-feed-buttons">
          <ActionButton
            disable={loading}
            clickFunc={loadMore}
            text={loading ? `Loading...` : `Load More`}
          />
          <ActionButton clickFunc={scrollToTop} text={`To The Top`} />
        </div>
      )}
    </div>
  );
}
