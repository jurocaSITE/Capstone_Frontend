import "./DetailedList.css";
import React from "react";
import { useState, useEffect } from "react";
import { DetailedListRow, ListView } from "components";
import apiClient from "services/apiClient";
import { useParams } from "react-router-dom";
import { useAuthContext } from "contexts/auth";
import { NotAllowed } from "components";

export default function DetailedList() {
	const { user, setUser } = useAuthContext();
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
			}
			if (data?.books_in_list) {
				setErrors(null);
				// console.log("books in list", data.books_in_list)
				setBookList(data.books_in_list);
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
			}
			if (data?.list_contents.length > 0) {
				setIsEmpty(false);
			}
		};

		fetchBooksInList();
		fetchListName();
		fetchListContents();
	}, []); //use effect block runs whenever the dependency changes (the stuff in the array)

		//create component "ListView" with just a div that iterates through bookList and provide detailedListRow
		//pass bookList to the componenent

	// const handleOnRemove = async (bookId) => {
	// 	const deletedItem = await apiClient.deleteBookById(list_id, bookId);
	// 	console.log("bookId is", bookId)
    // };

    // const handleOnCopy = async (bookId, listId) => {
    //     const { data, error } = await apiClient.addBookToList(bookId, listId);
    //     if (error) {
    //         setErrors(error);
    //         console.log(error)
    //     }
    // };

    // const handleOnTransfer = async (bookId, listId) => {
    //     const { data, error } = await apiClient.addBookToList(bookId, listId);
    //     if (error) {
    //         setErrors(error);
    //         console.log(error)
    //     }
    //     if (!error){
    //         handleOnRemove();
    //     }
	// };
	
	// if (!user?.email) {
	// 	return <NotAllowed />;
	// }

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
					<h3 className="title">Title and Author</h3>
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
						<div className="display">
							{/* <ListView bookList={bookList} handleOnRemove={handleOnRemove} /> */}
							{/* {bookList.map((book) => (
								<div className="row">
									<DetailedListRow book={book} handleOnRemove={handleOnRemove} handleOnCopy={handleOnCopy} handleOnTransfer={handleOnTransfer}/>
								</div>	
							))} */}
							{bookList.map((book) => (
								<div className="row">
									<DetailedListRow book={book}/>
								</div>	
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
