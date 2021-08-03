import "./ListFormCreateNew.css";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "services/apiClient";
import { useAuthContext } from "contexts/auth";
import { NotAllowed } from "components";

function ListFormCreateNew() {
	const navigate = useNavigate();
	const { user, setUser } = useAuthContext();
	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		list_name: "",
		image: "",
	});
	const { bookId } = useParams(); // searches for a book id patam if not sets to null
	const [isFetching, setIsFetching] = useState(false);

	// throw error if the user tries to name a list with a default name
	const defaultListNames = [
		"Want To Read",
		"Currently Reading",
		"Did Not Finish",
		"Finished",
	];

	const handleOnInputChange = (event) => {
		if (event.target.name === "list_name") {
			// throw error if the user tries to name a list with a default name
			defaultListNames.forEach((name) => {
				if (
					event.target.value.toLocaleLowerCase() === name.toLocaleLowerCase()
				) {
					setErrors((e) => ({
						...e,
						list_name_error:
							"User are not allowed to create lists with the same name as a default list.",
					}));
				}
			});
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

		defaultListNames.forEach((name) => {
			if (form.list_name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
				setErrors((e) => ({
					...e,
					list_name_error:
						"User are not allowed to create lists with the same name as a default list.",
				}));
			}
		});
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

		if (bookId && data?.new_list.id) {
			setIsFetching(true);

			const { info, error } = await apiClient.addBookToList(
				bookId,
				data.new_list.id
			);

			setIsFetching(false);
		}

		if (error) setErrors((e) => ({ ...e, form: error }));

		setIsProcessing(false);

		navigate("/my-lists");
	};

	if (!user?.email) {
		return <NotAllowed />;
	}
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
