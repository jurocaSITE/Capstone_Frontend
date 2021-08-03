import { useState } from "react";
import apiClient from "services/apiClient";
import { useAuthenticationForm } from "./useAuthenticationForm";

// this passwordResetForm will expect a token and it will take this token and do some magic  with it but it will leave it for now, and then it'll extract the same thing we do in  the useRegistrationForm

export const usePasswordResetForm = (token) => {
	const { form, errors, setErrors, handleOnInputChange } =
		useAuthenticationForm({ user: {} });
	const [isProcessing, setIsProcessing] = useState(false);
	const [message, setMessage] = useState(null);

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		if (form.password === "") {
			setErrors((e) => ({
				...e,
				password: "Password Required.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, password: null }));
		}

		// we want to send 2 things, the password and the token to hit the endpoint
		const { data, error } = await apiClient.resetPassword({
			token,
			newPassword: form.password,
		});
		if (error) {
			setErrors((e) => ({ ...e, form: error }));
		}
		if (data?.message) setMessage(data.message);

		setIsProcessing(false);
	};

	return {
		form,
		errors,
		message,
		isProcessing,
		handleOnSubmit,
		handleOnInputChange,
	};
};
