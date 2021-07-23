import "./EditProfile.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "services/apiClient";
// import { useAuthContext } from "contexts/auth";

function EditProfile() {
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		first_name: "",
		last_name: "",
		profile_picture: "",
		date_of_birth: "",
	});
	// const { setUser } = useAuthContext();

	const handleOnInputChange = (event) => {
		if (event.target.name === "first_name") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					first_name_error: "Please enter a new first name or cancel.",
				}));
			} else {
				setErrors((e) => ({ ...e, first_name_error: null }));
			}
		}
		if (event.target.name === "last_name") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					last_name_error: "Please enter a new last name or cancel.",
				}));
			} else {
				setErrors((e) => ({ ...e, last_name_error: null }));
			}
		}
		if (event.target.name === "profile_picture") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					profile_picture_error: "Please enter a new image URL or cancel.",
				}));
			} else {
				setErrors((e) => ({ ...e, profile_picture_error: null }));
			}
		}
		if (event.target.name === "date_of_birth") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					date_of_birth_error: "Please enter a new date of birth or cancel.",
				}));
			} else {
				setErrors((e) => ({ ...e, date_of_birth_error: null }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		if (form.first_name === "") {
			setErrors((e) => ({
				...e,
				first_name_error: "Please enter a new first name or cancel.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, first_name_error: null }));
		}
		if (form.last_name === "") {
			setErrors((e) => ({
				...e,
				last_name_error: "Please enter a new last name or cancel.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, last_name_error: null }));
		}
		if (form.profile_picture === "") {
			setErrors((e) => ({
				...e,
				profile_picture_error: "Please enter a new image URL or cancel.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, profile_picture_error: null }));
		}
		if (form.date_of_birth === "") {
			setErrors((e) => ({
				...e,
				date_of_birth_error: "Please enter a new date of birth or cancel.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, date_of_birth_error: null }));
		}

		const { data, error } = await apiClient.editUserProfile({
			first_name: form.first_name,
			last_name: form.last_name,
			profile_picture: form.profile_picture,
			date_of_birth: form.date_of_birth,
		});

		if (error) setErrors((e) => ({ ...e, form: error }));

		setIsProcessing(false);

		navigate("/profile");
	};

	// const handleOnSignOut = async () => {
	// 	await apiClient.logoutUser();
	// 	setUser(null);
	// 	setErrors(null);
	// 	navigate("/");
	// };

	// const handleOneDelete = async (event) => {
	// 	await apiClient.deleteUserProfile();

	// 	handleOnSignOut();
	// };

	return (
		<div className="EditProfile">
			<div className="card">
				<h2>Edit User Profile</h2>

				{errors.form && <span className="error">{errors.form}</span>}
				<br />

				<div className="form">
					<div className="input-field">
						{errors.first_name_error && (
							<span className="error">{errors.first_name_error}</span>
						)}
						<label htmlFor="first_name">First name</label>
						<input
							type="text"
							name="first_name"
							placeholder="Enter your first name"
							value={form.first_name}
							onChange={handleOnInputChange}
						/>
					</div>

					<div className="input-field">
						{errors.last_name_error && (
							<span className="error">{errors.last_name_error}</span>
						)}
						<label htmlFor="last_name">Last name</label>
						<input
							type="text"
							name="last_name"
							placeholder="Enter your last name"
							value={form.last_name}
							onChange={handleOnInputChange}
						/>
					</div>

					<div className="input-field">
						{errors.profile_picture_error && (
							<span className="error">{errors.profile_picture_error}</span>
						)}
						<label htmlFor="profile_picture">Image URL</label>
						<input
							type="text"
							// type="file"
							name="profile_picture"
							placeholder="Enter a image URL"
							value={form.profile_picture}
							onChange={handleOnInputChange}
						/>
					</div>

					<div className="input-field">
						{errors.date_of_birth_error && (
							<span className="error">{errors.date_of_birth_error}</span>
						)}
						<label htmlFor="date_of_birth">Date of Birth</label>
						<input
							type="date"
							name="date_of_birth"
							value={form.date_of_birth}
							onChange={handleOnInputChange}
						/>
					</div>

					{/* <Link to="/">
						<button className="btn delete-account" onClick={handleOneDelete}>
							Delete Account
						</button>
					</Link> */}

					<div className="footer">
						<button
							className="btn"
							disabled={isProcessing}
							onClick={handleOnSubmit}
						>
							{isProcessing ? "Loading..." : "Save"}
						</button>
						<Link to={`/profile`}>
							<button className="btn cancel">Cancel</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditProfile;
