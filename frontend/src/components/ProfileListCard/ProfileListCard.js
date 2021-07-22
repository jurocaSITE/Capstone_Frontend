import "./ProfileListCard.css";
import React from "react";

const defaultUserPicture = "https://source.unsplash.com/random";

function ProfileListCard({ list }) {
	return (
		<div className="ProfileListCard">
			<div className="list-cover">
				<img alt="list cover" src={list.image || defaultUserPicture} />
			</div>
			<div className="list-name">
				<h2>{list.list_name}</h2>
			</div>
		</div>
	);
}

export default ProfileListCard;
