import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ActionButton } from "components";
import apiClient from "services/apiClient";
import "./Book.css";
import { Modal } from "components";

const test_book = {
	title: "All That Followed",
	author: "Gabriel Urza",
	pubDate: "01-10-1997",
	description:
		"This is a book about something and here is the description. Read it!",
	imgUrl:
		"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.raincoast.com%2Fimages%2Fuploads%2F9781627792431.jpg&f=1&nofb=1",
};

export default function Book() {
	//! Top Seller Books don't have a book_id bc they come from NYT api
	const { title } = useParams(); // searches url for title param if topSeller else null
	const { book_id } = useParams(); // searches url for book_id param if book else null

	const [book, setBook] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		window.scrollTo(0, 0); // makes sure the page renders at the top of the screen
		const fetchBookById = async () => {
			setIsFetching(true);

			const { data, error } = await apiClient.getBookById(book_id);
			if (error) {
				setErrors(error);
				// setBook({})
			}
			if (data?.book) {
				setErrors(null);
				setBook(data.book);
			}

			setIsFetching(false);
		};

		const fetchTopSeller = async () => {
			setIsFetching(true);

			const { data, error } = await apiClient.getTopSellerByName(title);
			if (error) {
				setErrors(error);
				// setBook({})
			}
			if (data?.top_seller) {
				setErrors(null);
				setBook(data.top_seller);
			}

			setIsFetching(false);
		};

		if (title) {
			fetchTopSeller();
		}
		if (book_id) {
			fetchBookById();
		}
	}, [book_id, title]);

	const renderBookInfo = () => {
		if (isFetching) {
			return <div className="loader">Loading...</div>;
		}

		if (errors) {
			return (
				<>
					<h1>Error</h1>
					<p className="error">{String(errors)}</p>
				</>
			);
		}

		return (
			<>
				<div className="book-card">
					<img
						alt="book cover"
						src={
							book?.book_image ||
							book?.imageLinks?.large ||
							book?.imageLinks?.thumbnail ||
							test_book.imgUrl
						}
					/>
					<div className="book-details">
						<div className="book-details-head">
							<h1>{book.title}</h1>
							<h2 className="book-author">by {book.author || book.authors}</h2>
							{/* Need to change published date for top Sellers */}
							<h3 className="pub-date">
								Published {book.publishedDate || test_book.pubDate}
							</h3>
						</div>

						<div class="book-details-lower">
							<h2>Description</h2>
							<p className="book-desc">{book.description}</p>
							<a href="#modal-opened" class="link-1" id="modal-closed">
								{/* <ActionButton link={`#`} text={"Add to List"} /> */}
								<button className="btn">Add to list</button>
							</a>
						</div>
					</div>
				</div>
				<Modal>Hello</Modal>
			</>
		);
	};

	return <div className="Book">{renderBookInfo()}</div>;
}
