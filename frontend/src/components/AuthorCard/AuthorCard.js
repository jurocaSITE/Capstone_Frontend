import "./AuthorCard.css";
import React from "react";

const defaultUserPicture =
	"https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

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
