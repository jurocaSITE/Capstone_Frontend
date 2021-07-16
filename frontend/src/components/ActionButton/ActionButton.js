import { Link } from "react-router-dom";
import "./ActionButton.css";

export default function ActionButton({ link = "/", text = "" }) {
  return (
    <Link to={link}>
      <button className="ActionButton">{text}</button>
    </Link>
  );
}
