import "./DetailedList.css";
import React from "react";
import { useState, useEffect } from "react";
import { BookPreview, Genre } from "components";
import apiClient from "services/apiClient";
import moment from "moment";
import { useParams } from "react-router-dom";
import ListSidebar from "components/ListSidebar/ListSidebar";

export default function DetailedList() {
	const [listContents, setListContents] = useState([]);
	const [listName, setListName] = useState([]);
	const [errors, setErrors] = useState(null);
	const [bookList, setBookList] = useState([]);
	const { list_id } = useParams(); // searches url for book_id param if book else null
	const [isEmpty, setIsEmpty] = useState(true);

	useEffect(() => {
		const fetchListName = async () => {
			const { data, error } = await apiClient.getListNameById(list_id);
			if (error) {
				setErrors(error);
			}
			if (data?.list_name) {
				setErrors(null);
				setListName(data.list_name);
			}
		};

		const fetchBooksInList = async () => {
			const { data, error } = await apiClient.getBooksInList(list_id);
			if (error) {
				setErrors(error);
				console.log("book data is ", data);
			}
			if (data?.books_in_list) {
				setErrors(null);
				setBookList(data.books_in_list);
				console.log("data.books_in_list is ", data.books_in_list);
			}
		};

		const fetchListContents = async () => {
			const { data, error } = await apiClient.getListContents(list_id);
			if (error) {
				setErrors(error);
			}
			if (data?.list_contents) {
				setErrors(null);
				setListContents(data.list_contents);
				console.log("listContents is ", listContents);
			}
			if (data?.list_contents.length > 0) {
				setIsEmpty(false);
				console.log("isEmpty is ", isEmpty);
			}
		};

		fetchBooksInList();
		fetchListName();
		fetchListContents();
	}, []); //use effect block runs whenever the dependency changes (the stuff in the array)

	return (
		<div className="DetailedList">
			<div className="header">
				<div className="title">
					<h1>{listName}</h1>
				</div>
				<div className="num-books">
					<p>{listContents?.length} books</p>
				</div>
			</div>

			<div className="list-contents">
				<div className="column-names">
					<h3 className="title">Title</h3>
					<h3 className="date-added">Date Added</h3>
					<h3 className="tags">Tags</h3>
					<h3 className="page-count">Page Count</h3>
				</div>

				{isEmpty === true ? (
					<div className="book-info">
						<div className="empty-message">
							<h2>
								Your list doesn't have any books in it! Add books to change
								this.
							</h2>
						</div>
					</div>
				) : (
					<div className="book-info">
						<div className="index">
							{listContents.map((book, index) => (
								<div className="row">
									<h2>{index + 1}</h2>
								</div>
							))}
						</div>
						<div className="preview">
							{bookList.map((book) => (
								<div className="row">
									<img
										alt="boook cover"
										src={
											// book?.imageLinks?.large ||
											// book?.imageLinks?.medium ||
											// book?.imageLinks?.small ||
											book?.imageLinks?.thumbnail
										}
									></img>
								</div>
							))}
						</div>
						<div className="title-and-author">
							{bookList.map((book) => (
								<div className="row">
									<h3>{book.title}</h3>
									<h3>by {book.authors}</h3>
								</div>
							))}
						</div>
						<div className="dates">
							{listContents.map((book) => (
								<div className="row">
									<h3>{moment(book.added_on).format("MMMM Do YYYY")}</h3>
								</div>
							))}
						</div>
						<div className="tags">
							{bookList?.map((book) => {
								// book.categories = array w/categories
								// array called unique categories --> implement logic here using split("/") that
								// gets all unique categories and then returns for each book in the list
								const unique_categories = [];

								for (let i = 0; i < book?.categories?.length; i++) {
									let split = book.categories[i].split("/");
									for (let j = 0; j < split.length; j++) {
										if (!unique_categories.includes(split[j])) {
											unique_categories.push(split[j]);
										}
									}
								}
								return (
									<div className="row">
										{unique_categories.map((category) => {
											return (
												<div className="r">
													<Genre text={category} />
												</div>
											);
										})}
									</div>
								);
							})}
						</div>
						<div className="page-count">
							{bookList.map((book) => (
								<div className="row">
									<h2>{book.pageCount}</h2>
								</div>
							))}
						</div>
						<div className="settings">
							{bookList.map((book) => (
								<div className="row">
									<ListSidebar />
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
