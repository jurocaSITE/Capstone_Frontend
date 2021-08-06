import "./ProfileListCard.css";
import React from "react";
import { Link } from "react-router-dom";

const defaultUserPicture = "https://source.unsplash.com/random";

function ProfileListCard({ list }) {
	return (
		<Link className="ListCard-Link" to={`/my-lists/${list.id}`}>
			<div className="ProfileListCard">
				<div className="list-cover">
					<img alt="list cover" src={list.image || defaultUserPicture} />
				</div>
				<div className="list-name">
					<h2>{list.list_name}</h2>
				</div>
			</div>
		</Link>
	);
}

export default ProfileListCard;
