import "./SearchResults.css";
import { useSearchContext } from "contexts/search";
import { BookPreview, ActionButton } from "components";
import apiClient from "services/apiClient";

export default function SearchResults() {
  const { searchResults, form, errors, setErrors, setSearchResults } = useSearchContext();
  let offset = 0;

  const loadMore = async () => {
    offset = searchResults.length;
    console.log("Inside loadMore with offset...", offset)
    const { data, error } = await apiClient.getBooksByKeyword(form.searchTerm, offset);
    if (error) {
      setErrors((e) => ({ ...e, db: error }));
      setSearchResults([]);
    }
    if (data?.books) {
      console.log("data.books...", data.books)
      setErrors(null);
      setSearchResults((x) => ([...x, ...data.books]));
    }
  }

  const scrollToTop = () => {window.scroll(0, 0)}

  return (
    <div className="SearchResults">
      <h1>Search Results for '{form.searchTerm}'</h1>
      {errors?.db && (
        <p>Error: {errors.db}</p>
      )}
      <div className="search-feed">
        {searchResults?.map((book) => (
          <BookPreview book={book} key={book.id} />
        ))}
      </div>
      {searchResults.length > 0 && (
        <div className="search-feed-buttons">
          <ActionButton clickFunc={loadMore} text={`Load More`} />
          <ActionButton clickFunc={scrollToTop} text={`To The Top`} />
        </div>
      )}
    </div>
  );
}
