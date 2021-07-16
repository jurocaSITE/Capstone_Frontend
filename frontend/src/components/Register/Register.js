import "./Register.css";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useAuthContext } from "contexts/auth";

export default function Register({ setAppState }) {
	const navigate = useNavigate()
	const { setUser } = useAuthContext()
	const [isProcessing, setIsProcessing] = useState(false)
	const [errors, setErrors] = useState({})
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		username: "",
		email: "",
		password: "",
	})

	const handleOnInputChange = (event) => {
		if (event.target.name === "email") {
		  if (event.target.value.indexOf("@") === -1) {
			setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
		  } else {
			setErrors((e) => ({ ...e, email: null }))
		  }
		}
	
		setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
	  }
	
	  const handleOnSubmit = async () => {
		setIsProcessing(true)
		setErrors((e) => ({ ...e, form: null }))
	
		try {
		  const res = await axios.post("http://localhost:5000/auth/register", {
			first_name: form.firstName,
			last_name: form.lastName,
			username: form.username,
			email: form.email,
			password: form.password,
		  })
		  console.log(res)
		  if (res?.data?.user) {
			// setAppState(res.data.user)
			setUser(res.data.user)
			navigate("/") //TODO navigate to select interest page
		  } else {
			setErrors((e) => ({ ...e, form: "Something went wrong with registration" }))
		  }
		} catch (err) {
		  console.log(err)
		  const message = err?.response?.data?.error?.message
		  setErrors((e) => ({ ...e, form: message ?? String(err) }))
		} finally {
		  setIsProcessing(false)
		//   navigate("/select/interests") // if user registers successfully, take them to the select genre interests page
		}
	  }
	
	  return (
		<div className="Register">
		  <div className="card">
			<h2>Sign up for teca</h2>
	
			{errors.form && <span className="error">{errors.form}</span>}
			<br />

			<div className="form">

				<div className="input-field">
				<label htmlFor="firstName">First name*</label>
				<input
					type="text"
					name="firstName"
					placeholder="Enter your first name"
					value={form.firstName}
					onChange={handleOnInputChange}
				/>
				{errors.firstName && <span className="error">{errors.firstName}</span>}
				</div>
				
				<div className="input-field">
				<label htmlFor="lastName">Last name*</label>
				<input
					type="text"
					name="lastName"
					placeholder="Enter your last name"
					value={form.lastName}
					onChange={handleOnInputChange}
				/>
				{errors.lastName && <span className="error">{errors.lastName}</span>}
				</div>

				<div className="input-field">
					<label htmlFor="name">Username*</label>
					<input
					type="text"
					name="username"
					placeholder="Enter a unique username"
					value={form.username}
					onChange={handleOnInputChange}
					/>
					{errors.username && <span className="error">{errors.username}</span>}
				</div>
		
				<div className="input-field">
					<label htmlFor="email">Email Address*</label>
					<input
					type="email"
					name="email"
					placeholder="Enter a valid email"
					value={form.email}
					onChange={handleOnInputChange}
					/>
					{errors.email && <span className="error">{errors.email}</span>}
				</div>
		
				<div className="input-field">
					<label htmlFor="password">Password*</label>
					<input
					type="password"
					name="password"
					placeholder="Enter a secure password"
					value={form.password}
					onChange={handleOnInputChange}
					/>
					{errors.password && <span className="error">{errors.password}</span>}
				</div>
		
				<button className="btn" disabled={isProcessing} onClick={handleOnSubmit}>
					{isProcessing ? "Loading..." : "Sign Up"}
				</button>
			</div>
	
			<div className="footer">
			  <p>
				Already have an account? <Link to="/login">Sign In</Link>
			  </p>
			</div>
		  </div>
		</div>
	  )
}