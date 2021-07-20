import "./DetailedList.css";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookPreview, ActionButton } from "components";
import apiClient from "services/apiClient";

const test_list = {
    list_name: "New List",
    list_id: "1",
    book_id: "1",
    added_on: "01-10-1997",
  };

const defaultBookCover =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.calendarclub.co.uk%2F-%2Fmedia%2Fproductimages%2F18%2F66%2F186694_main.jpg&f=1&nofb=1";
    
export default function DetailedList( { } ) {
    const [listContents, setListContents] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [errors, setErrors] = useState(null);
    const { list_id } = useParams(); // searches url for list_id param if book else null


    useEffect(() => {
        window.scrollTo(0, 0); // makes sure the page renders at the top of the screen
        const fetchBooksInListById = async () => {
          setIsFetching(true);
    
        const { data, error } = await apiClient.getAllBooksInListByListId(list_id);
        console.log(data)
        if (error) {
            setErrors(error);
            }
        if (data?.listContents) {
            setErrors(null);
            setListContents(data.listContents);
        }

        setIsFetching(false);
        };
    }, [list_id]);

    const renderListInfo = () => {
        if (isFetching) {
            return <h1>Loading...</h1>;
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
                <div className="DetailedList">

                    <div className="header">
                        <div className="title">
                            <h1>{listContents?.list_name}</h1>
                        </div>
                        <div className="num-books">
                            <p>4 books</p>
                        </div>
                    </div>

                    <div className="content">
                        <div className="column-names">
                            <h3 className="title">{listContents?.list_id}</h3>
                            <h3 className="date-added">Date Added</h3>
                            <h3 className="tags">Tags</h3>
                            <h3 className="page-count">Page Count</h3>
                        </div>

                        <div className="book-info">
                            <div className="index">
                                <h2>1</h2>
                                <h2>2</h2>
                            </div>
                            <div className="preview">
                                <BookPreview />
                                <BookPreview />
                            </div>
                            <div className="title-and-author">
                                <h2>Title</h2>
                                <h3>by Author</h3>
                                <h2>Title</h2>
                                <h3>by Author</h3>
                            </div>
                            <div className="dates">
                                <h2>july 07, 2021</h2>
                                <h2>june 18, 2021</h2>
                            </div>
                            <div className="tags">
                                <h2>genre</h2>
                                <h2>genre</h2>
                            </div>
                            <div className="page-count">
                                <h2>400</h2>
                                <h2>242</h2>
                            </div>
                            <div className="settings">
                                <h1>...</h1>
                                <h1>...</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
    return <div className="List">{renderListInfo()}</div>;
}