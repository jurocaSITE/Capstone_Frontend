import "./ListCard.css";
import React from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const defaultBookCover = "https://source.unsplash.com/random";

function ListCard() {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

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
					<MoreHorizIcon className="three-dots" />
					{/* </div> */}
				</div>
			</div>
		</div>
	);
}

export default ListCard;
