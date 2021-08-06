import { Link } from "react-router-dom"
import { ActionButton } from "components";
import slothLogo from "assets/teca_logo_dark_accent.png"
import "./Home.css";

const home_hero_img =
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";
const defaultBookCover = 
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.calendarclub.co.uk%2F-%2Fmedia%2Fproductimages%2F18%2F66%2F186694_main.jpg&f=1&nofb=1";

export default function Home({ topSellers = [] }) {
  console.log("process env REACT_APP_REMOTE_HOST...", process.env.REACT_APP_REMOTE_HOST_URL)
  console.log("top sellers in home...", topSellers)
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
        <img alt="library shelves" src={slothLogo || home_hero_img} />
      </div>

      <div className="home-feed">
        <h2 className="top-seller-head">NYT Top Sellers</h2>
        
        <div className="home-feed-books">
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
