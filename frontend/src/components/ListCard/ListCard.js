import "./ListCard.css";
import React, { useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";

const defaultBookCover = "https://source.unsplash.com/random";

function ListCard() {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => setShowMenu(!showMenu);

	return (
		<div className="ListCard">
			<div className="cover">
				<img alt="list cover" src={defaultBookCover} />
				{/* image */}
			</div>
			<div className="information">
				<h2>List Name</h2>
				<div className="by-username">
					By
					<br />
					Username
				</div>
				<div className="create-new-list">
					{/* <div className="three-dots"> */}
					<MoreHorizIcon className="three-dots" onClick={toggleMenu} />
					{/* </div> */}
					{showMenu && (
						<ul className="options">
							<Link to="/">
								<li>Your Profile</li>
							</Link>
							<Link to="/">
								<li>Settings</li>
							</Link>
							<Link to="/">
								<li className="sign-out"></li>
							</Link>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

export default ListCard;
