import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Genre } from "components";
import { renderBookAuthors, renderBookCategories } from "utils/book";
import "./BookPreview.css";

const defaultBookCover =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.calendarclub.co.uk%2F-%2Fmedia%2Fproductimages%2F18%2F66%2F186694_main.jpg&f=1&nofb=1";
// "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fglobal.penguinrandomhouse.com%2Fwp-content%2Fuploads%2F2017%2F12%2FQueenOfHearts.jpg&f=1&nofb=1";

export default function BookPreview({ book = {} }) {
  const topSellerBook = !book.id; // top sellers from NYT api do not have an id

  const renderBookPreview = () => {
    return (
      <>
        <Link to={`/books/id/${book.id}`}>
          <img
            alt="book cover"
            src={
              book?.imageLinks?.large ||
              book?.imageLinks?.medium ||
              book?.imageLinks?.small ||
              book?.imageLinks?.thumbnail ||
              defaultBookCover
            }
          />
        </Link>
        <div className="book-details">
          <h2>{book.title}</h2>
          <h4>by {renderBookAuthors(book?.authors)}</h4>
          {/* <h4>by {book.authors}</h4> */}
          <span className="rating-avg">
            <FaStar size="20" />
            {book?.averageRating?.toFixed(1) || `Unavailable`}
          </span>
          <div className="categories">
            {renderBookCategories(book?.categories).map((category) => {
              return (
                <div className="genre-tag">
                  <Genre text={category} />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="BookPreview">
      {renderBookPreview()}
      {/* {topSellerBook ? (
				<>
					<Link to={`/books/top/sellers/${book.title}`}>
						<img alt="book cover" src={book?.book_image || defaultBookCover} />
					</Link>
					<div className="book-details">
						<h3>{book.title}</h3>
					</div>
				</>
			) : (
				<>
					<Link to={`/books/id/${book.id}`}>
						<img
							alt="book cover"
							src={
								book?.imageLinks?.large ||
								book?.imageLinks?.medium ||
								book?.imageLinks?.small ||
								book?.imageLinks?.thumbnail ||
								defaultBookCover
							}
						/>
					</Link>
					<div className="book-details">
						<h3>{book.title}</h3>
					</div>
				</>
			)} */}
    </div>
  );
}
