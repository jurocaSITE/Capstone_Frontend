import "./DetailedList.css";
import React from "react";
import { Link } from "react-router-dom";
import { BookPreview, ActionButton } from "components";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const defaultBookCover =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.calendarclub.co.uk%2F-%2Fmedia%2Fproductimages%2F18%2F66%2F186694_main.jpg&f=1&nofb=1";
    
export default function DetailedList({ book = {} }) {

	return (
		<div className="DetailedList">

            <div className="header">
                <div className="title">
                    <h1>List Name</h1>
                </div>
                <div className="num-books">
                    <p>4 books</p>
                </div>
            </div>

            <div className="content">
                <div className="column-names">
                    <h3 className="title">Title</h3>
                    <h3>Date Added</h3>
                    <h3>Tags</h3>
                    <h3 className="page-count">Page Count</h3>
                </div>

                <div className="book-info">
                    <div className="index">
                        <h2>1</h2>
                        <h2>2</h2>
                    </div>
                    <div className="preview">
                        <Link to={`/books/id/${book.id}`}>
                            <img alt="book cover" src={book.book_image || defaultBookCover} />
                        </Link>
                        <Link to={`/books/id/${book.id}`}>
                            <img alt="book cover" src={book.book_image || defaultBookCover} />
                        </Link>
                    </div>
                </div>
            </div>
		</div>
	);
}