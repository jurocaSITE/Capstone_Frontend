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

    const fetchCurrentlyReadingByUserId = async () => {
      const { data, error } = await apiClient.getCurrentlyReadingListByUserId();
      if (error) {
        setError((e) => ({ ...e, currently: error }));
      }
      if (data?.currently_reading) {
        setError((e) => ({ ...e, currently: null }));
        // fetchBooksInList(data.currently_reading.id);
        setBookList(data.currently_reading.list_contents)
      }
    };

    fetchCurrentlyReadingByUserId();
    fetchDefaultLists();
  }, []);

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

      <div className="user-feed">
        {/* <div className="top-authors">
				<h2>Top authors this month</h2>
				<div className="author-cards">
					<AuthorCard />
					<AuthorCard />
					<AuthorCard />
					<AuthorCard />
				</div>
			</div> */}

        <div className="current-interests-feed">
          <h2 className="header">My Favorite Genres</h2>
          {!user?.genre_interest?.length &&
            "No interests found. Change this by adding some with the button above."}
          {user?.genre_interest?.map((genre) => (
            <span className="genre-tag">{genre}</span>
          ))}
        </div>

        <div className="library">
          <h2>My Library</h2>
          <div className="lists-cards">
            {error?.defaults ? (
              <span className="error">{error.defaults}</span>
            ) : null}
            {defaultLists?.map((list) => (
              <ProfileListCard
                key={list.id}
                list={list}
                className="list-card"
              />
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
              {bookList[0] === 0 ? (
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
    </div>
  );
}

export default ProfilePage;
