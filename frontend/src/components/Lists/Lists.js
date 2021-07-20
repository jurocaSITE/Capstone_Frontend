import "./Lists.css";
import React, { useEffect, useState } from "react";
import { ListCard } from "components";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useAuthContext } from "contexts/auth";
import apiClient from "services/apiClient";

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
	const { user } = useAuthContext();
	const [lists, setLists] = useState({});
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchListsByUserId = async () => {
			setIsFetching(true);
			const { data, error } = await apiClient.getAllListsByUserId();
			console.log(data);
			if (data) {
				setLists(data);
			}
			if (error) setError(error);

			setIsFetching(false);
		};

		fetchListsByUserId();
	}, []);

	return (
		<div className="Lists">
			<div className="top">
				<h1 className="title">Library</h1>
			</div>
			<div className="default-lists">
				<ListCard />
				<ListCard />
				<ListCard />
				<ListCard />
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
					<h1>Create New List +</h1>
				</div>
			</div>
			<div className="display-lists-area">
				<ListCard />
				<ListCard />
				<ListCard />
				<ListCard />
			</div>
		</div>
	);
}

export default Lists;
