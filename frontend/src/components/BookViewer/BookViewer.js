import { useState, useEffect, useRef } from "react";
import useDetectClickOut from "hooks/useDetectClickOut";
import "./BookViewer.css";

export default function BookViewer({ bookId = 'giaLDgAAQBAJ' }) {
  const canvasRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const { show, nodeRef, triggerRef } = useDetectClickOut(false)

  function alertNotFound() {
    alert("Could not embed the book!");
  }

  useEffect(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://www.google.com/books/jsapi.js";
    scriptTag.addEventListener("load", () => setLoaded(true));
    scriptTag.id = "google-script";
    document.body.appendChild(scriptTag);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    else {
      if (window.viewer) {
        let viewer = new window.google.books.DefaultViewer(canvasRef.current);
        viewer.load(bookId, alertNotFound);
      } else {
        window.google.books.load();

        window.google.books.setOnLoadCallback(() => {
          let viewer = new window.google.books.DefaultViewer(canvasRef.current);
          window.viewer = viewer;
          viewer.load(bookId, alertNotFound);
        });
      }
    }
  }, [bookId, loaded]);

  return (
    <div className="BookViewer">
      <button>Toggle</button>
      {loaded ? (
        <div>
          <div ref={canvasRef} id="viewerCanvas"></div>
        </div>
      ) : (
        <div className="loader">Loading...</div>
      )}
    </div>
  );
}

/* Code Source: https://chsohn15.medium.com/integrating-google-books-embedded-viewer-api-into-a-react-app-a81fde35c14d */
