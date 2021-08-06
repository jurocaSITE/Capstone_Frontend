import { useState, useEffect } from "react";
import apiClient from "services/apiClient";

export const useRatingForm = ({ bookId, ratingId }) => {
	const [errors, setErrors] = useState({});
	const [isProcessing, setIsProcessing] = useState(false);
	const [rating, setRating] = useState({});
	const [form, setForm] = useState({
		rating: 0,
		reviewTitle: "",
		reviewBody: "",
		replyBody: "",
	});

	useEffect(() => {
		const fetchSingleRating = async () => {
			setIsProcessing(true);
			try {
				const singleRating = await apiClient.getSingleRating(ratingId);
				setRating(singleRating.data.rating);
				setForm({
					rating: rating?.rating || 0,
					reviewTitle: rating?.reviewTitle || "",
					reviewBody: rating?.reviewBody || "",
					replyBody: "",
				});
			} catch (error) {
				setErrors(error);
			}

			setIsProcessing(false);
		};

		fetchSingleRating();
	}, [ratingId, rating?.rating, rating?.reviewTitle, rating?.reviewBody]);

	let success = 0;

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
		success = 0;

		const { data, error } = await apiClient.createNewRatingForBook(bookId, {
			rating: form.rating,
			reviewTitle: form.reviewTitle,
			reviewBody: form.reviewBody,
		});

		if (error) {
			setErrors((e) => ({ ...e, form: error }));
			success = 0;
		}
		if (data?.rating) {
			success = 1;
		}

		setIsProcessing(false);
		return success;
	};

	const handleOnUpdate = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));
		success = 0;

		const { data, error } = await apiClient.updateRatingForBook(ratingId, {
			rating: form.rating,
			reviewTitle: form.reviewTitle,
			reviewBody: form.reviewBody,
		});

		if (error) {
			setErrors((e) => ({ ...e, form: error }));
			success = 0;
		}
		if (data?.rating) {
			success = 1;
		}

		setIsProcessing(false);
		return success;
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
