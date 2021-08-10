import "./UserRatings.css";
import apiClient from "services/apiClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { FaRegStar, FaBookmark } from "react-icons/fa";

function UserRatings({ setErrors }) {
  const [ratings, setRatings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  //   const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      setIsFetching(true);
      const { data, error } = await apiClient.getRatingsByUser();
      if (error) {
        setErrors((e) => ({ ...e, ratings: error }));
      }
      if (data?.ratings) {
        setErrors((e) => ({ ...e, ratings: null }));
        setRatings(data.ratings);
      }
      setIsFetching(false);
    };

    fetchRatings();
  }, []);

  if (isFetching) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="UserRatings">
      <div className="ratings-feed-container">
        {ratings?.map((x) => (
          <div className="rating-review">
            <Link to={`/books/id/${x.bookId}`}>
              <FaBookmark className="bookmark" />
            </Link>
            <div className="rating-review-content">
              <span className="rating-review-content-head">
                <h2>{x.reviewTitle}</h2>
                <p>
                  <FaRegStar /> {x.rating}
                </p>
              </span>

              <p className="review-body">{x.reviewBody}</p>

              <span className="meta">
                {moment(x.updatedAt).format("lll")}
                {x.updatedAt !== x.createdAt ? ` (edited)` : null}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserRatings;
