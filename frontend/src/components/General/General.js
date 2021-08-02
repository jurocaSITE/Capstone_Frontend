import "./General.css";
import React, { useState } from "react";
import { useAuthContext } from "contexts/auth";
import apiClient from "services/apiClient";
import { useNavigate } from "react-router-dom";

function General() {
	const navigate = useNavigate();
	const { user, setUser } = useAuthContext();
	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		username: user?.username,
		email: user?.email,
		new_password: "",
		current_password_username: "",
		current_password_email: "",
		current_password_password: "",
	});

	const handleOnInputChange = (event) => {
		if (event.target.name === "username") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					username_error: "Please enter a new username.",
				}));
			} else {
				setErrors((e) => ({ ...e, username_error: null }));
			}
		}
		if (event.target.name === "email") {
			if (event.target.value.indexOf("@") === -1) {
				setErrors((e) => ({
					...e,
					email_error: "Please enter a valid email.",
				}));
			}
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					email_error: "Please enter a new email.",
				}));
			} else {
				setErrors((e) => ({ ...e, email_error: null }));
			}
		}
		if (event.target.name === "new_password") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					new_password_error: "Please enter a new password.",
				}));
			} else {
				setErrors((e) => ({ ...e, new_password_error: null }));
			}
		}
		if (event.target.name === "current_password_username") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					current_password_username_error:
						"Please enter your current password.",
				}));
			} else {
				setErrors((e) => ({ ...e, current_password_username_error: null }));
			}
		}
		if (event.target.name === "current_password_email") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					current_password_email_error: "Please enter your current password.",
				}));
			} else {
				setErrors((e) => ({ ...e, current_password_email_error: null }));
			}
		}
		if (event.target.name === "current_password_password") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					current_password_password_error:
						"Please enter your current password.",
				}));
			} else {
				setErrors((e) => ({ ...e, current_password_password_error: null }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const handleOnSubmitUsername = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		if (form.username === "") {
			setErrors((e) => ({
				...e,
				username_error: "Please enter a new username.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, username_error: null }));
		}
		if (form.current_password_username === "") {
			setErrors((e) => ({
				...e,
				current_password_username_error: "Please enter your current password.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, current_password_username_error: null }));
		}

		const { data, error } = await apiClient.changeUserUsername({
			username: form.username,
			password: form.current_password_username,
		});

		if (error) setErrors((e) => ({ ...e, form: error }));

		setIsProcessing(false);
	};

	const handleOnSubmitEmail = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		if (form.email === "") {
			setErrors((e) => ({
				...e,
				email_error: "Please enter a new email.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, email_error: null }));
		}
		if (form.current_password_email === "") {
			setErrors((e) => ({
				...e,
				current_password_email_error: "Please enter your current password.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, current_password_email_error: null }));
		}

		const { data, error } = await apiClient.changeUserEmail({
			email: form.email,
			password: form.current_password_email,
		});

		const { dataUser, errorUser } = await apiClient.loginUser({
			email: form.email,
			password: form.current_password_email,
		});

		if (error) setErrors((e) => ({ ...e, form: error }));

		setIsProcessing(false);
	};

	const handleOnSubmitNewPassword = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		if (form.new_password === "") {
			setErrors((e) => ({
				...e,
				new_password_error: "Please enter a new password.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, new_password_error: null }));
		}
		if (form.current_password_password === "") {
			setErrors((e) => ({
				...e,
				current_password_password_error: "Please enter your current password.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, current_password_password_error: null }));
		}

		const { data, error } = await apiClient.changeUserPassword({
			updated_password: form.new_password,
			current_password: form.current_password_password,
		});

		if (error) setErrors((e) => ({ ...e, form: error }));

		setIsProcessing(false);
	};

	return (
		<div className="General">
			<div className="username-content">
				{errors.form && <span className="error">{errors?.form}</span>}
				<br />
				<h3>Username</h3>
				<label htmlFor="username">USERNAME</label>
				{errors.username_error && (
					<span className="error">{errors.username_error}</span>
				)}
				<input
					type="text"
					name="username"
					placeholder="Enter new username"
					value={form.username}
					onChange={handleOnInputChange}
				/>
				<label htmlFor="current_password_username">Verify password</label>
				{errors.current_password_username_error && (
					<span className="error">
						{errors.current_password_username_error}
					</span>
				)}
				<input
					type="password"
					name="current_password_username"
					placeholder="Enter current password"
					value={form.current_password_username}
					onChange={handleOnInputChange}
				/>

				<button
					className="btn"
					disabled={isProcessing}
					onClick={handleOnSubmitUsername}
				>
					{isProcessing ? "Loading..." : "Save"}
				</button>
			</div>

			<div className="email-content">
				<h3>Email</h3>
				<label htmlFor="email">EMAIL</label>
				{errors.email_error && (
					<span className="error">{errors.email_error}</span>
				)}
				<input
					type="text"
					name="email"
					placeholder="Enter new email"
					value={form.email}
					onChange={handleOnInputChange}
				/>
				<label htmlFor="current_password_email">Verify password</label>
				{errors.current_password_email_error && (
					<span className="error">{errors.current_password_email_error}</span>
				)}
				<input
					type="password"
					name="current_password_email"
					placeholder="Enter current password"
					value={form.current_password_email}
					onChange={handleOnInputChange}
				/>

				<button
					className="btn"
					disabled={isProcessing}
					onClick={handleOnSubmitEmail}
				>
					{isProcessing ? "Loading..." : "Save"}
				</button>
			</div>
			<div className="change-password-content">
				<h3>Change Password</h3>
				<label htmlFor="new_password">New password</label>
				{errors.new_password_error && (
					<span className="error">{errors.new_password_error}</span>
				)}
				<input
					type="password"
					name="new_password"
					placeholder="Enter new password"
					value={form.new_password}
					onChange={handleOnInputChange}
				/>
				<label htmlFor="current_password_password">Verify password</label>
				{errors.current_password_password_error && (
					<span className="error">
						{errors.current_password_password_error}
					</span>
				)}
				<input
					type="password"
					name="current_password_password"
					placeholder="Enter current password"
					value={form.current_password_password}
					onChange={handleOnInputChange}
				/>
				<button
					className="btn"
					disabled={isProcessing}
					onClick={handleOnSubmitNewPassword}
				>
					{isProcessing ? "Loading..." : "Save"}
				</button>
			</div>
		</div>
	);
}

export default General;
