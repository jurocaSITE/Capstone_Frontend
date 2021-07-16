import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { useAuthContext } from "contexts/auth";
import "./UserPortal.css";

export default function UserPortal() {
	const navigate = useNavigate();
	const { setUser } = useAuthContext();
	const [showMenu, setShowMenu] = useState(false);

	const toggleMenu = () => setShowMenu(!showMenu);

	const handleOnSignOut = () => {
		setUser(null);
		navigate("/");
	};

	return (
		<div className="UserPortal">
			<div className="user-icons" onClick={toggleMenu}>
				<FaUserCircle />
				<GoTriangleDown />
			</div>
			{showMenu ? (
				<ul className="user-menu">
					<Link to="/profile">
						<li>Your Profile</li>
					</Link>
					<Link to="/">
						<li>Settings</li>
					</Link>
					<Link to="/">
						<li className="sign-out" onClick={handleOnSignOut}></li>
					</Link>
				</ul>
			) : null}
		</div>
	);
}
