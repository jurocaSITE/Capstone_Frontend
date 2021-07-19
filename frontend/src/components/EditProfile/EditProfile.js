import "./EditProfile.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "contexts/auth";
import apiClient from "services/apiClient";

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

	const handleOnInputChange = (event) => {
		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

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

	return (
		<div className="EditProfile">
			<div className="card">
				<h2>Edit User Profile</h2>

				{errors.form && <span className="error">{errors.form}</span>}
				<br />

				<div className="form">
					<div className="input-field">
						<label htmlFor="first_name">First name</label>
						<input
							type="text"
							name="first_name"
							placeholder="Enter your first name"
							value={form.first_name}
							onChange={handleOnInputChange}
						/>
						{errors.first_name && (
							<span className="error">{errors.first_name}</span>
						)}
					</div>

					<div className="input-field">
						<label htmlFor="last_name">Last name</label>
						<input
							type="text"
							name="last_name"
							placeholder="Enter your last name"
							value={form.last_name}
							onChange={handleOnInputChange}
						/>
						{errors.last_name && (
							<span className="error">{errors.last_name}</span>
						)}
					</div>

					<div className="input-field">
						<label htmlFor="name">Image URL</label>
						<input
							type="text"
							name="profile_picture"
							placeholder="Enter a image URL"
							value={form.profile_picture}
							onChange={handleOnInputChange}
						/>
						{errors.profile_picture && (
							<span className="error">{errors.profile_picture}</span>
						)}
					</div>

					<div className="input-field">
						<label htmlFor="date_of_birth">Date of Birth</label>
						<input
							type="date"
							name="date_of_birth"
							value={form.date_of_birth}
							onChange={handleOnInputChange}
						/>
						{errors.date_of_birth && (
							<span className="error">{errors.date_of_birth}</span>
						)}
					</div>

					<button
						className="btn"
						disabled={isProcessing}
						onClick={handleOnSubmit}
					>
						{isProcessing ? "Loading..." : "Save"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditProfile;
