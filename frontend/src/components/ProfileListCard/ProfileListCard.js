import "./ProfileListCard.css";
import React from "react";

const defaultUserPicture = "https://source.unsplash.com/random";

function ProfileListCard() {
	return (
		<div className="ProfileListCard">
			<div className="list-cover">
				<img alt="author" src={defaultUserPicture} />
			</div>
			<div className="list-name">
				<h2>List name</h2>
			</div>
		</div>
	);
}

export default ProfileListCard;
