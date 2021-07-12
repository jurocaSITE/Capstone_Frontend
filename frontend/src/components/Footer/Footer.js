import { Link, useNavigate } from "react-router-dom";
import { GiWhiteBook } from "react-icons/gi";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="Footer">
      <GiWhiteBook className="footer-icon" />
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
