import "./ListCard.css";
import React, { useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";
import { useAuthContext } from "contexts/auth";
import useDetectClickOut from "hooks/useDetectClickOut";

const defaultBookCover = "https://source.unsplash.com/random";

function ListCard({ list }) {
	const { user } = useAuthContext();
	const { show, nodeRef, triggerRef } = useDetectClickOut(false);
	// const [expanded, setExpanded] = React.useState(false);

	// const handleExpandClick = () => {
	// 	setExpanded(!expanded);
	// };
	// const [showMenu, setShowMenu] = useState(false);
	// const toggleMenu = () => setShowMenu(!showMenu);

	return (
		<div className="ListCard">
			<div className="cover">
				<Link to={`/my-lists/${list.id}`}>
					<img alt="list cover" src={list?.image || defaultBookCover} />
				</Link>
			</div>
			<div className="information">
				<h2>{list?.list_name}</h2>
				<div className="by-and-more">
					{/* <div className="by-username">
						By{" "}
						<br />
						{user?.username}
					</div> */}
					<div className="create-new-list">
						<MoreHorizIcon ref={triggerRef} className="three-dots" />

						{show && (
							<ul ref={nodeRef} className="options">
								<Link to={`/list/edit/${list.id}/${list.list_name}`}>
									<li>Edit</li>
								</Link>
							</ul>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ListCard;
