import "./ProfilePage.css";
import React, { useEffect, useState } from "react";
import { AuthorCard, BookPreview, ProfileListCard } from "components";
import { useAuthContext } from "contexts/auth";
import apiClient from "services/apiClient";

const defaultUserPicture = "https://source.unsplash.com/random";

function ProfilePage() {
	const { user } = useAuthContext();
	const [lists, setLists] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(null);
	let defaultLists = [];
	let otherLists = [];

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
			}
		}
	};

	settingLists();

	return (
		<div className="ProfilePage">
			<div className="white-chunk"></div>
			<div className="user-information-and-image">
				<div className="user-image">
					<img
						className="imgage"
						alt="user profile"
						src={user?.profile_picture || defaultUserPicture}
					/>
				</div>
				<div className="user-information">
					<h1>{user?.username}</h1>
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
				<h2>Default Lists</h2>
				<div className="lists-cards">
					{defaultLists.map((list) => (
						<ProfileListCard key={list.id} list={list} className="list-card" />
					))}
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
