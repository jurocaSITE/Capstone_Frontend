import { useState } from "react";

export const useSearchForm = () => {
  const [errors, setErrors] = useState({});
  const [filteredData, setFilteredData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [form, setForm] = useState({
    searchTerm: "",
  });

  //! potential function for filtering for lists
  const handleFilter = (event, data) => {
    const searchTerm = event?.target?.value;
    if (searchTerm === "") {
      setFilteredData(null)
      return
    }

    const newFilter = data?.filter((value) => {
      return value?.list_name?.toLowerCase().includes(searchTerm?.toLowerCase());
    });
    setFilteredData(newFilter); // useState
  };

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
      searchTerm: "",
    });
  };

  return {
    form,
    errors,
    isSearching,
    filteredData,
    resetForm,
    setErrors,
    setIsSearching,
    setFilteredData,
    handleFilter,
    handleOnInputChange,
  };
};
