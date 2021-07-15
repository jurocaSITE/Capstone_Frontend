import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import "./UserPortal.css";

export default function UserPortal() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <div className="UserPortal">
      <div className="user-icons" onClick={toggleMenu}>
        <FaUserCircle />
        <GoTriangleDown />
      </div>
      {showMenu ? (
        <ul className="user-menu">
          <Link to="/">
            <li>Your Profile</li>
          </Link>
          <Link to="/">
            <li>Settings</li>
          </Link>
          <Link to="/">
            <li>Sign Out</li>
          </Link>
        </ul>
      ) : null}
    </div>
  );
}
