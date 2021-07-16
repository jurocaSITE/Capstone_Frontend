import React from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { UserPortal, SearchBar } from "components";
import "./Navbar.css";

export default function Navbar({ userExists }) {
	const navigate = useNavigate();

	return (
		<nav className="Navbar">
			<div className="content">
				<span className="logo">
					<Link to="/">teca</Link>
				</span>

				{!userExists && (
					<span className="user-buttons">
						<Link to="/login">Login</Link>
						<Link to="/signup">Sign up</Link>
					</span>
				)}

				{userExists && (
					<>
						<ul className="pages">
							<li>
								<Link to="/" activeClassName="active" end>
									Home
								</Link>
							</li>
							<li>
								<Link to="/community" activeClassName="active" end>
									Community
								</Link>
							</li>
							<li>
								<Link to="/my-lists" activeClassName="active" end>
									My Lists
								</Link>
							</li>
						</ul>

						<SearchBar />
						<UserPortal />
					</>
				)}
			</div>
		</nav>
	);
}
