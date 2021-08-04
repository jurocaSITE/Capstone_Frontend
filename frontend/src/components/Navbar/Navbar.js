import React from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { UserPortal, SearchBar } from "components";
import { useAuthContext } from "contexts/auth";
import { FaBars } from "react-icons/fa";
import useDetectClickOut from "hooks/useDetectClickOut";
import apiClient from "services/apiClient";
import "./Navbar.css";

export default function Navbar({ appRef }) {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const { show, nodeRef, triggerRef } = useDetectClickOut(false);

  const handleOnSignOut = async () => {
    await apiClient.logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="Navbar">
      <div className="content-small-screen">
        <button ref={triggerRef}>
          <FaBars size="30" />
        </button>
        <SearchBar />

        {show && (
          <div ref={nodeRef} className="bars-menu">
            {!user && (
              <>
                <Link to="/" activeClassName="active" end>
                  Home
                </Link>
                <span className="user-buttons">
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign up</Link>
                </span>
              </>
            )}

            {user && (
              <ul className="pages">
                <li>
                  <Link to="/" activeClassName="active" end>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/my-lists" activeClassName="active" end>
                    My Lists
                  </Link>
                </li>
                <Link to="/profile">
                  <li>Your Profile</li>
                </Link>
                <Link to="/account">
                  <li>Account</li>
                </Link>
                <Link to="/">
                  <li className="sign-out" onClick={handleOnSignOut}>
                    Sign Out
                  </li>
                </Link>
              </ul>
            )}
          </div>
        )}
      </div>

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
              {/* <li>
                <Link to="/community" activeClassName="active" end>
                  Community
                </Link>
              </li> */}
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
