import "./AuthorPage.css";
import React, { useEffect, useState } from "react";
import { BookPreview } from "components";
import { useSearchContext } from "contexts/search";
import apiClient from "services/apiClient";
import { useParams } from "react-router-dom";

const defaultUserPicture = "https://source.unsplash.com/random/1440x400";

export default function AuthorPage() {
	let offset = 0;
	const { author_name } = useParams();
	const { errors, setErrors } = useSearchContext();
	const [booksByAuthor, setBooksByAuthor] = useState([]);
	const [booksAboutAuthor, setBooksAboutAuthor] = useState([]);
	const [isBooksByAuthorEmpty, setIsBooksByAuthorEmpty] = useState(true);
	const [isBooksAboutAuthorEmpty, setIsBooksAboutAuthorEmpty] = useState(true);

	useEffect(() => {
		const fetchBooksByKeyword = async () => {
			offset = 0;
			let books_by_author = [];
			let books_about_author = [];

			const { data, error } = await apiClient.getBooksByKeyword(
				author_name,
				offset
			);
			if (error) {
				setErrors((e) => ({ ...e, db: error }));
			}
			if (data?.books) {
				setErrors(null);

				// console.log("data.books", data.books)
				// console.log("data.books[0].authors", data.books[0].authors, "compare to: author_name ", author_name)

				// THIS BLOCK FILTERS THE DATA.BOOKS TO ONLY KEEP BOOKS BY THE AUTHOR

				for (let i = 0; i < data?.books?.length; i++) {
					for (let j = 0; j < data?.books[i]?.authors?.length; j++) {
						if (data?.books[i]?.authors[j] === author_name) {
							books_by_author.push(data.books[i]);
						}
					}
				}
				setBooksByAuthor(books_by_author);

				// THIS BLOCK FILTERS THE DATA.BOOKS TO ONLY KEEP BOOKS ABOUT THE AUTHOR

				for (let i = 0; i < data.books.length; i++) {
					if (data.books[i]?.title?.includes(author_name)) {
						books_about_author.push(data.books[i]);
					}
				}
				setBooksAboutAuthor(books_about_author);

				if (books_by_author?.length > 0) {
					setIsBooksByAuthorEmpty(false);
					console.log("isBooksByAuthorEmpty", isBooksByAuthorEmpty);
				}

				if (books_about_author?.length > 0) {
					setIsBooksAboutAuthorEmpty(false);
					console.log("isBooksAboutAuthorEmpty", isBooksAboutAuthorEmpty);
				}
			}
		};

		fetchBooksByKeyword();
	}, []); //use effect block runs whenever the dependency changes (the stuff in the array)

	return (
		<div className="AuthorPage">
			<div className="container">
				<img className="img" alt="author profile" src={defaultUserPicture} />
				<div className="author-header-name">
					<h1>{author_name}</h1>
				</div>
				<div className="monthy-readers">
					<h3>1,860,293 monthly readers</h3>
				</div>
			</div>

			<div className="information">
				<div className="books-by-and-about-author">
					<h2>{author_name}'s bibliography</h2>
					{isBooksByAuthorEmpty === false ? (
						<div className="books">
							{booksByAuthor.map((book) => (
								<BookPreview book={book} key={book.title} />
							))}
						</div>
					) : (
						<div className="empty-message">
							<h2>We did not find any books by this author.</h2>
						</div>
					)}

					<h2>Books written about {author_name}</h2>
					{isBooksAboutAuthorEmpty === false ? (
						<div className="books">
							{booksAboutAuthor.map((book) => (
								<BookPreview book={book} key={book.title} />
							))}
						</div>
					) : (
						<div className="empty-message">
							<h2>We did not find any books about this author.</h2>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
