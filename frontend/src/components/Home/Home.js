import { BookPreview } from "components";
import "./Home.css";

const home_hero_img =
  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";

export default function Home({ topSellers = [] }) {
  return (
    <div className="Home">
      <div className="home-hero">
        <div className="home-hero-text">
          <h1>Welcome!</h1>
          <p>
            This is a description about the website: what you can do, some core
            features, and much more. Please sign up to explore everything the
            site has to offer.
          </p>
          <button className="call-to-sign-up">Sign Up</button>
        </div>
        <img alt="library shelves" src={home_hero_img} />
      </div>

      <div className="home-feed">
        <h2>NYT Top Sellers</h2>
        <div className="home-feed-books">
          {topSellers.map((book) => (
            <BookPreview bookCover={book.book_image} key={book.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
