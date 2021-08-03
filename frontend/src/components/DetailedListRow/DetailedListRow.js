import "./DetailedListRow.css";
import React from "react";
import { useState, useEffect } from "react";
import { BookPreview, Genre } from "components";
import apiClient from "services/apiClient";
import moment from "moment";
import { useParams, Link } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export default function DetailedListRow({ book }) {
    const { list_id } = useParams(); // searches url for book_id param if book else null
	const [expanded, setExpanded] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
    };
    
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => setShowMenu(!showMenu);

    const handleOnDelete = async (event) => {
        await apiClient.deleteBookById(list_id, book.id);
    };

	return (
		<div className="DetailedListRow">

			<div className="information">
				<div className="row-item">
                    <img
                    alt="book cover"
                    src={
                        book.imageLinks?.large ||
                        book.imageLinks?.medium ||
                        book.imageLinks?.small ||
                        book.imageLinks?.thumbnail
                    }
                    ></img>
                </div>
                
                {/* <div className="row-item">
                        <h2>{bookList.index + 1}</h2>
                </div> */}

				<div className="row-item">
                    <h3>{book.title}</h3>
                    <br></br>
                    <h3 className="tab">by <u><a href={`/author/${book.authors}`}> {book.author || book?.authors?.map((author) => author )} </a></u></h3>
				</div>

                <div className="row-item">
                    <h3>{moment(book.added_on).format("MMMM Do YYYY")}</h3>
				</div>

                <div className="row-item">
                    <Genre text={book.categories}/>
				</div>

                <div className="row-item">
                    <h2>{book.pageCount}</h2>
                </div>

                <div className="row-item">
                    <MoreHorizIcon className="three-dots" onClick={toggleMenu} />
                        {showMenu && (
                            <ul className="options">
                                <div>
                                    <a href="#modal-opened" class="link-1" id="modal-closed">
								{/* <ActionButton link={`#`} text={"Add to List"} /> */}
								    <button className="btn">Transfer</button>
							    </a></div>
                
                                <button className="btn remove-book" onClick={handleOnDelete}>
                                    Remove
                                </button>
                            </ul>
                        )}
                </div>

                {/* <div className="edit">
                    <MoreHorizIcon className="three-dots" onClick={toggleMenu} />

                    {showMenu && (
                        <ul className="options">
                            <Link to={`/list/edit/${list.id}/${list.list_name}`}>
                                <li>Edit</li>
                            </Link>
                        </ul>
                    )}
                </div> */}
			</div>
		</div>
	);
}