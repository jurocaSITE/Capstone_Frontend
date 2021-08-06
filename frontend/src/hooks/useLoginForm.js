import apiClient from "services/apiClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationForm } from "hooks/useAuthenticationForm";

export const useLoginForm = ({ user, setUser }) => {
	const navigate = useNavigate()
	const { form, errors, passVisible, togglePassVisibility, setErrors, handleOnInputChange } =
		useAuthenticationForm({ user });
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		// if user is already logged in,
		// redirect them to the home page
		if (user?.email) {
			navigate("/");
		}
	}, [user, navigate]);

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
