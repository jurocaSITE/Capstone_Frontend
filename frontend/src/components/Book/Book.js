import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Ratings } from "components";

import { FaStar } from "react-icons/fa";
import apiClient from "services/apiClient";
import "./Book.css";
import { Modal } from "components";

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

	const [book, setBook] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	const [errors, setErrors] = useState(null);

	const [lists, setLists] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchListsByUserId = async () => {
			setIsFetching(true);
			try {
				const allLists = await apiClient.getAllListsByUserId();
				setLists(allLists.data.all_lists);
			} catch (error) {
				setError(error);
			}

			setIsFetching(false);
		};

		fetchListsByUserId();
	}, []);

	const addToList = async (bookId, listId) => {
		setIsFetching(true);

		const { data, error } = await apiClient.addBookToList(bookId, listId);

		setIsFetching(false);
	};

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
							// book?.imageLinks?.large ||
							book?.imageLinks?.thumbnail ||
							test_book.imgUrl
						}
					/>
					<div className="book-details">
						<div className="book-details-head">
							<h1>{book.title}</h1>
							<h2 className="book-author">
								by{" "}
								{book.author || book?.authors?.map((author) => author + `, `)}
							</h2>
							{/* Need to change published date for top Sellers */}
							<h3 className="pub-date">
								Published {book.publishedDate || test_book.pubDate}
							</h3>
						</div>

						<div className="book-details-lower">
							{book_id && (
								<span className="rating-avg">
									<FaStar size="20" />
									{book?.averageRating?.toFixed(1) || `Rating Not Available`}
								</span>
							)}
							<h2>Description</h2>
							{/* <p className="book-desc">{stripHTMLtags(book.description)}</p> */}
							<p
								className="book-desc"
								dangerouslySetInnerHTML={{ __html: book?.description }}
							/>
							<a href="#modal-opened" class="link-1" id="modal-closed">
								{/* <ActionButton link={`#`} text={"Add to List"} /> */}
								<button className="btn">Add to list</button>
							</a>
						</div>
					</div>
				</div>
				<Modal>
					<div className="select-list">
						{lists.map((list) => (
							<button
								className="btn-select-list"
								key={list.id}
								onClick={() => {
									addToList(book.id, list.id);
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
			</>
		);
	};

	return (
		<div className="Book">
			{renderBookInfo()}
			{book_id ? <Ratings book_id={book_id} /> : null}
		</div>
	);
}
