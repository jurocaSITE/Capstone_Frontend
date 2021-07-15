import { Link } from "react-router-dom";
import "./BookPreview.css";

const defaultBookCover =
  "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fglobal.penguinrandomhouse.com%2Fwp-content%2Fuploads%2F2017%2F12%2FQueenOfHearts.jpg&f=1&nofb=1";

export default function BookPreview({ book = {} }) {
  const topSellerBook = !book.id;
  console.log("Book Preview topSeller exists? ", topSellerBook)
  return (
    <div className="BookPreview">

      {topSellerBook ? (
        <Link to={`/books/top/sellers/${book.title}`}>
          <img alt="book cover" src={book.book_image || defaultBookCover} />
        </Link>
      ) : (
        <Link to={`/books/id/${book.id}`}>
          <img alt="book cover" src={book.book_image || defaultBookCover} />
        </Link>
      )}
    </div>
  );
}
