import "./ListFormCreateNew.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "services/apiClient";

function ListFormCreateNew() {
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		list_name: "",
		image: "",
	});

	const handleOnInputChange = (event) => {
		if (event.target.name === "list_name") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					list_name_error: "Please enter a new list name or cancel.",
				}));
			} else {
				setErrors((e) => ({ ...e, dateError: null }));
			}
		}
		if (event.target.name === "image") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					image_error: "Please enter an image URL or cancel.",
				}));
			} else {
				setErrors((e) => ({ ...e, dateError: null }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const handleOnSubmit = async () => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		if (form.list_name === "") {
			setErrors((e) => ({
				...e,
				list_name_error: "Please enter a new list name or cancel.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, list_name_error: null }));
		}
		if (form.image === "") {
			setErrors((e) => ({
				...e,
				image_error: "Please enter an image URL or cancel.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, image_error: null }));
		}

		const { data, error } = await apiClient.createList({
			list_name: form.list_name,
			image: form.image,
		});

		if (error) setErrors((e) => ({ ...e, form: error }));

		setIsProcessing(false);

		navigate("/my-lists");
	};

	return (
		<div className="ListForm">
			<div className="card">
				<h2>Create New List</h2>

				{errors.form && <span className="error">{errors.form}</span>}
				<br />

				<div className="form">
					<div className="input-field">
						{errors.list_name_error && (
							<span className="error">{errors.list_name_error}</span>
						)}
						<label htmlFor="list_name">New List Name</label>
						<input
							type="text"
							name="list_name"
							placeholder="Enter a new name for your list"
							value={form.list_name}
							onChange={handleOnInputChange}
						/>
					</div>

					<div className="input-field">
						{errors.image_error && (
							<span className="error">{errors.image_error}</span>
						)}
						<label htmlFor="image">New Cover</label>
						<input
							type="text"
							// type="file"
							name="image"
							placeholder="Enter a image URL"
							value={form.image}
							onChange={handleOnInputChange}
						/>
					</div>

					<div className="footer">
						<button
							className="btn"
							disabled={isProcessing}
							onClick={handleOnSubmit}
						>
							{isProcessing ? "Loading..." : "Save"}
						</button>
						<Link to={`/my-lists`}>
							<button className="btn cancel">Cancel</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListFormCreateNew;
