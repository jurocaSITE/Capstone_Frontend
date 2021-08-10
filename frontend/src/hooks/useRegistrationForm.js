import apiClient from "services/apiClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationForm } from "hooks/useAuthenticationForm";

export const useRegistrationForm = ({ user, setUser }) => {
	const navigate = useNavigate();
	const {
		form,
		errors,
		passVisible,
		togglePassVisibility,
		setErrors,
		handleOnInputChange,
	} = useAuthenticationForm({ user });
	const [isProcessing, setIsProcessing] = useState(false);

	useEffect(() => {
		// if user is already logged in,
		// redirect them to the home page
		if (user?.email) {
			navigate("/update-interests");
		}
	}, [user, navigate]);

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		if (form.first_name === "") {
			setErrors((e) => ({
				...e,
				first_name_error: "First Name Required.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, first_name_error: null }));
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
		}
		if (form.password.match(/[A-Z]/) === null) {
			setErrors((e) => ({
				...e,
				password: "Password must contain at least one capital letter.",
			}));
			setIsProcessing(false);
			return;
		}
		if (form.password.match(/[0-9]/) === null) {
			setErrors((e) => ({
				...e,
				password: "Password must contain at least one number.",
			}));
			setIsProcessing(false);
			return;
		}
		if (form.password.match(/[!@#$%^&*.]/) === null) {
			setErrors((e) => ({
				...e,
				password: "Password must contain at least one special character.",
			}));
			setIsProcessing(false);
			return;
		}
		if (form.password.length < 7) {
			setErrors((e) => ({
				...e,
				password: "Password length must be greater than 7.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, password: null }));
		}
		if (form.email === "") {
			setErrors((e) => ({
				...e,
				email_error: "Email Required.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, email_error: null }));
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
			console.log("Navigating after registration...");
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
