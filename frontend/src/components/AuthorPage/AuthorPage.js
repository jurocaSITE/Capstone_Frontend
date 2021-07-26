import "./AuthorPage.css";
import React, { useEffect, useState } from "react";
import { BookPreview } from "components";
import apiClient from "services/apiClient";
import { useParams } from "react-router-dom";


const defaultUserPicture = "https://i2.wp.com/nypost.com/wp-content/uploads/sites/2/2019/10/suzanne-collins-new-book-hunger-games-prequel.jpg?quality=80&strip=all&ssl=1";

function AuthorPage() { 
    const { author_name } = useParams();

	return (
		<div className="AuthorPage">

			<div className="author-image">
                <img
                    className="img"
                    alt="author profile"
                    src={author_name?.profile_picture || defaultUserPicture}
                />
            </div>

            <div className="information">

            </div>

		</div>
	);
}

export default AuthorPage;
