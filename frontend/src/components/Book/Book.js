import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiClient from "services/apiClient"
import "./Book.css"

const default_book = {
    title: "All That Followed",
    author: "Gabriel Urza",
    pubDate: "01-10-1997",
    description: "This is a book about something and here is the description. Read it!",
    imgUrl: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.raincoast.com%2Fimages%2Fuploads%2F9781627792431.jpg&f=1&nofb=1"
}

//! Top Seller Books don't have a book_id bc they come from NYT API
export default function Book() {
    const { book_id } = useParams()
    const [book, setBook] = useState({})
    const [isFetching, setIsFetching] = useState(false)
    const [errors, setErrors] = useState(null)

    console.log("Book_ID...", book_id)
    
    useEffect(() => {
        const fetchBookById = async () => {
            setIsFetching(true)

            const { data, error } = await apiClient.getBookById(book_id)
			if (error) {
				setErrors(error)
				// setBook({})
			}
			if(data?.book) {
				setErrors(null)
				setBook(data.book)
			}

            setIsFetching(false)
        }

        fetchBookById()
    }, [])

    const renderBookInfo = () => {
        if (isFetching) {
            return <h1>Loading...</h1>
        }
        //! Uncomment and check for Top Seller
        if (errors) {
            return (
                <>
                <h1>Error</h1>
                <p className="error">{String(errors)}</p>
                </>
            )
        }

        return (
            <>
            <div className="book-card">
                <img alt="book cover" src={default_book.imgUrl} />
                <div className="book-details">
                    <div className="book-details-head">
                        <h1>{default_book.title}</h1>
                        <h2>by {default_book.author}</h2>
                        <h3 className="pub-date">Published {default_book.pubDate}</h3>
                    </div>
                    <h2>Description</h2>
                    <p>{default_book.description}</p>
                    <button className="add-book-btn">
                        Add to List
                    </button>
                </div>
            </div>
            </>
        )
    }

    return (
        <div className="Book">
            {renderBookInfo()}
        </div>
    );
}