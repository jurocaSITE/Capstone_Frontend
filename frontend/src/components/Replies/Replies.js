import "./Replies.css";
import { useEffect, useState } from "react";
import moment from "moment";
import apiClient from "services/apiClient";
import { useReplyForm } from "hooks/useReplyForm";
import { useAuthContext } from "contexts/auth";

function Replies({ ratingId }) {
  const { user } = useAuthContext();
  const [replies, setReplies] = useState([]);
  const [isFetching, setIsFetching] = useState([]);
  const [errors, setErrors] = useState(null);
  const {
    form,
    isProcessing,
    setIsProcessing,
    resetForm,
    handleOnInputChange,
    handleOnUpdate,
    handleOnDelete
  } = useReplyForm({ ratingId, replyId: 0 });

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

      const { data, error } = await apiClient.getRepliesForRating(ratingId);
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
  }, [ratingId]);

  const updateOnDelete = async (replyId) => {
		setIsProcessing(true);
    // most logic handled by useReplyForm custom hook
		const deletedItem = await handleOnDelete(replyId)
		if (deletedItem) {
      // TODO: explore more efficient ways to remove an item from an array
      const newData = replies.filter((r) => !(r.id === deletedItem.id));
      setReplies(newData);
		}
		setIsProcessing(false);
	};

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
                <button
                  className="delete-reply-btn"
                  onClick={() => updateOnDelete(x.id)}
                  disabled={isProcessing}
                >
                  Delete
                </button>
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Replies;
