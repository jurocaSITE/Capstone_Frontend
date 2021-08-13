import "./DetailedListRow.css";
import React from "react";
import { useState, useEffect } from "react";
import { Genre, Modal } from "components";
import apiClient from "services/apiClient";
import moment from "moment";
import { useAuthContext } from "contexts/auth";
import { Link, useParams } from "react-router-dom";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import useDetectClickOut from "hooks/useDetectClickOut";
import { renderBookAuthors, renderBookCategories } from "utils/book";

export default function DetailedListRow({
  book,
  handleOnRemove,
  handleOnCopy,
  handleOnTransfer,
  errorMessage,
}) {
  const { list_id } = useParams(); // searches url for list_id param if list else null
  const [lists, setLists] = useState([]);
  const [errors, setErrors] = useState(null);
  const [isFetchingLists, setIsFetchingLists] = useState(false);
  const { user } = useAuthContext();
  const { show, nodeRef, triggerRef, setShow } = useDetectClickOut(false);

  const removeClickHandler = async () => {
    handleOnRemove(book.id);
    setShow(false);
  };

  const transferClickHandler = async (listId) => {
    handleOnTransfer(book.id, listId);
  };

  const copyClickHandler = async (listId) => {
    handleOnCopy(book.id, listId);
  };

  useEffect(() => {
    const fetchListsByUserId = async () => {
      setIsFetchingLists(true);
      try {
        const allLists = await apiClient.getAllListsByUserId();
        setLists(allLists.data.all_lists);
      } catch (error) {
        setErrors(error);
        console.log("detailed list row error is", errors);
      }

      setIsFetchingLists(false);
    };

    fetchListsByUserId();
  }, []);

  return (
    <div className="DetailedListRow">
      <div className="information">
        <div className="row-item">
          <Link to={`/books/id/${book.id}`}>
            <img alt="book cover" src={book.imageLinks?.thumbnail}></img>
          </Link>
        </div>

        <div className="row-item">
          <h3 className="tab">
            <Link to={`/books/id/${book.id}`}>
              <h3>{book.title}</h3>
            </Link>
            <br></br>
            by {renderBookAuthors(book?.authors)}
            {/* <a href={`/author/${book.authors}`}>
              {" "}
              {book.author || book?.authors?.map((author) => author + " ")}{" "}
            </a> */}
          </h3>
        </div>

        <div className="row-item">
          <h3>{moment(book.added_on).format("MMMM Do YYYY")}</h3>
        </div>

        <div className="row-item categories">
          {renderBookCategories(book?.categories).map((category) => {
            return (
              <span className="genre-tag" key={category}>
                <Genre text={category} />
              </span>
            );
          })}
        </div>

        <div className="row-item">
          <h2>{book.pageCount}</h2>
        </div>

        <div className="row-item">
          <MoreHorizIcon ref={triggerRef} className="three-dots" />
          {show ? (
            <ul ref={nodeRef} className="options">
              <a href={`#removed`} onClick={removeClickHandler}>
                <li classname="remove-button">Remove</li>
              </a>
              <a href={`#modal-opened-${book.id}-transfer`} id="modal-closed">
                {user && book.id ? <li>Transfer</li> : null}
              </a>
              <a href={`#modal-opened-${book.id}-copy`} id="modal-closed">
                {user && book.id ? <li>Add to list</li> : null}
              </a>
            </ul>
          ) : null}
        </div>
      </div>
      <Modal id={`modal-opened-${book.id}-transfer`} modal_title="Transfer to">
        <div className="select-list">
          {errorMessage ? (
            <span className="error">{String(errorMessage)}</span>
          ) : null}

          {lists.map((list) => (
            <button
              className="btn-select-list"
              key={list.id}
              onClick={() => {
                transferClickHandler(list.id);
              }}
            >
              {list.list_name}
            </button>
          ))}
        </div>
      </Modal>
      <Modal id={`modal-opened-${book.id}-copy`} modal_title="Add to">
        <div className="select-list">
          {errorMessage ? (
            <span className="error">{String(errorMessage)}</span>
          ) : null}
          {lists.map((list) => (
            <button
              className="btn-select-list"
              key={list.id}
              onClick={() => {
                copyClickHandler(list.id);
              }}
            >
              {list.list_name}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
