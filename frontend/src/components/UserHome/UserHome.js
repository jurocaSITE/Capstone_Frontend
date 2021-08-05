import "./UserHome.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "services/apiClient";
import { BookPreview } from "components";

const defaultBookCover =
	"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.calendarclub.co.uk%2F-%2Fmedia%2Fproductimages%2F18%2F66%2F186694_main.jpg&f=1&nofb=1";

export default function UserHome({ topSellers = [] }) {
  const [error, setError] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  let currentlyReadingListId = "";

  useEffect(() => {
    const fetchBooksInList = async (listId) => {
      const { data, error } = await apiClient.getBooksInList(listId);
      if (error) {
        setError(error);
      }
      if (data?.books_in_list) {
        setError(null);
        setBookList(data.books_in_list);
        console.log("currentlyReading",data.books_in_list);
      }
      if (data?.books_in_list[0] === 0){
        setIsEmpty(true);
      }
    };

    const fetchCurrentlyReadingByUserId = async () => {
      const { data, error } = await apiClient.getCurrentlyReadingListByUserId();
      if (error) {
        setError(error);
      }
      if (data?.currently_reading) {
        setError(null);
        currentlyReadingListId = data.currently_reading.id;
        // console.log("data.currently_reading", data.currently_reading);
        // console.log("fetchBooksInList(currentlyReadingListId)",fetchBooksInList(currentlyReadingListId));
        fetchBooksInList(currentlyReadingListId);
        console.log("bookListLength is", bookList[0])
      }
    };

    fetchBooksInList();
    fetchCurrentlyReadingByUserId();
    console.log("isEmpty", isEmpty)
  }, []);

	return (
		<div className="UserHome">
			<div className="top-feed">
				<h2>Top Sellers</h2>

				{/* CSS styling for home-feed in Home.css to avoid repetition */}
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

			<div className="home-feed">
				<h2>Currently Reading</h2>

<<<<<<< HEAD
				{/* {(isEmpty===true) ? (
                    <div className="empty-message">
                        <h2>Your list doesn't have any books in it! Add books to change this.</h2>
                    </div>
                ) : ( */}
				<div className="home-feed-books">
					{bookList.map((book) => (
						<BookPreview book={book} key={book.title} />
					))}
				</div>
				{/* )} */}
			</div>
		</div>
	);
=======
        {(isEmpty===true) ? (
                    <div className="empty-message">
                        <h2>Your list doesn't have any books in it! Add books to change this.</h2>
                    </div>
                ) : (
        <div className="home-feed-books">
          {bookList.map((book) => (
            <BookPreview book={book} key={book.title} />
          ))}
        </div>
        )}
      </div>
    </div>
  );
>>>>>>> 95530043d79bf4b3f8acfb12b408fcf6c2d16aa2
}
