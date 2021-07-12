import "./UserHome.css"

export default function UserHome() {
    return (
        <div className="UserHome">
            <div className="top-feed">
                <h2>Top 10</h2>
            </div>

            <div className="current-reads-feed">
                <h2>Currently Reading</h2>
            </div>
        </div>
    );
}