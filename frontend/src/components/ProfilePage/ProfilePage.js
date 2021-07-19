import "./ProfilePage.css";
import React from "react";
import { AuthorCard, BookPreview, ProfileListCard } from "components";

const defaultUserPicture = "https://source.unsplash.com/random";

function ProfilePage() {
	return (
		<div className="ProfilePage">
			<div className="white-chunk"></div>
			<div className="user-information-and-image">
				<div className="user-image">
					<img className="imgage" alt="list cover" src={defaultUserPicture} />
				</div>
				<div className="user-information">
					<h1>Username</h1>
					<div className="more-info">
						<p>15 Reading lists</p>
						<p>144 followers</p>
						<p>320 following</p>
					</div>
				</div>
			</div>
			<div className="top-authors">
				<h2>Top authors this month</h2>
				<div className="author-cards">
					<AuthorCard />
					<AuthorCard />
					<AuthorCard />
					<AuthorCard />
				</div>
			</div>
			<div className="library">
				<h2>Library</h2>
				<div className="lists-cards">
					<ProfileListCard />
					<ProfileListCard />
					<ProfileListCard />
					<ProfileListCard />
				</div>
			</div>
			<div className="currently-reading">
				<h2>Currently Reading</h2>
				<div className="books">
					<BookPreview />
					<BookPreview />
					<BookPreview />
					<BookPreview />
				</div>
			</div>
			<div className="my-reviews">
				<h2>My Reviews</h2>
				<div className="reviews"></div>
			</div>
		</div>
	);
}

export default ProfilePage;
