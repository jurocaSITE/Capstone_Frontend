import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import "./ListSidebar.css";

export default function ListSidebar() {
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => setShowMenu(!showMenu);

	return (
		<div className="UserPortal">
			<div className="user-icons" onClick={toggleMenu}>
				<BsThreeDots />
			</div>
			{showMenu ? (
				<ul className="user-menu">
					<li>Transfer</li>
					<li>Copy</li>
					<li>Remove</li>
				</ul>
			) : null}
		</div>
	);
}
