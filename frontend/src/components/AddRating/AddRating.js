import "./AddRating.css";
// import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
// import apiClient from "services/apiClient";
import { useRatingForm } from "hooks/useRatingForm";
import { ActionButton } from "components";
import { useAuthContext } from "contexts/auth";
import { NotAllowed } from "components";

export default function AddRating() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { status, bookId, ratingId } = useParams();
  const {
    form,
    errors,
    isProcessing,
    handleOnInputChange,
    handleOnSubmit,
    handleOnUpdate,
  } = useRatingForm({ bookId, ratingId });

  const userOwnsRating = status === "update";

  if (!user?.email) {
    return <NotAllowed />;
  }
  return (
    <div className="AddRating">
      <h1>{ratingId ? `Update Review` : `Add Review`}</h1>

      <form autoComplete="off">
        {errors?.form && <span className="error">{errors.form}</span>}

        <div className="input-field">
          <label htmlFor="rating">Star Rating (between 0 and 5)</label>
          <span className="rating-bar">
            <input
              type="range"
              name="rating"
              min="0"
              max="5"
              step=".1"
              value={form.rating}
              onChange={handleOnInputChange}
            />
            <span className="star-rating">
              <FaRegStar size={25} /> {form.rating}
            </span>
          </span>
          {errors?.rating && <span className="error">{errors.rating}</span>}
        </div>

        <div className="input-field">
          <label htmlFor="reviewTitle">Subject Line</label>
          <input
            type="text"
            name="reviewTitle"
            placeholder="Review Title"
            value={form.reviewTitle}
            onChange={handleOnInputChange}
            required
          />
        </div>

        <div className="input-field">
          <label htmlFor="reviewBody">Review Body</label>
          <textarea
            name="reviewBody"
            placeholder="Review Body"
            rows="4"
            cols="30"
            value={form.reviewBody}
            onChange={handleOnInputChange}
            required
          ></textarea>
        </div>

        <div className="form-buttons">
          {userOwnsRating ? (
            <ActionButton
              disabled={isProcessing}
              text={isProcessing ? "Processing..." : "Update"}
              clickFunc={async () => {
                const success = await handleOnUpdate();
                if (success) {
                  navigate(`/books/id/${bookId}`);
                }
              }}
            />
          ) : (
            <ActionButton
              disabled={isProcessing}
              text={isProcessing ? "Processing..." : "Submit"}
              clickFunc={async () => {
                const success = await handleOnSubmit();
                if (success) {
                  navigate(`/books/id/${bookId}`);
                }
              }}
            />
          )}

          <ActionButton
            disabled={isProcessing}
            text={`Cancel`}
            link={`/books/id/${bookId}`}
          />
        </div>
      </form>
    </div>
  );
}
