import "./Genre.css";
import React from "react";


function Genre({ text = "" }) {

	return (
        <div className="GenreTag">
            <p>{text}</p>
        </div>
	);
}

export default Genre;
