import "./Replies.css";
import { useEffect, useState } from "react";
import moment from "moment";
import apiClient from "services/apiClient";
import { useReplyForm } from "hooks/useReplyForm";
import useDetectClickOut from "hooks/useDetectClickOut";
import { useAuthContext } from "contexts/auth";

export default function Replies({ ratingId, replies, setReplies, repliesIdx }) {
  const { user } = useAuthContext();
  const { show, nodeRef, triggerRef, setShow } = useDetectClickOut(false);
  // const [replies, setReplies] = useState([]);
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
        setReplies((r) => ({...r, [repliesIdx]: data.replies}));
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
      const newData = replies[repliesIdx].filter((r) => !(r.id === deletedItem.id));
      setReplies((r) => ({...r, [repliesIdx]: newData}));
		}
		setIsProcessing(false);
	};

  return (
    <div className="Replies">
      {/* {errors?.reply && <span className="error">{errors.reply}</span>} */}

      {replies[repliesIdx]?.map((x) => (
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

// function EditReplyForm() {
//   // const { show, nodeRef, triggerRef, setShow } = useDetectClickOut(false);
//   return (
//     <>
//     {show && (
//       <form ref={nodeRef} className="form-card">
//         <label htmlFor="replyBody">Reply Body</label>
//         {/* {errors.reply && <span className="error">{errors.reply}</span>} */}
//         <textarea
//           name="replyBody"
//           placeholder="Add a Public Reply..."
//           rows="4"
//           cols="30"
//           // value={form.replyBody}
//           // onChange={handleOnInputChange}
//           required
//         />

//         <span className="form-actions">
//           <button
//             className="submit-reply-btn"
//             // onClick={() => {
//             //   handleOnSubmit(setShow, replies, setReplies, repliesIdx);
//             // }}
//             // disabled={isProcessing}
//           >
//             Submit
//           </button>
//           <button
//             className="cancel-reply-btn"
//             // onClick={() => {
//             //   resetForm();
//             //   setShow(false);
//             // }}
//           >
//             Cancel
//           </button>
//         </span>
//       </form>
//     )}
//     </>
//   )
// }