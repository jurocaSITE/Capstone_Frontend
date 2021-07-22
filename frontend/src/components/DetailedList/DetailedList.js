import "./DetailedList.css";
import React from "react";
import { useState, useEffect } from "react";
import { BookPreview, Genre } from "components";
import apiClient from "services/apiClient";
import moment from "moment";
import { useParams } from "react-router-dom";
import ListSidebar from "components/ListSidebar/ListSidebar";


export default function DetailedList( ) {
    const [listContents, setListContents] = useState([]);
    const [listName, setListName] = useState([]);
    const [errors, setErrors] = useState(null);
    const [bookList, setBookList] = useState([]);
    const { list_id } = useParams(); // searches url for book_id param if book else null


    useEffect(() => {
        const fetchListContents = async () => {
            const {data, error } = await apiClient.getListContents(list_id);
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
            const {data, error } = await apiClient.getListNameById(list_id);
            if (error) {
                setErrors(error);
            }
            if (data?.list_name) {
                setErrors(null);
                setListName(data.list_name);
            }
        }

        const fetchBooksInList = async () => {
      
            const { data, error } = await apiClient.getBooksInList(list_id);
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
                            {listContents.map((book, index) => (
                                <h2>{index+1}</h2>
                            ))}
                        </div>
                        <div className="preview">
                            {bookList.map((book) => (
                                <BookPreview book={book} key={book.title} />
                            ))}
                        </div>
                        <div className="title-and-author">
                            {bookList.map((book) => (
                                <h3>{book.title} by {book.authors}</h3>
                            ))}
                        </div>
                        <div className="dates">
                            {listContents.map((book) => (
                                <h3>{moment(book.added_on).format("MMMM Do YYYY")}</h3>
                            ))}
                        </div>
                        <div className="tags">
                            {/* {bookList.map((book) => (
                                <p>{book.categories}</p>
                            ))} */}
                            {bookList.map((book) => (
                                <Genre text={book.categories}/>
                            ))}

                        </div>
                        <div className="page-count">
                            {bookList.map((book) => (
                                <h2>{book.pageCount}</h2>
                            ))}
                        </div>
                        <div className="settings">
                            {bookList.map((book) => (
                                <ListSidebar/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
    )
}