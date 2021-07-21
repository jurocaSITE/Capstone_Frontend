import { useState } from "react";
import { useNavigate } from "react-router";

export const useRatingForm = () => {
  const [errors, setErrors] = useState({});
//   const [isSearching, setIsSearching] = useState(false)
  const [form, setForm] = useState({
    rating: 0,
    reviewTitle: "",
    reviewBody: ""
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "rating") {
      if (event.target.value <= 0 || event.target.value > 5) {
        setErrors((e) => ({ ...e, rating: "Value must be between 0 and 5, excluding 0." }));
      } else {
        setErrors((e) => ({ ...e, rating: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const resetForm = () => {
      setForm({
        searchTerm: ""
      })
  }

  return { form, errors, resetForm, setErrors, handleOnInputChange };
};
