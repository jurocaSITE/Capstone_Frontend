import "./ForgotPassword.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "services/apiClient";

function ForgotPassword() {
	const [errors, setErrors] = useState({});
	const [success, setSucess] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
	});

	const handleOnInputChange = (event) => {
		if (event.target.name === "email") {
			if (event.target.value.indexOf("@") === -1) {
				setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
			}
			if (event.target.value === "") {
				setErrors((e) => ({ ...e, email: "Please enter an email." }));
			} else {
				setErrors((e) => ({ ...e, email: null }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		const { data, error } = await apiClient.forgotPassword({
			email: form.email,
		});

		if (error) setErrors((e) => ({ ...e, form: error }));

		setSucess(true);
		setIsProcessing(false);

		setTimeout(() => {
			navigate("/login");
		}, 3000);
	};

	return success ? (
		<div className="ForgotPassword">
			<h1>Success</h1>
			<p>Check your mail for reset link</p>
		</div>
	) : (
		<div className="ForgotPassword">
			<div className="card">
				<h2>Change Password</h2>

				{errors.form && <span className="error">{errors.form}</span>}
				<br />

				<div className="form">
					<div className="input-field">
						{errors.email && <span className="error">{errors.email}</span>}
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							placeholder="Enter email"
							value={form.email}
							onChange={handleOnInputChange}
						/>

						<button
							className="btn"
							disabled={isProcessing}
							onClick={handleOnSubmit}
						>
							{isProcessing ? "Loading..." : "Send Reset Link"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ForgotPassword;
