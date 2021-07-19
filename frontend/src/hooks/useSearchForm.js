import { useState } from "react";
import { useNavigate } from "react-router";

export const useSearchForm = () => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    searchTerm: ""
  });

//! potential function for filtering for lists
//   const handleFilter = (event) => {
//     const searchTerm = event.target.value
//     const newFilter = data.filter((value) => {
//         return value.title.toLowerCase().includes(searchTerm.toLowerCase())
//     })
//     setFilteredData(newFilter) // useState
//   }

  const handleOnInputChange = (event) => {
    if (event.target.name === "search") {
      if (!event.target.value) {
        setErrors((e) => ({ ...e, name: "This field cannot be empty." }));
      } else {
        setErrors((e) => ({ ...e, name: null }));
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
