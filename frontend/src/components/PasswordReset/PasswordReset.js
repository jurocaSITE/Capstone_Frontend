import "./PasswordReset.css";
import React from "react";
import { usePasswordResetForm } from "hooks/usePasswordResetForm";
import { useLocation } from "react-router-dom";

function PasswordReset() {
	// this is an extensive way to handle search parameters and it is often used for constructiong parameters when you are doing a complex search
	// just remember this is another way of passing data through the URL
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const token = searchParams.get("token"); // returns the first value assosiated to the given search parameter
	const {
		form,
		errors,
		message,
		isProcessing,
		handleOnSubmit,
		handleOnInputChange,
	} = usePasswordResetForm(token);
	return (
		<div className="PasswordReset">
			<div className="card">
				<h2>Reset Password</h2>

				{errors.form && <span className="error">{errors.form}</span>}
				<br />

				{message ? (
					<span className="message">{message}</span>
				) : (
					<div className="form">
						<div className="input-field">
							<label htmlFor="password">New Password</label>
							{errors.password && (
								<span className="error">{errors.password}</span>
							)}
							<input
								type="password"
								name="password"
								placeholder="Enter a secure password"
								value={form.password}
								onChange={handleOnInputChange}
								required
							/>
						</div>

						<button
							className="btn"
							disabled={isProcessing}
							onClick={handleOnSubmit}
						>
							{isProcessing ? "Loading..." : "Save Password"}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default PasswordReset;
