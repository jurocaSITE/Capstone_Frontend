import "./ListCard.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";
import useDetectClickOut from "hooks/useDetectClickOut";

const defaultBookCover =
	"hhttps://images.unsplash.com/photo-1548504769-900b70ed122e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

function ListCard({ list }) {
	const { show, nodeRef, triggerRef } = useDetectClickOut(false);

	return (
		<div className="ListCard">
			<Link className="ListCard-Link" to={`/my-lists/${list.id}`}>
				<div className="cover">
					<img alt="list cover" src={list?.image || defaultBookCover} />
				</div>
				<div className="information">
					<h2>{list?.list_name}</h2>
				</div>
			</Link>
			<div className="list-actions">
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
	);
}

export default ListCard;
