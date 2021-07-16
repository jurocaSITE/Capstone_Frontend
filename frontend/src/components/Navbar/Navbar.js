import React from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { UserPortal, SearchBar } from "components";
import { useAuthContext } from "contexts/auth";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  return (
    <nav className="Navbar">
      <div className="content">
        <span className="logo">
          <Link to="/">teca</Link>
        </span>

        {!user && (
          <>
          <SearchBar />
          <span className="user-buttons">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </span>
          </>
        )}

        {user && (
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
