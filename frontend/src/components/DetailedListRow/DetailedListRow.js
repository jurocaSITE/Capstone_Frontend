import "./DetailedListRow.css";
import React from "react";
import { useState, useEffect } from "react";
import { Genre, Modal } from "components";
import apiClient from "services/apiClient";
import moment from "moment";
import { useAuthContext } from "contexts/auth";
import { useParams } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export default function DetailedListRow({ book }) {
    const { list_id } = useParams(); // searches url for list_id param if list else null
    const [expanded, setExpanded] = React.useState(false);
    const [lists, setLists] = useState([]);
    const [errors, setErrors] = useState(null);
    const [isFetchingLists, setIsFetchingLists] = useState(false);
    const [babyError, setBabyError] = useState({});
    const { user } = useAuthContext();

	const handleExpandClick = () => {
		setExpanded(!expanded);
    };
    
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => setShowMenu(!showMenu);

    const handleOnDelete = async (event) => {
        await apiClient.deleteBookById(list_id, book.id);
    };

    const handleOnTransfer = async (listId) => {
        setIsFetchingLists(true);
        const { data, error } = await apiClient.addBookToList(book.id, listId);
        if (error) {
            setErrors(error);
            console.log(error)
            setBabyError((e) => ({ ...e, modal: "Cannot add duplicate book." }));
        }
        if (!error){
            handleOnDelete();
        }
    };

    useEffect(() => {
        const fetchListsByUserId = async () => {
        setIsFetchingLists(true);
        try {
            const allLists = await apiClient.getAllListsByUserId();
            setLists(allLists.data.all_lists);
        } catch (error) {
            setErrors(error);
        }

        setIsFetchingLists(false);
        };

        fetchListsByUserId();
    }, []);

    // const splitCategories = async (categories) => {
    //     const unique_categories = [];

    //     for (let i = 0; i < categories.length; i++) {
    //         let split = categories[i].split("/");
    //         for (let j = 0; j < split.length; j++) {
    //             if (!unique_categories.includes(split[j])) {
    //                 unique_categories.push(split[j]);
    //             }
    //         }
    //     }
    // };
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
                    <h3 className="tab">by <a href={`/author/${book.authors}`}> {book.author || book?.authors?.map((author) => author + " " )} </a></h3>
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
                                    <button className="btn" onClick={handleOnDelete}>
                                        Remove
                                    </button>
                                    <a href={`#modal-opened-${book.id}`} className="link-1" id="modal-closed">
                                        {user && book.id ? <button className="btn">Transfer {book.title}</button> : null}
                                    </a>
                                    
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
             <Modal id={`modal-opened-${book.id}`}>
                {lists.map((list) => (
                <button
                    className="btn-select-list"
                    key={list.id}
                    onClick={() => {
                        // console.log("errors is", errors)
                        // console.log("this should be false", (errors === "Cannot add duplicate book."))
                        // console.log("babyError is", babyError)
                            handleOnTransfer(list.id);   
                            console.log("book.id", book.id, "book title is", book.title)
                            console.log("transfer and delete should have successfully happened")                       
                    }}
                >
                {list.list_name}
                </button>
                ))}
            </Modal> 
		</div>
	);
}