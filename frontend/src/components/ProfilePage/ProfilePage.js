import "./ProfilePage.css";
import React, { useEffect, useState } from "react";
import { AuthorCard, BookPreview, ProfileListCard } from "components";
import { useAuthContext } from "contexts/auth";
import { NotAllowed, UserRatings } from "components";
import apiClient from "services/apiClient";
import { Link } from "react-router-dom";

const defaultUserPicture =
  "https://images.unsplash.com/photo-1557672211-0741026eacfb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

function ProfilePage() {
  const { user } = useAuthContext();
  const [defaultLists, setDefaultLists] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  //   let currentlyReadingListId = "";
  //   let otherLists = [];

  useEffect(() => {
    // TODO: possibly combine some of the useEffects functions
    const fetchDefaultLists = async () => {
      setIsFetching(true);
      setError((e) => ({ ...e, defaults: null }));
      const { data, error } = await apiClient.getDefaultListsByUserId();
      if (error) {
        setError((e) => ({ ...e, defaults: error }));
      }
      if (data?.default_lists) {
        setDefaultLists(data.default_lists);
      }
      setIsFetching(false);
    };

    const fetchBooksInList = async (listId) => {
      setError((e) => ({ ...e, inList: null }));
      const { data, error } = await apiClient.getBooksInList(listId);
      if (error) {
        setError((e) => ({ ...e, inList: error }));
      }
      if (data?.books_in_list) {
        setError((e) => ({ ...e, inList: null }));
        setBookList(data.books_in_list);
      }
      if (data?.books_in_list[0] === 0) {
        setIsEmpty(true);
      }
    };

    const fetchCurrentlyReadingByUserId = async () => {
      setError((e) => ({ ...e, currently: null }));
      const { data, error } = await apiClient.getCurrentlyReadingListByUserId();
      if (error) {
        setError((e) => ({ ...e, currently: error }));
      }
      if (data?.currently_reading) {
        setError((e) => ({ ...e, currently: null }));
        // currentlyReadingListId = data.currently_reading.id;
        fetchBooksInList(data.currently_reading.id);
        console.log("bookListLength is", bookList[0]);
      }
    };

    fetchBooksInList();
    fetchCurrentlyReadingByUserId();
    fetchDefaultLists();
  }, []);

  //   const settingLists = () => {
  //     for (let i = 0; i < lists?.length; i++) {
  //       if (lists[i].list_name === "Want To Read") {
  //         defaultLists.push(lists[i]);
  //       } else if (lists[i].list_name === "Currently Reading") {
  //         defaultLists.push(lists[i]);
  //       } else if (lists[i].list_name === "Did Not Finish") {
  //         defaultLists.push(lists[i]);
  //       } else if (lists[i].list_name === "Finished") {
  //         defaultLists.push(lists[i]);
  //       } else {
  //         otherLists.push(lists[i]);
  //       }
  //     }
  //   };

  //   settingLists();

  if (!user?.email) {
    return <NotAllowed />;
  }
  if (isFetching) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="ProfilePage">
      <div className="white-chunk"></div>

      <div className="user-information-and-image">
        <div className="user-image">
          <img
            className="image"
            alt="user profile"
            src={user?.profile_picture || defaultUserPicture}
          />
        </div>
        <div className="user-information">
          <h1>{user?.username}</h1>
          {/* <div className="more-info">
						<p>15 Reading lists</p>
						<p>144 followers</p>
						<p>320 following</p>
					</div> */}
        </div>
      </div>

      {/* <div className="top-authors">
				<h2>Top authors this month</h2>
				<div className="author-cards">
					<AuthorCard />
					<AuthorCard />
					<AuthorCard />
					<AuthorCard />
				</div>
			</div> */}

      <div className="library">
        <h2>My Library</h2>
        <div className="lists-cards">
          {error?.defaults ? (
            <span className="error">{error.defaults}</span>
          ) : null}
          {defaultLists?.map((list) => (
            <ProfileListCard key={list.id} list={list} className="list-card" />
          ))}
        </div>
      </div>

      <div className="currently-reading">
        {error?.currently ? (
          <span className="error">{error.currently}</span>
        ) : null}
        {error?.inList ? <span className="error">{error.inList}</span> : null}
        <h2>Currently Reading</h2>
        <div className="books">
          {isEmpty === true ? (
            <div className="empty-message">
              <h2>
                Your list doesn't have any books in it! Add books to change
                this.
              </h2>
            </div>
          ) : (
            <div className="home-feed-books">
              {bookList.map((book) => (
                <BookPreview book={book} key={book.title} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-reviews">
        <h2>My Reviews</h2>
        
		<UserRatings setErrors={setError} />
      </div>
    </div>
  );
}

export default ProfilePage;
