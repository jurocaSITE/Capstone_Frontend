import { Link, useNavigate } from "react-router-dom";
import { ImBook } from "react-icons/im";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="Footer">
      <ImBook className="footer-icon" />
        <ul className="footer-links">
          <li>
            <Link to="/about" >
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" >
              Contact Us
            </Link>
          </li>
        </ul>
    </div>
  );
}
