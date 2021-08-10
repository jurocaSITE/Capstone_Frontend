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

	const handleOnInputChange = (event) => {
		if (event.target.name === "list_name") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					list_name_error: " Enter a new list name or cancel.",
				}));
				// throw error if the user tries to name a list with a default name
			} else if (event.target.value.toLocaleLowerCase() === "finished") {
				setErrors((e) => ({
					...e,
					list_name_error:
						"User are not allowed to create lists with the same name as a default list.",
				}));
			} else if (
				event.target.value.toLocaleLowerCase() === "currently reading"
			) {
				setErrors((e) => ({
					...e,
					list_name_error:
						"User are not allowed to create lists with the same name as a default list.",
				}));
			} else if (event.target.value.toLocaleLowerCase() === "want to read") {
				setErrors((e) => ({
					...e,
					list_name_error:
						"User are not allowed to create lists with the same name as a default list.",
				}));
			} else if (event.target.value.toLocaleLowerCase() === "did not finish") {
				setErrors((e) => ({
					...e,
					list_name_error:
						"User are not allowed to create lists with the same name as a default list.",
				}));
			} else if (event.target.value.toLocaleLowerCase() === "reviewed books") {
				setErrors((e) => ({
					...e,
					list_name_error:
						"User are not allowed to create lists with the same name as a default list.",
				}));
			} else {
				setErrors((e) => ({ ...e, list_name_error: null }));
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

		let img = "";
		if (form.image == "") {
			img =
				"data:image/jpeg;base64,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";
		} else {
			img = form.image;
		}

		const { data, error } = await apiClient.createList({
			list_name: form.list_name,
			image: img,
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
		else {
			navigate("/my-lists");
		}
		setIsProcessing(false);
	};

	if (!user?.email) {
		return <NotAllowed />;
	}
	return (
		<div className="ListFormCreateNew">
			<div className="card">
				<h2>Create New List</h2>

				{errors.form && <span className="error">{errors.form}</span>}
				<br />

				<div className="form">
					<div className="input-field">
						{errors.list_name_error && (
							<span className="error">{errors.list_name_error}</span>
						)}
						<label htmlFor="list_name">New List Name*</label>
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
						<label htmlFor="image">
							New Cover (Leave blanck for default list cover)
						</label>
						<input
							type="text"
							// type="file"
							name="image"
							placeholder="Add new image URL."
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
