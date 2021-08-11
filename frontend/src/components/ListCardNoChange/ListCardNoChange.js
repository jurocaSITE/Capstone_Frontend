import "./ListCardNoChange.css";
import React from "react";
import { Link } from "react-router-dom";
import { BiBookHeart, BiBookBookmark } from "react-icons/bi";
import { GoBook } from "react-icons/go";
import { RiBook2Fill } from "react-icons/ri";

function ListCardNoChange({ list }) {
	const renderIcon = () => {
		if (list?.list_name === "Want To Read") {
			return <BiBookHeart />;
		} else if (list?.list_name === "Currently Reading") {
			return <GoBook />;
		} else if (list?.list_name === "Reviewed Books") {
			return <BiBookBookmark />;
		} else if (list?.list_name === "Finished") {
			return <RiBook2Fill />;
		}
	};

	return (
		<>
			<Link to={`/my-lists/${list.id}`}>
				<div className="ListCardNoChange">
					<div className="cover">{renderIcon()}</div>
					<div className="information">
						<h2>{list?.list_name}</h2>
					</div>
				</div>
			</Link>
		</>
	);
}

export default ListCardNoChange;
