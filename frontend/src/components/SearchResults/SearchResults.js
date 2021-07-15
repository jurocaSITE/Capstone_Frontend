import { useSearchContext } from "contexts/search";
import { BookPreview } from "components";
import "./SearchResults.css";

const search_term = "hunger games";

export default function SearchResults() {
  const { searchResults } = useSearchContext();
  return (
    <div className="SearchResults">
      <h1>Search Results for '{search_term}'</h1>
      <div className="search-feed">
        {searchResults?.map((book) => (
          <BookPreview book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
}
