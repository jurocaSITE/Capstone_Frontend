import apiClient from "services/apiClient";
import { useState } from "react";
import { useAuthenticationForm } from "hooks/useAuthenticationForm";

export const useRegistrationForm = ({ user, setUser }) => {
	const { form, errors, passVisible, togglePassVisibility, setErrors, handleOnInputChange } =
		useAuthenticationForm({ user });
	const [isProcessing, setIsProcessing] = useState(false);

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		if (form.first_name === "") {
			setErrors((e) => ({
				...e,
				first_name: "First Name Required.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, first_name: null }));
		}
		if (form.last_name === "") {
			setErrors((e) => ({
				...e,
				last_name: "Last Name Required.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, last_name: null }));
		}
		if (form.username === "") {
			setErrors((e) => ({
				...e,
				username: "Username Required.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, username: null }));
		}
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
		if (form.email === "") {
			setErrors((e) => ({
				...e,
				email: "Email Required.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, email: null }));
		}

		const { data, error } = await apiClient.registerUser({
			first_name: form.first_name,
			last_name: form.last_name,
			username: form.username,
			email: form.email,
			password: form.password,
		});
		if (error) {
			setErrors((e) => ({ ...e, form: error }));
		}
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
