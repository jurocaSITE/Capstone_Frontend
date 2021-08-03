import "./ReplyForm.css";
import useDetectClickOut from "hooks/useDetectClickOut";
import { useReplyForm } from "hooks/useReplyForm";

function ReplyForm({ ratingId }) {
  const { show, nodeRef, triggerRef, setShow } = useDetectClickOut(false);
  const {
    form,
    errors,
    isProcessing,
    resetForm,
    handleOnInputChange,
    handleOnSubmit,
  } = useReplyForm({ ratingId, replyId: 0 });

  return (
    <div className="ReplyForm">
      <button ref={triggerRef}>Reply</button>

      {show && (
        <form ref={nodeRef} className="form-card">
            <label htmlFor="replyBody">Reply Body</label>
            {/* {errors.reply && <span className="error">{errors.reply}</span>} */}
            <textarea
              name="replyBody"
              placeholder="Add a Public Reply..."
              rows="4"
              cols="30"
              value={form.replyBody}
              onChange={handleOnInputChange}
              required
            />

            <span className="form-actions">
              <button
                className="submit-reply-btn"
                onClick={handleOnSubmit}
                disabled={isProcessing}
              >
                Submit
              </button>
              <button
                className="cancel-reply-btn"
                onClick={() => {
                  resetForm();
                  setShow(false);
                }}
              >
                Cancel
              </button>
            </span>
        </form>
      )}
    </div>
  );
}

export default ReplyForm;
