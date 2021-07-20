import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "contexts/auth";
import apiClient from "services/apiClient";

export default function Register() {
	const navigate = useNavigate();
	const { user, setUser } = useAuthContext();
	const [isProcessing, setIsProcessing] = useState(false);
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
				setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
			} else {
				setErrors((e) => ({ ...e, email: null }));
			}
		}

		if (event.target.name === "first_name") {
			if (event.target.value.length === 0) {
				setErrors((e) => ({ ...e, first_name: "Missing first name." }));
			}
		}
		if (event.target.name === "last_name") {
			if (event.target.value.length === 0) {
				setErrors((e) => ({ ...e, last_name: "Missing last name." }));
			}
		}
		if (event.target.name === "username") {
			if (event.target.value.length === 0) {
				setErrors((e) => ({ ...e, username: "Missing username." }));
			}
		}
		if (event.target.name === "password") {
			if (event.target.value.length === 0) {
				setErrors((e) => ({ ...e, password: "Missing password." }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		const { data, error } = await apiClient.registerUser({
			first_name: form.first_name,
			last_name: form.last_name,
			username: form.username,
			email: form.email,
			password: form.password,
		});
		console.log(data);
		if (error) {
			setErrors((e) => ({ ...e, form: error }));
		}
		if (data?.user) {
			setUser(data.user);
			apiClient.setToken(data.token);
		}
		setIsProcessing(false);
	};

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
						{errors.first_name && (
							<span className="error">{errors.first_name}</span>
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
						{errors.email && <span className="error">{errors.email}</span>}
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
