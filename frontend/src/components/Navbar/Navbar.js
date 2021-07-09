import React from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
	return (
		<nav className="Navbar">
			<div className="content">
				<span className="logo">
					<Link to="/">teca</Link>
				</span>
				<ul className="pages">
					<li>
						<Link to="/home" activeClassName="active" end>
							Home
						</Link>
					</li>
					<li>
						<Link to="/community" activeClassName="active" end>
							Community
						</Link>
					</li>
					<li>
						<Link to="/lists" activeClassName="active" end>
							My Lists
						</Link>
					</li>
				</ul>
				<span className="user-buttons">
					<Link to="/login">
						<button className="login-btn">Login</button>
					</Link>
					<Link to="/register">
						<button className="register-btn">Sign up</button>
					</Link>
				</span>
			</div>
		</nav>
	);
}
