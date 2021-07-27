import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { useAuthContext } from "contexts/auth";
import "./UserPortal.css";
import apiClient from "services/apiClient";
import useDetectClickOut from "hooks/useDetectClickOut";

export default function UserPortal() {
	const navigate = useNavigate();
	const { setUser } = useAuthContext();
	// const [showMenu, setShowMenu] = useState(false);
	const [ errors, setErrors ] = useState(null);

	const { show, nodeRef, triggerRef } = useDetectClickOut(false)

	// const toggleMenu = () => setShowMenu(!showMenu);

	const handleOnSignOut = async () => {
		await apiClient.logoutUser();
		setUser(null);
		setErrors(null);
		navigate("/");
	};

	return (
		<div className="UserPortal">
			<div ref={triggerRef} className="user-icons" >
				<FaUserCircle />
				<GoTriangleDown />
			</div>
			{show ? (
				<ul ref={nodeRef} className="user-menu">
					<Link to="/profile">
						<li>Your Profile</li>
					</Link>
					<Link to="/account">
						<li>Account</li>
					</Link>
					<Link to="/">
						<li className="sign-out" onClick={handleOnSignOut}></li>
					</Link>
				</ul>
			) : null}
		</div>
	);
}
