import { Link } from "react-router-dom"
import { ActionButton } from "components";
import slothLogo from "assets/teca_logo_dark_accent.png"
import "./Home.css";

const defaultBookCover = 
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.calendarclub.co.uk%2F-%2Fmedia%2Fproductimages%2F18%2F66%2F186694_main.jpg&f=1&nofb=1";

export default function Home({ topSellers = [], isFetchingTopSellers = false }) {
  return (
    <div className="Home">
      <div className="home-hero">
        <div className="home-hero-text">
          <h1>Welcome!</h1>
          <p>
            Thank you for visiting teca! This is your hub for all things literature:
            search for books, see ratings, create lists of books and so much more.
            Please sign up to explore everything the site has to offer.
          </p>
          <ActionButton link={"/signup"} text={"Sign up now!"} />
        </div>
        <img alt="cute sloth logo for teca" src={slothLogo} />
      </div>

      <div className="home-feed">
        <h2 className="top-seller-head">NYT Top Sellers</h2>
        
        <div className="top-seller-feed-books">
          {isFetchingTopSellers && <div className="loader">Loading...</div>}
          {topSellers.map((book) => (
            <div className="preview">
              <Link to={`/books/top/sellers/${book.title}`}>
                <img
                  alt="book cover"
                  src={book?.book_image || defaultBookCover}
                />
              </Link>
              <div className="book-details">
                <h3>{book.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
