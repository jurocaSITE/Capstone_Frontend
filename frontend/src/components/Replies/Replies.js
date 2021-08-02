import "./Replies.css";
import { useEffect, useState } from "react";
import moment from "moment";
import apiClient from "services/apiClient";
import { useAuthContext } from "contexts/auth";

function Replies({ rating_id }) {
  const { user } = useAuthContext();
  const [replies, setReplies] = useState([]);
  const [isFetching, setIsFetching] = useState([]);
  const [errors, setErrors] = useState(null);

  const userOwnsReply = (reply) => {
    if (user?.id === reply?.userId) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const fetchReplies = async () => {
      setIsFetching(true);
      setErrors(null);

      const { data, error } = await apiClient.getRepliesForRating(rating_id);
      if (error) {
        setErrors((e) => ({ ...e, reply: error }));
      }
      if (data?.replies) {
        setErrors((e) => ({ ...e, reply: null }));
        setReplies(data.replies);
      }

      setIsFetching(false);
    };

    fetchReplies();
  }, [rating_id]);

  return (
    <div className="Replies">
      {/* {errors?.reply && <span className="error">{errors.reply}</span>} */}

      {replies.map((x) => (
        <div className="reply-container">
          <p>{x.replyBody}</p>
          <span className="reply-meta">
            {moment(x.updatedAt).format("lll")}
            {x.updatedAt !== x.createdAt ? ` (edited)` : null}

            {userOwnsReply(x) && (
              <span className="meta-actions">
                <button className="edit-reply-btn">Edit</button>
                <button className="delete-reply-btn">Delete</button>
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Replies;
