import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// Sign in user with email and password
			await signInWithEmailAndPassword(auth, email, password);
			console.log("User logged in successfully!");
		} catch (error) {
			console.error("Error logging in:", error.message);
		}
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={handleEmailChange}
					required
				/>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={handlePasswordChange}
					required
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
}

export default Login;
