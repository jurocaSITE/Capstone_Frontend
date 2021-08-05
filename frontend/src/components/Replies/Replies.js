import "./Replies.css";
import { useEffect, useState } from "react";
import moment from "moment";
import apiClient from "services/apiClient";
import { useReplyForm } from "hooks/useReplyForm";
import useDetectClickOut from "hooks/useDetectClickOut";
import { useAuthContext } from "contexts/auth";

export default function Replies({ ratingId, replies, setReplies, repliesIdx }) {
  const { user } = useAuthContext();
  const [showReplies, setShowReplies] = useState(false);
  const [isFetching, setIsFetching] = useState([]);
  const [errors, setErrors] = useState(null);
  const { isProcessing, handleOnDelete } = useReplyForm({
    ratingId,
  });

  const userOwnsReply = (reply) => {
    if (user?.id === reply?.userId) {
      return true;
    } else {
      return false;
    }
  };

  const repliesExist = replies[repliesIdx]?.length;

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
        setReplies((r) => ({ ...r, [repliesIdx]: data.replies }));
      }

      setIsFetching(false);
    };

    fetchReplies();
  }, [ratingId, repliesIdx, setReplies]);

  const toggleShowReplies = () => setShowReplies(!showReplies);

  return (
    <div className="Replies">
      {/* {errors?.reply && <span className="error">{errors.reply}</span>} */}

      {repliesExist ? (
        <button className="show-replies-toggle" onClick={toggleShowReplies}>
          {showReplies ? `Hide ${repliesExist} Replies` : `View ${repliesExist} Replies`}
        </button>
      ) : null}

      <div hidden={!showReplies} className="replies-feed-container">
        {replies[repliesIdx]?.map((x) => (
          <div className="reply-container">
            <p>{x.replyBody}</p>
            <span className="reply-meta">
              {moment(x.updatedAt).format("lll")}
              {x.updatedAt !== x.createdAt ? ` (edited)` : null}

              {userOwnsReply(x) && (
                <span className="meta-actions">
                  <EditReplyForm
                    ratingId={ratingId}
                    replyId={x.id}
                    replyBody={x.replyBody}
                    replies={replies}
                    setReplies={setReplies}
                    repliesIdx={repliesIdx}
                  />
                  <button
                    className="delete-reply-btn"
                    onClick={() =>
                      handleOnDelete(x.id, replies, setReplies, repliesIdx)
                    }
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
    </div>
  );
}

function EditReplyForm({
  ratingId,
  replyId,
  replyBody,
  replies,
  setReplies,
  repliesIdx,
}) {
  const { show, nodeRef, triggerRef, setShow } = useDetectClickOut(false);
  const {
    form,
    isProcessing,
    setForm,
    resetForm,
    handleOnInputChange,
    handleOnUpdate,
  } = useReplyForm({ ratingId });

  useEffect(() => {
    setForm({
      replyBody: replyBody,
    });
  }, [replyBody, setForm]);

  return (
    <span className="EditReplyForm">
      <button ref={triggerRef}>Edit</button>

      {show && (
        <div ref={nodeRef} className="form-card">
          <label hidden htmlFor="replyBody">
            Update Reply
          </label>
          {/* {errors.reply && <span className="error">{errors.reply}</span>} */}
          <textarea
            name="replyBody"
            placeholder="Add a Public Reply..."
            rows="4"
            cols="30"
            value={form.replyBody}
            onChange={handleOnInputChange}
          />

          <span className="form-actions">
            <button
              className="submit-reply-btn"
              onClick={() => {
                handleOnUpdate(
                  setShow,
                  replyId,
                  replies,
                  setReplies,
                  repliesIdx
                );
              }}
              disabled={isProcessing}
            >
              Update
            </button>
            <button
              className="cancel-reply-btn"
              onClick={() => {
                resetForm();
                setShow(false);
              }}
              disabled={isProcessing}
            >
              Cancel
            </button>
          </span>
        </div>
      )}
    </span>
  );
}
