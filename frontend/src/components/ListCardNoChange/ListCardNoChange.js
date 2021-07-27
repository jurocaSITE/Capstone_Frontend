import "./ListCardNoChange.css";
import React from "react";
import { useAuthContext } from "contexts/auth";
import { Link } from "react-router-dom";

const defaultBookCover = "https://source.unsplash.com/random";

function ListCardNoChange({ list }) {
	const { user } = useAuthContext();

	return (
		<div className="ListCardNoChange">
			<div className="cover">
				<Link to={`/my-lists/${list.id}`}>
					<img alt="list cover" src={list?.image || defaultBookCover} />	
				</Link>
			</div>
			<div className="information">
				<h2>{list?.list_name}</h2>
				{/* <div className="by-and-more">
					<div className="by-username">
						By{" "} 
						<br />
						{user?.username}
					</div>
				</div> */}
			</div>
		</div>
	);
}

export default ListCardNoChange;
