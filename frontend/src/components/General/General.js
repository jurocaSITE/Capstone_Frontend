import "./General.css";
import React, { useState } from "react";
import { useAuthContext } from "contexts/auth";
import apiClient from "services/apiClient";
import { Link, useNavigate } from "react-router-dom";

function General() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(false);
  const [form, setForm] = useState({
    username: user?.username,
    new_password: "",
    current_password_username: "",
    current_password_password: "",
  });
  const [passVisible, setPassVisible] = useState(false);
  const [passVisible2, setPassVisible2] = useState(false);

  const togglePassVisibility = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      if (name === "reveal-password-2") {
        setPassVisible2(true);
      } else {
        setPassVisible(true);
      }
    }
    if (!checked) {
      if (name === "reveal-password-2") {
        setPassVisible2(false);
      } else {
        setPassVisible(false);
      }
    }
  };

  const fetchUser = async () => {
    const { data, error } = await apiClient.fetchUserFromToken();
    if (data) setUser(data.user);
    if (error) setErrors(error);
  };

  const handleOnInputChange = (event) => {
    if (event.target.name === "username") {
      if (event.target.value === "") {
        setErrors((e) => ({
          ...e,
          username_error: "Please enter a new username.",
        }));
      } else {
        setErrors((e) => ({ ...e, username_error: null }));
      }
    }
    if (event.target.name === "new_password") {
      if (event.target.value === "") {
        setErrors((e) => ({
          ...e,
          new_password_error: "Please enter a new password.",
        }));
      } else {
        setErrors((e) => ({ ...e, new_password_error: null }));
      }
    }
    if (event.target.name === "current_password_username") {
      if (event.target.value === "") {
        setErrors((e) => ({
          ...e,
          current_password_username_error:
            "Please enter your current password.",
        }));
      } else {
        setErrors((e) => ({ ...e, current_password_username_error: null }));
      }
    }
    if (event.target.name === "current_password_password") {
      if (event.target.value === "") {
        setErrors((e) => ({
          ...e,
          current_password_password_error:
            "Please enter your current password.",
        }));
      } else {
        setErrors((e) => ({ ...e, current_password_password_error: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmitUsername = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.username === "") {
      setErrors((e) => ({
        ...e,
        username_error: "Please enter a new username.",
      }));
      setIsProcessing(false);
      return;
    } else {
      setErrors((e) => ({ ...e, username_error: null }));
    }
    if (form.current_password_username === "") {
      setErrors((e) => ({
        ...e,
        current_password_username_error: "Please enter your current password.",
      }));
      setIsProcessing(false);
      return;
    } else {
      setErrors((e) => ({ ...e, current_password_username_error: null }));
    }

    const { data, error } = await apiClient.changeUserUsername({
      username: form.username,
      password: form.current_password_username,
    });

    if (error) setErrors((e) => ({ ...e, form: error }));
    else {
      fetchUser();
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);
      setForm({
        username: user?.username,
        new_password: "",
        current_password_username: "",
        current_password_password: "",
      });
      navigate("/account");
    }

    setIsProcessing(false);
  };

  const handleOnSubmitNewPassword = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.new_password === "") {
      setErrors((e) => ({
        ...e,
        new_password_error: "Please enter a new password.",
      }));
      setIsProcessing(false);
      return;
    } else {
      setErrors((e) => ({ ...e, new_password_error: null }));
    }
    if (form.current_password_password === "") {
      setErrors((e) => ({
        ...e,
        current_password_password_error: "Please enter your current password.",
      }));
      setIsProcessing(false);
      return;
    } else {
      setErrors((e) => ({ ...e, current_password_password_error: null }));
    }

    const { data, error } = await apiClient.changeUserPassword({
      updated_password: form.new_password,
      current_password: form.current_password_password,
    });

    if (error) setErrors((e) => ({ ...e, form: error }));
    else {
      fetchUser();
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 5000);
      setForm({
        username: user?.username,
        new_password: "",
        current_password_username: "",
        current_password_password: "",
      });
      navigate("/account");
    }

    setIsProcessing(false);
  };

  return (
    <div className="General">
      <div className="email-content">
        <h3>Email</h3>
        <h4>EMAIL</h4>
        <p>{user?.email}</p>
      </div>

      <div className="username-content">
        {successMessage && (
          <span className="sucess-message">
            {successMessage ? "Sucessfully updated" : ""}
          </span>
        )}
        {errors.form && <span className="error">{errors?.form}</span>}
        <br />
        <h3>Username</h3>
        <label htmlFor="username">USERNAME</label>
        {errors.username_error && (
          <span className="error">{errors.username_error}</span>
        )}
        <input
          type="text"
          name="username"
          placeholder="Enter new username"
          value={form.username}
          onChange={handleOnInputChange}
        />
        <label htmlFor="current_password_username">Verify password</label>
        {errors.current_password_username_error && (
          <span className="error">
            {errors.current_password_username_error}
          </span>
        )}
        <input
          type={passVisible ? "text" : "password"}
          name="current_password_username"
          placeholder="Enter current password"
          value={form.current_password_username}
          onChange={handleOnInputChange}
        />

        <span className="reveal-password">
          <label htmlFor="reveal-password">Reveal Password</label>
          <input
            type="checkbox"
            name="reveal-password"
            onChange={togglePassVisibility}
          />
        </span>

        <button
          className="btn"
          disabled={isProcessing}
          onClick={handleOnSubmitUsername}
        >
          {isProcessing ? "Loading..." : "Save"}
        </button>
        <Link to={`/profile`}>
          <button className="btn cancel">Cancel</button>
        </Link>
      </div>

      <div className="change-password-content">
        <h3>Change Password</h3>
        <label htmlFor="new_password">New password</label>
        {errors.new_password_error && (
          <span className="error">{errors.new_password_error}</span>
        )}
        <input
          type={passVisible2 ? "text" : "password"}
          name="new_password"
          placeholder="Enter new password"
          value={form.new_password}
          onChange={handleOnInputChange}
        />
        <label htmlFor="current_password_password">Old password</label>
        {errors.current_password_password_error && (
          <span className="error">
            {errors.current_password_password_error}
          </span>
        )}
        <input
          type={passVisible2 ? "text" : "password"}
          name="current_password_password"
          placeholder="Enter old password"
          value={form.current_password_password}
          onChange={handleOnInputChange}
        />

        <span className="reveal-password">
          <label htmlFor="reveal-password">Reveal Password</label>
          <input
            type="checkbox"
            name="reveal-password-2"
            onChange={togglePassVisibility}
          />
        </span>

        <button
          className="btn"
          disabled={isProcessing}
          onClick={handleOnSubmitNewPassword}
        >
          {isProcessing ? "Loading..." : "Save"}
        </button>
        <Link to={`/profile`}>
          <button className="btn cancel">Cancel</button>
        </Link>
        {errors.form && <span className="error">{errors?.form}</span>}
        <br />
      </div>
    </div>
  );
}

export default General;
