import "./ListCardNoChange.css";
import React from "react";
import { useAuthContext } from "contexts/auth";

const defaultBookCover = "https://source.unsplash.com/random";

function ListCardNoChange({ list }) {
	const { user } = useAuthContext();

	return (
		<div className="ListCardNoChange">
			<div className="cover">
				<img alt="list cover" src={list?.image || defaultBookCover} />
			</div>
			<div className="information">
				<h2>{list?.list_name}</h2>
				<div className="by-and-more">
					<div className="by-username">
						By
						<br />
						{user?.username}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListCardNoChange;
