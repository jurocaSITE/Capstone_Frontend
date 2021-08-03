import "./Ratings.css";
import apiClient from "services/apiClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  FaRegUser,
  FaUser,
  FaRegStar,
  FaRegEdit,
  FaTrashAlt,
} from "react-icons/fa";
import useDetectClickOut from "hooks/useDetectClickOut";
import { useReplyForm } from "hooks/useReplyForm";
import { useAuthContext } from "contexts/auth";
import { Replies, ReplyForm } from "components";

export default function Ratings({ book_id }) {
  const { user } = useAuthContext();
  const { show, nodeRef, triggerRef } = useDetectClickOut(false);
  const [ratings, setRatings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
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

  const userOwnsRating = (rating) => {
    if (user?.username === rating?.username) {
      return true;
    } else {
      return false;
    }
  };

  const renderDelete = (x) => {
    if (show) {
      return (
        <button
          ref={nodeRef}
          className="confirm-delete-btn"
          onClick={() => {
            deleteRating(x.id);
          }}
          disabled={isDeleting}
        >
          Delete?
        </button>
      );
    }

    return (
      <span className="trash-icon" ref={triggerRef}>
        <FaTrashAlt
          size={20}
          onClick={() => {
            setConfirmDelete(!confirmDelete);
          }}
          disabled={isDeleting}
        />
      </span>
    );
  };

  const deleteRating = async (rating_id) => {
    setIsDeleting(true);

    const { data, error } = await apiClient.deleteRatingForBook(rating_id);
    if (error) {
      setErrors(error);
    }
    if (data?.rating) {
      setErrors(null);
      // return a new array without the deleted rating
      // TODO: explore more efficient ways to remove an item from an array
      const newData = ratings.filter((r) => !(r.id === data.rating.id));
      setRatings(newData);
    }

    setIsDeleting(false);
  };

  return (
    <div className="Ratings">
      <span className="ratings-head">
        <h2>Reviews</h2>
        {user && <Link to={`/set-rating/add/${book_id}`}>Add Review +</Link>}
      </span>
      {errors && String(errors)}
      {isFetching && <div className="loader"></div>}

      <div className="ratings-feed-container">
        {ratings.map((x) => (
          <div className="rating-review-replies">
            <div className="rating-review" key={x.id}>
              <div className="rating-review-user">
                {userOwnsRating(x) ? (
                  <>
                    <FaUser size="30" />
                    <h3>You</h3>
                  </>
                ) : (
                  <>
                    <FaRegUser size="30" />
                    <h3>{x.username}</h3>
                  </>
                )}
              </div>

              <div className="rating-review-content">
                <span className="rating-review-content-head">
                  <h2>{x.reviewTitle}</h2>
                  <p>
                    <FaRegStar /> {x.rating}
                  </p>
                </span>
                <p>{x.reviewBody}</p>
                <span className="meta">
                  {moment(x.updatedAt).format("lll")}
                  {x.updatedAt !== x.createdAt ? ` (edited)` : null}

                  <span className="meta-actions">
                    {userOwnsRating(x) && (
                      <>
                        <Link to={`/set-rating/update/${book_id}/${x.id}`}>
                          <FaRegEdit size={20} />
                        </Link>
                        {renderDelete(x)}
                      </>
                    )}
                    {user && !userOwnsRating(x) && (
                      <ReplyForm ratingId={x.id} />
                    )}
                  </span>
                </span>
              </div>
            </div>

            <Replies ratingId={x.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
