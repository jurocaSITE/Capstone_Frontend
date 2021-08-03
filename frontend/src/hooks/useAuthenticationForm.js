import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// this has all of the logic that is shared between our login form and register form
export const useAuthenticationForm = ({ user }) => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		// if user is already logged in,
		// redirect them to the home page
		if (user?.email) {
			navigate("/");
		}
	}, [user, navigate]);

	const handleOnInputChange = (event) => {
		if (event.target.name === "email") {
			if (event.target.value.indexOf("@") === -1) {
				setErrors((e) => ({
					...e,
					email_error: "Please enter a valid email.",
				}));
			}
			if (event.target.value === "") {
				setErrors((e) => ({ ...e, email_error: "Missing email." }));
			} else {
				setErrors((e) => ({ ...e, email_error: null }));
			}
		}

		if (event.target.name === "first_name") {
			if (event.target.value === "") {
				setErrors((e) => ({ ...e, first_name_error: "Missing first name." }));
			} else {
				setErrors((e) => ({ ...e, first_name_error: null }));
			}
		}

		if (event.target.name === "last_name") {
			if (event.target.value === "") {
				setErrors((e) => ({ ...e, last_name: "Missing last name." }));
			} else {
				setErrors((e) => ({ ...e, last_name: null }));
			}
		}

		if (event.target.name === "username") {
			if (event.target.value === "") {
				setErrors((e) => ({ ...e, username: "Missing username." }));
			} else {
				setErrors((e) => ({ ...e, username: null }));
			}
		}
		if (event.target.name === "password") {
			if (event.target.value === "") {
				setErrors((e) => ({ ...e, password: "Missing password." }));
			} else {
				setErrors((e) => ({ ...e, password: null }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	return {
		form,
		errors,
		setErrors,
		handleOnInputChange,
	};
};
