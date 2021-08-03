import "./Register.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "contexts/auth";
import { useRegistrationForm } from "hooks/useRegistrationForm";

export default function Register() {
	const { user, setUser } = useAuthContext();
	const { form, errors, isProcessing, handleOnInputChange, handleOnSubmit } =
		useRegistrationForm({ user, setUser });

	return (
		<div className="Register">
			<div className="card">
				<h2>Sign up for teca</h2>

				{errors.form && <span className="error">{errors.form}</span>}
				<br />

				<div className="form">
					<div className="input-field">
						<label htmlFor="first_name">First name*</label>
						<input
							type="text"
							name="first_name"
							placeholder="Enter your first name"
							value={form.first_name}
							onChange={handleOnInputChange}
							required
						/>
						{errors.first_name_error && (
							<span className="error">{errors.first_name_error}</span>
						)}
					</div>

					<div className="input-field">
						<label htmlFor="last_name">Last name*</label>
						<input
							type="text"
							name="last_name"
							placeholder="Enter your last name"
							value={form.last_name}
							onChange={handleOnInputChange}
							required
						/>
						{errors.last_name && (
							<span className="error">{errors.last_name}</span>
						)}
					</div>

					<div className="input-field">
						<label htmlFor="name">Username*</label>
						<input
							type="text"
							name="username"
							placeholder="Enter a unique username"
							value={form.username}
							onChange={handleOnInputChange}
							required
						/>
						{errors.username && (
							<span className="error">{errors.username}</span>
						)}
					</div>

					<div className="input-field">
						<label htmlFor="email">Email Address*</label>
						<input
							type="email"
							name="email"
							placeholder="Enter a valid email"
							value={form.email}
							onChange={handleOnInputChange}
							required
						/>
						{errors.email_error && (
							<span className="error">{errors.email_error}</span>
						)}
					</div>

					<div className="input-field">
						<label htmlFor="password">Password*</label>
						<input
							type="password"
							name="password"
							placeholder="Enter a secure password"
							value={form.password}
							onChange={handleOnInputChange}
							required
						/>
						{errors.password && (
							<span className="error">{errors.password}</span>
						)}
					</div>

					<button
						className="btn"
						disabled={isProcessing}
						onClick={handleOnSubmit}
					>
						{isProcessing ? "Loading..." : "Sign Up"}
					</button>
				</div>

				<div className="footer">
					<p>
						Already have an account? <Link to="/login">Sign In</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
