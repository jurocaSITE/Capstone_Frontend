import "./UserHome.css"
import React, { useEffect, useState } from "react";
import apiClient from "services/apiClient";
import { BookPreview } from "components";



export default function UserHome({ topSellers = [] }) {
    const [error, setError] = useState(null);
    const [bookList, setBookList] = useState([]);
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
            }
      
        };

		const fetchCurrentlyReadingByUserId = async () => {
            const {data, error } = await apiClient.getCurrentlyReadingListByUserId();
            if (error) {
                setError(error);
            }
            if (data?.currently_reading) {
                setError(null);
                currentlyReadingListId = data.currently_reading.id;
                console.log(data.currently_reading)
                console.log(fetchBooksInList(currentlyReadingListId))
                fetchBooksInList(currentlyReadingListId);
            }

        };
        
        fetchBooksInList();
        fetchCurrentlyReadingByUserId();

    }, []);
    


    return (
        <div className="UserHome">
            <div className="top-feed">
                <h2>Top Sellers</h2>

                <div className="top-sellers-feed-books">
                    {topSellers.map((book) => (
                        <BookPreview book={book} key={book.title} />
                    ))}
                </div>
            </div>

            <div className="home-feed">
                <h2>Currently Reading</h2>

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
}