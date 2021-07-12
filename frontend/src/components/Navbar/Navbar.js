import React from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import "./Navbar.css";

export default function Navbar({userExists}) {
  return (
    <nav className="Navbar">
      <div className="content">
        <span className="logo">
          <Link to="/">teca</Link>
        </span>

        {!userExists && (
          <span className="user-buttons">
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
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
                <Link to="/lists" activeClassName="active" end>
                  My Lists
                </Link>
              </li>
            </ul>

            <div className="search-bar">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                // value={form.searchTerm}
                // onChange={handleOnInputChange}
              />
              <button className="search-btn">
                <BiSearch className="search-icon" />
              </button>
            </div>

            <button className="user-portal">
              <FaUserCircle className="user-icon" />
              <GoTriangleDown className="user-triangle" />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
