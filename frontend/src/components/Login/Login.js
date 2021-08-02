import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useLoginForm } from "hooks/useLoginForm";
import { useAuthContext } from "contexts/auth";
import "./Login.css";

export default function Login() {
  const { user, setUser } = useAuthContext();
  const {
    form,
    errors,
    isProcessing,
    passVisible,
    togglePassVisibility,
    handleOnInputChange,
    handleOnSubmit,
  } = useLoginForm({ user, setUser });

  const keyPressEnter = (e) => {
    if (e.keyCode === 13) {
      handleOnSubmit();
    }
  };

  return (
    <div className="Login">
      <div className="card">
        <h2>Login</h2>

        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field password">
            <label htmlFor="password">Password*</label>
            <input
              type={passVisible ? "text": "password"}
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleOnInputChange}
              onKeyDown={keyPressEnter}
            />
            <span className="pass-eye" onClick={togglePassVisibility}>
              {passVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button
            className="btn"
            disabled={isProcessing}
            onClick={handleOnSubmit}
          >
            {isProcessing ? "Loading..." : "Login"}
          </button>
        </div>

        <div className="footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
