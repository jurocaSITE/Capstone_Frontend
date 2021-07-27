import { Link } from "react-router-dom";
import "./ActionButton.css";

export default function ActionButton({
  link = "#",
  text = "",
  altClass = null,
  clickFunc = null,
}) {
  return (
    <Link to={link}>
      <button
        onClick={clickFunc}
        className={`ActionButton ${altClass ? altClass : ``}`}
      >
        {text}
      </button>
    </Link>
  );
}
