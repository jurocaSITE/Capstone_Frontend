import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "services/apiClient";

export const useRatingForm = ({ bookId, ratingId }) => {
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [form, setForm] = useState({
    rating: 0,
    reviewTitle: "",
    reviewBody: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "rating") {
      if (event.target.value <= 0 || event.target.value > 5) {
        setErrors((e) => ({
          ...e,
          rating: "Value must be between 0 and 5, excluding 0.",
        }));
      } else {
        setErrors((e) => ({ ...e, rating: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const resetForm = () => {
    setForm({
      searchTerm: "",
    });
  };

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.createNewRatingForBook(bookId, {
      rating: form.rating,
      reviewTitle: form.reviewTitle,
      reviewBody: form.reviewBody,
    });

    if (error) setErrors((e) => ({ ...e, form: error }));
    // if (data?.rating) {
    //   console.log("Rating added...", data.rating);
    // }

    setIsProcessing(false);
  };

  const handleOnUpdate = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.updateRatingForBook(ratingId, {
      rating: form.rating,
      reviewTitle: form.reviewTitle,
      reviewBody: form.reviewBody,
    });

    if (error) setErrors((e) => ({ ...e, form: error }));
    // if (data?.rating) {
    //   console.log("Rating updated...", data.rating);
    // }

    setIsProcessing(false);
  };

  return {
    form,
    errors,
    isProcessing,
    resetForm,
    setErrors,
    handleOnInputChange,
    handleOnSubmit,
    handleOnUpdate,
  };
};
