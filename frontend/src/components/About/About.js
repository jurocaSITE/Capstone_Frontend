import { useState, useEffect, useRef } from "react";
import { BookViewer } from "components";
import "./About.css";

export default function About() {

  return (
    <>
      <div className="About">
        <h1>About Us</h1>
        <div>
            <BookViewer />
        </div>
      </div>
    </>
  );
}
