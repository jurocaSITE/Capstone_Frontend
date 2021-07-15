import "./Lists.css";
import React from "react";
import { ListCard } from "components";
function Lists() {
	return (
		<div className="Lists">
			{/* <CssBaseline /> */}
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
					<h1>Search</h1>
				</div>
				<div className="create-new-list">
					<h1>Create New +</h1>
				</div>
			</div>
			<div className="display-lists-area">
				{/* <ListCard />
				<ListCard />
				<ListCard />
				<ListCard /> */}
			</div>
		</div>
	);
}

export default Lists;
