import "./AddRating.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import apiClient from "services/apiClient";
import { useRatingForm } from "hooks/useRatingForm";
import { ActionButton } from "components";

export default function AddRating() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { form, errors, resetForm, setErrors, handleOnInputChange } =
    useRatingForm();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.createNewRatingForBook(bookId, {
      rating: form.rating,
      reviewTitle: form.reviewTitle,
      reviewBody: form.reviewBody,
    });

    if (error) setErrors((e) => ({ ...e, form: error }));
    if (data?.rating) {
      console.log("Rating added...", data.rating);
      navigate(`/books/id/${bookId}`);
    }

    setIsProcessing(false);
  };

  return (
    <div className="AddRating">
      <h1>Add Review</h1>

      <form>
        {errors?.form && <span className="error">{errors.form}</span>}

        <div className="input-field">
          <label htmlFor="rating">Star Rating (between 0 and 5)</label>
          <span>
            <FaRegStar /> {form.rating}
          </span>
          <input
            type="range"
            name="rating"
            min="0"
            max="5"
            step=".1"
            value={form.rating}
            onChange={handleOnInputChange}
          />
          {/* {errors?.rating && <span className="error">{errors.rating}</span>} */}
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
          {/* {errors?.password && <span className="error">{errors.password}</span>} */}
        </div>

        <div className="input-field">
          <label htmlFor="reviewBody">Review Body</label>
          <input
            type="text"
            name="reviewBody"
            placeholder="Review Body"
            value={form.reviewBody}
            onChange={handleOnInputChange}
            required
          />
          {/* {errors?.password && <span className="error">{errors.password}</span>} */}
        </div>

        {/* <button
          className="submit-btn"
          disabled={isProcessing}
          onClick={handleOnSubmit}
        >
          {isProcessing ? "Processing..." : "Submit"}
        </button> */}
        <ActionButton
          disabled={isProcessing}
          text={isProcessing ? "Processing..." : "Submit"}
          clickFunc={handleOnSubmit}
        />
      </form>
    </div>
  );
}
