import "./UpdateGenreInterests.css";
import React from "react";
import apiClient from "services/apiClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { useAuthContext } from "contexts/auth";
import { ActionButton } from "components";
import { genres } from "services/genres";

export default function UpdateGenreInterests() {
	const navigate = useNavigate();
	const { user, setUser } = useAuthContext();
	const [interests, setInterests] = useState({});
	const [errors, setErrors] = useState({});
	const [successMessage, setSuccessMessage] = useState(false);

	// the useEffect checks users previous interests if they exist
	useEffect(() => {
		const userInterestsExist = async () => {
			if (user?.genre_interest?.length > 0) {
				user.genre_interest.forEach((genre) => {
					setInterests((i) => ({ ...i, [genre]: true }));
				});
			}
		};

		userInterestsExist();
	}, [user, user.genre_interest]);

	const handleCheck = (e) => {
		const { name, checked } = e.target;
		if (interests[name] === true && checked === true) {
			e.target.checked = false;
		}
		if (e.target.checked) {
			setInterests((i) => ({ ...i, [name]: e.target.checked }));
		}
		if (!e.target.checked) {
			setInterests((i) => ({ ...i, [name]: e.target.checked }));
		}
	};

	const handleOnSubmit = async () => {
		const finalInterests = Object.keys(interests).filter((x) => interests[x]);
		setErrors((e) => ({ ...e, form: null }));

		const { data, error } = await apiClient.updateUserInterests({
			genre_interests: finalInterests,
		});
		if (error) {
			alert(`Error!\n ${error}`);
			setErrors((e) => ({ ...e, form: error }));
		}
		if (data?.genre_interests) {
			setErrors((e) => ({ ...e, form: null }));
			setUser((u) => ({
				...u,
				genre_interest: data.genre_interests.genre_interests,
			}));
			setSuccessMessage(true);
			setTimeout(() => {
				setSuccessMessage(false);
			}, 3000);
			// navigate("/account");
		}
	};

	return (
		<div className="UpdateGenreInterests">
			<h1>Select Interests</h1>
			{!user && (
				<>
					<h2>Unauthorized User</h2>
				</>
			)}
			{successMessage && (
				<span className="success-message">
					{successMessage ? "Sucessfully updated" : ""}
				</span>
			)}
			<br />
			{user && (
				<>
					<form className="interests-container">
						{genres?.map((x) => (
							<label
								className={`interest-card ${interests[x] ? "checked" : ""}`}
								htmlFor={x}
								key={x}
							>
								<input
									type="checkbox"
									id={x}
									name={x}
									value={x}
									onChange={handleCheck}
								/>
								{x}
								{interests[x] ? <FaCheckCircle /> : <FaRegCheckCircle />}
							</label>
						))}
					</form>
					<div className="buttons">
						<div className="go-back">
							<ActionButton text={`Go to Account`} link={`/account`} />
						</div>
						<ActionButton text={`Submit`} clickFunc={handleOnSubmit} />
					</div>
				</>
			)}
		</div>
	);
}
