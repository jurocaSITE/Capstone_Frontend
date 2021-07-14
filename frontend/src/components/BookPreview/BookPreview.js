import { Link } from "react-router-dom";
import "./BookPreview.css";

const defaultBookCover =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.calendarclub.co.uk%2F-%2Fmedia%2Fproductimages%2F18%2F66%2F186694_main.jpg&f=1&nofb=1"
  // "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fglobal.penguinrandomhouse.com%2Fwp-content%2Fuploads%2F2017%2F12%2FQueenOfHearts.jpg&f=1&nofb=1";

export default function BookPreview({ book = {} }) {
  const topSellerBook = !book.id; // top sellers from NYT api do not have an id
  console.log("Book Preview topSeller exists? ", topSellerBook);
  return (
    <div className="BookPreview">
      {topSellerBook ? (
        <Link to={`/books/top/sellers/${book.title}`}>
          <img alt="book cover" src={book?.book_image || defaultBookCover} />
        </Link>
      ) : (
        <Link to={`/books/id/${book.id}`}>
          <img alt="book cover" src={book.book_image || defaultBookCover} />
        </Link>
      )}
    </div>
  );
}
