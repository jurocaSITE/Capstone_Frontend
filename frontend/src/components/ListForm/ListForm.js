import "./ListForm.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "services/apiClient";
import { useAuthContext } from "contexts/auth";
import { NotAllowed } from "components";

function ListForm() {
	const [lists, setLists] = useState([]);
	const { user } = useAuthContext();
	const { list_id } = useParams();
	const { listName } = useParams();
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		list_name: listName,
		image: "",
	});

	useEffect(() => {
		const fetchListsByUserId = async () => {
			setIsProcessing(true);
			try {
				const allLists = await apiClient.getAllListsByUserId();
				setLists(allLists.data.all_lists);
			} catch (error) {
				setErrors(error);
			}

			setIsProcessing(false);
		};

		fetchListsByUserId();
	}, []);

	useEffect(() => {
		const gettingImgUrl = () => {
			if (lists.length !== 0) {
				for (let i = 0; i < lists.length; i++) {
					if (lists[i].id == list_id) {
						setForm({
							list_name: listName,
							image: lists[i].image,
						});
						i = lists.length;
					}
				}
			}
		};

		gettingImgUrl();
	}, [listName, list_id, lists]);

	const handleOnInputChange = (event) => {
		if (event.target.name === "list_name") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					list_name_error: "Please enter a new list name or cancel.",
				}));
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
			} else {
				setErrors((e) => ({ ...e, list_name_error: null }));
			}
		}
		if (event.target.name === "image") {
			if (event.target.value === "") {
				setErrors((e) => ({
					...e,
					image_error: "Please enter an image URL or cancel.",
				}));
			} else {
				setErrors((e) => ({ ...e, image_error: null }));
			}
		}

		setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
	};

	const handleOnSubmit = async (event) => {
		setIsProcessing(true);
		setErrors((e) => ({ ...e, form: null }));

		if (form.list_name === "") {
			setErrors((e) => ({
				...e,
				list_name_error: "Please enter a new list name or cancel.",
			}));
			setIsProcessing(false);
			return;
		} else if (event.target.value.toLocaleLowerCase() === "finished") {
			setErrors((e) => ({
				...e,
				list_name_error:
					"User are not allowed to create lists with the same name as a default list.",
			}));
			setIsProcessing(false);
			return;
		} else if (event.target.value.toLocaleLowerCase() === "currently reading") {
			setErrors((e) => ({
				...e,
				list_name_error:
					"User are not allowed to create lists with the same name as a default list.",
			}));
			setIsProcessing(false);
			return;
		} else if (event.target.value.toLocaleLowerCase() === "want to read") {
			setErrors((e) => ({
				...e,
				list_name_error:
					"User are not allowed to create lists with the same name as a default list.",
			}));
			setIsProcessing(false);
			return;
		} else if (event.target.value.toLocaleLowerCase() === "did not finish") {
			setErrors((e) => ({
				...e,
				list_name_error:
					"User are not allowed to create lists with the same name as a default list.",
			}));
			setIsProcessing(false);
			return;
		} else {
			setErrors((e) => ({ ...e, list_name_error: null }));
		}

		const { data, error } = await apiClient.editList(list_id, {
			list_name: form.list_name,
			image: form.image,
		});

		if (error) setErrors((e) => ({ ...e, form: error }));
		else {
			navigate("/my-lists");
		}
		setIsProcessing(false);
	};

	const handleOneDelete = async (event) => {
		await apiClient.deleteList(list_id);
		navigate("/my-lists");
	};

	if (!user?.email) {
		return <NotAllowed />;
	}
	return (
		<div className="ListForm">
			<div className="card">
				<h2>Edit {listName}</h2>

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

					{/* <Link to="/my-lists">
						<button className="btn delete-account" onClick={handleOneDelete}>
							Delete List
						</button>
					</Link> */}

					<div className="footer">
						<span className="main-action-btns">
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
						</span>

						<span>
							<Link to="/my-lists">
								<button
									className="btn delete-account"
									onClick={handleOneDelete}
								>
									Delete List
								</button>
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListForm;
