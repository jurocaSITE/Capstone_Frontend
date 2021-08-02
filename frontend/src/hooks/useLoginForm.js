import apiClient from "services/apiClient";
import { useState } from "react";
import { useAuthenticationForm } from "hooks/useAuthenticationForm";

export const useLoginForm = ({ user, setUser }) => {
	const { form, errors, passVisible, togglePassVisibility, setErrors, handleOnInputChange } =
		useAuthenticationForm({ user });
	const [isProcessing, setIsProcessing] = useState(false);

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		const { data, error } = await apiClient.loginUser({
			email: form.email,
			password: form.password,
		});

		if (error) setErrors((e) => ({ ...e, form: error }));
		if (data?.user) {
			setUser(data.user);
			apiClient.setToken(data.token);
		}

		setIsProcessing(false);
	};

	return {
		form,
		errors,
		isProcessing,
		passVisible,
		togglePassVisibility,
		handleOnInputChange,
		handleOnSubmit,
	};
};
