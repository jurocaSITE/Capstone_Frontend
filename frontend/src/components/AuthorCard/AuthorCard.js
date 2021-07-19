import "./AuthorCard.css";
import React from "react";

const defaultUserPicture = "https://source.unsplash.com/random";

function AuthorCard() {
	return (
		<div className="AuthorCard">
			<div className="author-image">
				<img alt="author" src={defaultUserPicture} />
				{/* image */}
			</div>
			<div className="information">
				<h4>Author Name</h4>
				Author
			</div>
		</div>
	);
}

export default AuthorCard;
