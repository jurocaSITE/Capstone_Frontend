import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Ratings, Genre } from "components";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import apiClient from "services/apiClient";
import "./Book.css";
import { Modal } from "components";
import { useAuthContext } from "contexts/auth";
import { renderBookAuthors, renderBookCategories } from "utils/book";
import moment from "moment";

const test_book = {
  title: "Book Title",
  author: "Author Name",
  pubDate: "01-10-1997",
  description:
    "This is a book about something and here is the description. Read it!",
  imgUrl:
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpre06.deviantart.net%2F4b09%2Fth%2Fpre%2Ff%2F2011%2F200%2Fb%2Ff%2Fgrey_custom_box_background_by_myfebronia-d40wsi8.png&f=1&nofb=1",
};

export default function Book() {
  //! Top Seller Books don't have a book_id bc they come from NYT api
  const { title } = useParams(); // searches url for title param if topSeller else null
  const { book_id } = useParams(); // searches url for book_id param if book else null
  const { user } = useAuthContext();

  const [book, setBook] = useState({});
  const [isFetchingBook, setIsFetchingBook] = useState(false);
  const [isFetchingLists, setIsFetchingLists] = useState(false);
  const [errors, setErrors] = useState(null);
  const [lists, setLists] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListsByUserId = async () => {
      setIsFetchingLists(true);
      try {
        const allLists = await apiClient.getAllListsByUserId();
        setLists(allLists.data.all_lists);
      } catch (error) {
        setErrors(error);
      }

      setIsFetchingLists(false);
    };

    fetchListsByUserId();
  }, []);

  const addToList = async (bookId, listId, listName) => {
    // setIsFetchingLists(true);
    const { data, error } = await apiClient.addBookToList(bookId, listId);
    if (error) {
      setErrors(error);
      console.log("error is", error);
      setTimeout(() => {
        // limits error message to show for 2 seconds
        setErrors(null);
      }, 2000);
      setIsFetchingLists(false);
    } else {
      console.log("book successfully added!");
      window.location.href = `#modal-closed`; //closes modal when book succesfully copies
      setSuccessMessage(true);
      setTimeout(() => {
        // limits success message to show for 3 seconds
        setSuccessMessage(false);
      }, 3000);
    }
    // setIsFetchingLists(false);

    const reviews = await apiClient.getRatingsForBook(bookId);
    if (listName === "Finished") {
      if (reviews?.data?.ratings.length > 0) {
        for (let i = 0; i < reviews?.data?.ratings.length; i++) {
          if (reviews.data.ratings[i].userId === user.id) {
            navigate(`/my-lists/${listId}`);
          }
        }
      } else {
        navigate(`/set-rating/add/${bookId}`);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // makes sure the page renders at the top of the screen
    const fetchBookById = async () => {
      setIsFetchingBook(true);

      const { data, error } = await apiClient.getBookById(book_id);
      if (error) {
        setErrors(error);
      }
      if (data?.book) {
        setErrors(null);
        setBook(data.book);
      }

      setIsFetchingBook(false);
    };

    const fetchTopSeller = async () => {
      setIsFetchingBook(true);

      const { data, error } = await apiClient.getTopSellerByName(title);
      if (error) {
        setErrors(error);
      }
      if (data?.top_seller) {
        setErrors(null);
        setBook(data.top_seller);
      }

      setIsFetchingBook(false);
    };

    if (title) {
      fetchTopSeller();
    }
    if (book_id) {
      fetchBookById();
    }
  }, [book_id, title]);

  const renderBookInfo = () => {
    if (isFetchingBook || isFetchingLists) {
      return <div className="loader">Loading...</div>;
    }

    return (
      <>
        <div className="book-card">
          <img
            alt="book cover"
            src={
              book?.book_image ||
              // book?.imageLinks?.large ||
              book?.imageLinks?.thumbnail ||
              test_book.imgUrl
            }
          />
          <div className="book-details">
            <div className="book-details-head">
              <h1>{book.title}</h1>
              <h2 className="book-author">
                <u>
                  {book?.author ? (
                    <a href={`/author/${book.author}`}>{book.author}</a>
                  ) : (
                    renderBookAuthors(book?.authors)
                  )}
                </u>
              </h2>

              <h3 className="pub-date">
                {book?.publishedDate && (
                  <>Published {moment(book.publishedDate).format("ll")}</>
                )}
              </h3>
            </div>

            <div className="book-details-lower">
              {book_id && (
                <>
                  <div className="categories">
                    {renderBookCategories(book?.categories).map((category) => {
                      return (
                        <div className="genre-tag" key={category}>
                          <Genre text={category} />
                        </div>
                      );
                    })}
                  </div>

                  <span className="rating-avg">
                    <FaStar size="20" />
                    {book?.averageRating?.toFixed(1) || `Rating Not Available`}
                  </span>
                </>
              )}
              <h2>Description</h2>
              <p
                className="book-desc"
                dangerouslySetInnerHTML={{ __html: book?.description }}
              />
              <a href="#modal-opened" className="link-1" id="modal-closed">
                {user && book_id ? (
                  <button className="btn">Add to list</button>
                ) : null}
              </a>
              {successMessage && (
                  <span className="success">
                    {successMessage ? "Book successfully added!" : ""}
                  </span>
                )}
            </div>
          </div>
        </div>

        <Modal modal_title="Add To">
          <div className="select-list">
            {errors ? <span className="error">{String(errors)}</span> : null}
            {lists.map((list) => (
              <button
                className="btn-select-list"
                key={list.id}
                onClick={() => {
                  addToList(book.id, list.id, list.list_name);
                }}
              >
                {list.list_name}
              </button>
            ))}
            <Link to={`/list/create-new/${book.id}`}>
              <button className="btn-select-list">Create New List +</button>
            </Link>
          </div>
        </Modal>

        {book_id ? <Ratings book_id={book_id} /> : null}
      </>
    );
  };

  return <div className="Book">{renderBookInfo()}</div>;
}
