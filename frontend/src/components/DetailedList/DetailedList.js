import "./DetailedList.css";
import React from "react";
import { useState, useEffect } from "react";
import { BookPreview } from "components";
import apiClient from "services/apiClient";
import moment from "moment";


export default function DetailedList( ) {
    const [listContents, setListContents] = useState([]);
    const [listName, setListName] = useState([]);
    const [errors, setErrors] = useState(null);
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        const fetchListContents = async () => {
            const {data, error } = await apiClient.getListContents("22");
            if (error) {
                setErrors(error);
            }
            if (data?.list_contents) {
                setErrors(null);
                setListContents(data.list_contents);    
                console.log("listContents is ", listContents)
            }
        }

        const fetchListName = async () => {
            const {data, error } = await apiClient.getListNameById("22");
            if (error) {
                setErrors(error);
            }
            if (data?.list_name) {
                setErrors(null);
                setListName(data.list_name);
            }
        }

        const fetchBooksInList = async () => {
      
            const { data, error } = await apiClient.getBooksInList("22");
            if (error) {
              setErrors(error);
              console.log("book data is ", data)
            }
            if (data?.books_in_list) {
              setErrors(null);
              setBookList(data.books_in_list);
              console.log("data.books_in_list is ", data.books_in_list);
            }
      
        };

        fetchBooksInList();
        fetchListName()
        fetchListContents()


    }, []) //use effect block runs whenever the dependency changes (the stuff in the array)

    return (

            <div className="DetailedList">

                <div className="header">
                    <div className="title">
                        <h1>{listName}</h1>
                    </div>
                    <div className="num-books">
                        <p>{listContents.length} books</p>
                    </div>
                </div>

                <div className="content">
                    <div className="column-names">
                        <h3 className="title">Title</h3>
                        <h3 className="date-added">Date Added</h3>
                        <h3 className="tags">Tags</h3>
                        <h3 className="page-count">Page Count</h3>
                    </div>

                    <div className="book-info">
                        <div className="index">
                            {listContents.map((book) => (
                                <h2>{book.id}</h2>
                            ))}
                        </div>
                        <div className="preview">
                        {listContents.map((book) => (
                            <BookPreview book={book} key={book.title} />
                        ))}
                        </div>
                        <div className="title-and-author">
                            {bookList.map((book) => (
                                <h3>{book.title}{book.authors}</h3>
                            ))}
                        </div>
                        <div className="dates">
                            {listContents.map((book) => (
                                <h3>{moment(book.added_on).format("MMMM Do YYYY")}</h3>
                            ))}
                        </div>
                        <div className="tags">
                            {bookList.map((book) => (
                                <p>{book.categories}</p>
                            ))}

                        </div>
                        <div className="page-count">
                        {bookList.map((book) => (
                                <h2>{book.pageCount}</h2>
                            ))}
                        </div>
                        <div className="settings">
                            <h1>...</h1>
                            <h1>...</h1>
                        </div>
                    </div>
                </div>
            </div>
    )
}