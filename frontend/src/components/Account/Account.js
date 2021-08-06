import "./Account.css";
import React, { useState } from "react";
import { EditProfile, ActionButton, General } from "components";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "services/apiClient";
import { useAuthContext } from "contexts/auth";
import { NotAllowed } from "components";

function Account() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const [errors, setErrors] = useState({});
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleOnSignOut = async () => {
    await apiClient.logoutUser();
    setUser(null);
    setErrors(null);
    navigate("/");
  };

  const handleOneDelete = async (event) => {
    await apiClient.deleteUserProfile();

    handleOnSignOut();
  };

  if (!user?.email) {
    return <NotAllowed />;
  }
  return (
    <div className="Account">
      <section className="header">
        <h1>Account</h1>
        <p>Update your profile and set your account preferences</p>
      </section>
      {/*<section className="card-content">
				<div className="card">
					<h1>hola</h1>
					<h1>hola</h1>
				</div>
			</section> */}
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            General
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Profile
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Update Interests
          </button>
          <button
            className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}
          >
            Delete account
          </button>
        </div>

        <div className="content-tabs">
          <div
            className={
              toggleState === 1 ? "content  active-content" : "content"
            }
          >
            <General className="general" />
          </div>

          <div
            className={
              toggleState === 2 ? "content  active-content" : "content"
            }
          >
            <EditProfile className="edit-profile" />
          </div>

          <div
            className={
              toggleState === 3 ? "content  active-content" : "content"
            }
          >
            <h3>Update Genre Interests</h3>
            <hr />
            <p>Click the link below to modify your preferred genres.</p>
            <ActionButton
              altClass={`update-interests-btn`}
              text={`Update Interests`}
              link={`/update-interests`}
            />

            <h4 className="current-interests-header">Current Interests</h4>
            <hr/>
            <div className="current-interests-feed">
              {!user?.genre_interest?.length && "No interests found. Change this by adding some with the button above."}
              {user?.genre_interest?.map((genre) => (
                <span className="genre-tag">{genre}</span>
              ))}
            </div>
          </div>

          <div
            className={
              toggleState === 4 ? "content  active-content" : "content"
            }
          >
            <div className="delete-btn">
              <p className="delete-account-body">
                Please note that this is a permanent action. All of your data on
                the website (lists, ratings, reviews) will be lost forever.{" "}
                <br /> Are you sure you want to delete your account?
              </p>
              <Link to="/">
                <button
                  className="btn delete-account"
                  onClick={handleOneDelete}
                >
                  Yes, Delete Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
