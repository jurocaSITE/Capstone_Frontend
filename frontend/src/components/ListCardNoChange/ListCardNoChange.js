import "./ListCardNoChange.css";
import React from "react";
import { Link } from "react-router-dom";
import { BiBookHeart } from "react-icons/bi";
import { GoBook } from "react-icons/go";
import { RiBook2Fill } from "react-icons/ri";
import { FaBookDead } from "react-icons/fa";

function ListCardNoChange({ list }) {
	const renderIcon = () => {
		if (list?.list_name === "Want To Read") {
			return <BiBookHeart />;
		} else if (list?.list_name === "Currently Reading") {
			return <GoBook />;
		} else if (list?.list_name === "Did Not Finish") {
			return <FaBookDead />;
		} else if (list?.list_name === "Finished") {
			return <RiBook2Fill />;
		}
	};

	return (
		<div className="ListCardNoChange">
			<div className="cover">
				<Link to={`/my-lists/${list.id}`}>{renderIcon()}</Link>
			</div>
			<div className="information">
				<h2>{list?.list_name}</h2>
			</div>
		</div>
	);
}

export default ListCardNoChange;
