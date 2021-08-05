import "./Lists.css";
import React, { useEffect, useState } from "react";
import { ListCard, ListCardNoChange, NotAllowed } from "components";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import { BiSearch } from "react-icons/bi";
import apiClient from "services/apiClient";
import { Link } from "react-router-dom";
import { useSearchForm } from "hooks/useSearchForm";
import { useAuthContext } from "contexts/auth";

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
	const { filteredData, handleFilter } = useSearchForm();
	const { user } = useAuthContext();
	const [lists, setLists] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);
	let defaultLists = [];
	let otherLists = [];
	// let copyLists = []

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
				// copyLists.push(lists[i]);
			}
		}
	};

	settingLists();

	const handleOnFilter = (e) => {
		handleFilter(e, otherLists);
	};

	if (!user?.email) {
		return <NotAllowed />;
	}
	// const alphabeticallySortedLists = copyLists.sort(function(a, b){
	// 				var nameA=a.list_name.toLowerCase(), nameB=b.list_name.toLowerCase();
	// 				if (nameA < nameB) //sort string ascending
	// 				 return -1;
	// 				if (nameA > nameB)
	// 				 return 1;
	// 				return 0; //default return value (no sorting)
	// 			   });

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
							placeholder="Search In Lists by name..."
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ "aria-label": "search" }}
							onChange={handleOnFilter}
						/>
					</div>
					{/* <button type="submit" className="search-icon">
						<BiSearch className="icon" />
					</button> */}
				</div>

				<div className="create-new-list">
					<Link to={`/list/create-new`}>
						<h2 alt="Create New List Button">+</h2>
					</Link>
				</div>
			</div>

			<div className="display-lists-area">
				{filteredData
					? filteredData.map((list) => (
							<ListCard list={list} className="list-card" />
					  ))
					: otherLists.map((list) => (
							<ListCard list={list} className="list-card" />
					  ))}
				{/* {alphabeticallySortedLists.map((list) => (
					<ListCard list={list} className="list-card" />
				))} */}
			</div>
		</div>
	);
}

export default Lists;
