import "./Book.css"

export default function Book() {
    const book = {
        title: "All That Followed",
        author: "Gabriel Urza",
        pubDate: "01-10-1997",
        description: "This is a book about something and here is the description. Read it!",
        imgUrl: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.raincoast.com%2Fimages%2Fuploads%2F9781627792431.jpg&f=1&nofb=1"
    }

    return (
        <div className="Book">
            <div className="book-card">
                <img alt="book cover" src={book.imgUrl} />
                <div className="book-details">
                    <div className="book-details-head">
                        <h1>{book.title}</h1>
                        <h2>by {book.author}</h2>
                        <h3 className="pub-date">Published {book.pubDate}</h3>
                    </div>
                    <h2>Description</h2>
                    <p>{book.description}</p>
                    <button className="add-book-btn">
                        Add to List
                    </button>
                </div>
            </div>
        </div>
    );
}