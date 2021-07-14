import "./BookPreview.css"

const defaultBookCover = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fglobal.penguinrandomhouse.com%2Fwp-content%2Fuploads%2F2017%2F12%2FQueenOfHearts.jpg&f=1&nofb=1"

export default function BookPreview({ bookCover }) {
    return (
        <div className="BookPreview">
            <img alt="book cover" src={bookCover || defaultBookCover} />
        </div>
    );
}