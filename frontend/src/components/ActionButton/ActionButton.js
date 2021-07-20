import { Link } from "react-router-dom";
import "./ActionButton.css";

export default function ActionButton({ link = "#", text = "", clickFunc = null }) {
  return (
    <Link to={link}>
      <button onClick={clickFunc} className="ActionButton">{text}</button>
    </Link>
  );
}
