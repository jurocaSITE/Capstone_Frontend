import { useState } from "react";

// this has all of the logic that is shared between our login form and register form
export const useAuthenticationForm = ({ user }) => {
	const [passVisible, setPassVisible] = useState(false);
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
	});

	// const passwordValidation = (password) => {
	// 	if (password.match(/[A-Z]/) === null) {
	// 		setErrors((e) => ({ ...e, password: "Password must contain at least one capital letter." }));
	// 	}
	// 	if (password.match(/[0-9]/) === null) {
	// 		setErrors((e) => ({ ...e, password: "Password must contain at least one number." }));
	// 	}
	// 	if (password.match(/[!@#$%^&*.]/) === null) {
	// 		setErrors((e) => ({ ...e, password: "Password must contain at least one special character." }));
	// 	}
	// 	if (password.length < 7) {
	// 		setErrors((e) => ({ ...e, password: "Password length must be greater than 7." }));
	// 	}
	// }

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
			}
			// if (event.target.value.match(/[A-Z]/) === null) {
			// 	setErrors((e) => ({
			// 		...e,
			// 		password: "Password must contain at least one capital letter.",
			// 	}));
			// }
			// if (event.target.value.match(/[0-9]/) === null) {
			// 	setErrors((e) => ({
			// 		...e,
			// 		password: "Password must contain at least one number.",
			// 	}));
			// }
			// if (event.target.value.match(/[!@#$%^&*.]/) === null) {
			// 	setErrors((e) => ({
			// 		...e,
			// 		password: "Password must contain at least one special character.",
			// 	}));
			// }
			// if (event.target.value.length < 7) {
			// 	setErrors((e) => ({
			// 		...e,
			// 		password: "Password length must be greater than 7.",
			// 	}));
			// }
			else {
				setErrors((e) => ({ ...e, password: null }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const togglePassVisibility = () => setPassVisible(!passVisible);

	return {
		form,
		errors,
		passVisible,
		setErrors,
		setPassVisible,
		handleOnInputChange,
		togglePassVisibility,
	};
};
