import "./Lists.css";
import React, { useEffect, useState } from "react";
import { ListCard, ListCardNoChange } from "components";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import apiClient from "services/apiClient";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "30ch",
		},
		fontSize: "1.5em",
	},
}));

function Lists() {
	const classes = useStyles();
	const [lists, setLists] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);
	let defaultLists = [];
	let otherLists = [];

	useEffect(() => {
		const fetchListsByUserId = async () => {
			setIsFetching(true);
			try {
				const allLists = await apiClient.getAllListsByUserId();
				setLists(allLists.data.all_lists);
			} catch (error) {
				setError(error);
			}

			setIsFetching(false);
		};

		fetchListsByUserId();
	}, []);

	const settingLists = () => {
		for (let i = 0; i < lists.length; i++) {
			if (lists[i].list_name === "Want To Read") {
				defaultLists.push(lists[i]);
			} else if (lists[i].list_name === "Currently Reading") {
				defaultLists.push(lists[i]);
			} else if (lists[i].list_name === "Did Not Finish") {
				defaultLists.push(lists[i]);
			} else if (lists[i].list_name === "Finished") {
				defaultLists.push(lists[i]);
			} else {
				otherLists.push(lists[i]);
			}
		}
	};

	settingLists();

	return (
		<div className="Lists">
			<div className="top">
				<h1 className="title">Library</h1>
			</div>
			<div className="default-lists">
				{defaultLists.map((list) => (
					<ListCardNoChange key={list.id} list={list} className="list-card" />
				))}
			</div>
			<div className="search-and-create">
				<div className="search">
					<div className="search-bar">
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
						/>
					</div>
					<button type="submit" className="search-icon">
						<SearchIcon className="icon" />
					</button>
				</div>

				<div className="create-new-list">
					<Link to={`/list/create-new`}>
						<h1>Create New List +</h1>
					</Link>
				</div>
			</div>
			<div className="display-lists-area">
				{otherLists.map((list) => (
					<ListCard key={list.id} list={list} className="list-card" />
				))}
			</div>
		</div>
	);
}

export default Lists;
