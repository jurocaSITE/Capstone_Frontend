import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { useAuthContext } from "contexts/auth";
import "./ListSidebar.css";

export default function ListSidebar() {
	const navigate = useNavigate();
	const { setUser } = useAuthContext();
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
					<li> Remove </li>
				</ul>
			) : null}
		</div>
	);
}
