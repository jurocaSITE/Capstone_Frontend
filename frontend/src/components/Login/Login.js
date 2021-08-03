import { Link } from "react-router-dom";
import { useLoginForm } from "hooks/useLoginForm";
import { useAuthContext } from "contexts/auth";
import "./Login.css";

export default function Login() {
	const { user, setUser } = useAuthContext();
	const { form, errors, isProcessing, handleOnInputChange, handleOnSubmit } =
		useLoginForm({ user, setUser });

	return (
		<div className="Login">
			<div className="card">
				<h2>Login</h2>

				{errors.form && <span className="error">{errors.form}</span>}
				<br />

				<div className="form">
					<div className="input-field">
						<label htmlFor="email">Email*</label>
						<input
							type="email"
							name="email"
							placeholder="Enter email"
							value={form.email}
							onChange={handleOnInputChange}
						/>
						{errors.email && <span className="error">{errors.email}</span>}
					</div>

					<div className="input-field">
						<label htmlFor="password">Password*</label>
						<input
							type="password"
							name="password"
							placeholder="Enter password"
							value={form.password}
							onChange={handleOnInputChange}
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
						{isProcessing ? "Loading..." : "Login"}
					</button>
				</div>

				<div className="footer">
					<p>
						Don't have an account? <Link to="/signup">Sign Up</Link>
						<br />
						Forgot your password? Reset it <Link to="/recover">here</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
