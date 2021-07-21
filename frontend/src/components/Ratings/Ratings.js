import "./Ratings.css";
import apiClient from "services/apiClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaRegStar, FaPlus } from "react-icons/fa";
import { useAuthContext } from "contexts/auth";

export default function Ratings({ book_id }) {
  const { user } = useAuthContext();
  const [ratings, setRatings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      setIsFetching(true);
      const { data, error } = await apiClient.getRatingsForBook(book_id);
      if (error) {
        setErrors(error);
      }
      if (data?.ratings) {
        setErrors(null);
        setRatings(data.ratings);
      }
      setIsFetching(false);
    };

    fetchRatings();
  }, [book_id]);

  return (
    <div className="Ratings">
      <span className="ratings-head">
        <h2>Reviews</h2>
        {user && (
          <Link to={`/add-rating/${book_id}`}>
            Add Review +    
          </Link>
        )}
      </span>
      {errors && String(errors)}

      <div className="ratings-feed-container">
        {ratings.map((x) => (
          <div className="rating-review" key={x.id}>
            <div className="rating-review-user">
              <FaRegUser size="30" />
              <h3>{x.username}</h3>
            </div>

            <div className="rating-review-content">
              <span className="rating-review-content-head">
                <h2>{x.reviewTitle}</h2>
                <p>
                  <FaRegStar /> {x.rating}
                </p>
              </span>
              <p>{x.reviewBody}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
