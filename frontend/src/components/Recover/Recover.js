import "./Recover.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "services/apiClient";
import { useNavigate } from "react-router-dom";

function Recover() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
	});
	const [error, setError] = useState({});
	const [message, setMessage] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);

	const handleOnInputChange = (event) => {
		if (event.target.name === "email") {
			if (event.target.value.indexOf("@") === -1) {
				setError((e) => ({ ...e, email: "Please enter a valid email." }));
			}
			if (event.target.value.length === 0) {
				setError((e) => ({ ...e, email: "Email Required." }));
			} else {
				setError((e) => ({ ...e, email: null }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setError((e) => ({ ...e, form: null }));

		if (form.email === "") {
			setError((e) => ({
				...e,
				email: "Email required.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setError((e) => ({ ...e, email: null }));
		}

		const { data, error } = await apiClient.recoverAccount({
			email: form.email,
		});
		if (error) {
			setError((e) => ({ ...e, form: error }));
		}
		if (data?.message) {
			setMessage(data.message);
		}

		setIsProcessing(false);

		setTimeout(() => {
			navigate("/login");
		}, 3000);
	};
	
	return (
		<div className="Recover">
			<div className="card">
				<h2>Forgot Password</h2>

				{error.form && <span className="error">{error.form}</span>}
				<br />

				{message ? (
					<span className="message">{message}</span>
				) : (
					<div className="form">
						<p>Enter the email address associated with your accunt</p>
						<br />

						<div className="input-field">
							<label htmlFor="email"></label>
							<input
								type="email"
								name="email"
								placeholder="Enter valid email"
								value={form.email}
								onChange={handleOnInputChange}
							/>
						</div>

						<button
							className="btn"
							disabled={isProcessing}
							onClick={handleOnSubmit}
						>
							{isProcessing ? "Loading..." : "Send Password Reset Email"}
						</button>
					</div>
				)}

				<div className="footer">
					<p>
						Have an account? Login <Link to="/login">here.</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Recover;
