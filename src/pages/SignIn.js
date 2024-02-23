import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { getFirebaseData } from "../firebase-functions";
import { useNavigate } from "react-router-dom";

function SignIn() {
	const navigate = useNavigate();
	const handleLogin = async (e) => {
		e.preventDefault();
		const email = e.target.elements.email.value;
		const password = e.target.elements.password.value;

		try {
			// Sign in user with email and password
			await signInWithEmailAndPassword(auth, email, password);

			console.log("User logged in successfully!");
			getFirebaseData(email).then(() => navigate("/contest"));
		} catch (error) {
			document.getElementById("error").innerHTML = error.message;
		}
	};

	return (
		<main className='cardStyle greenCard'>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<fieldset className='formStyle'>
					<div className='child100'>
						<label htmlFor='email'>Email: </label>
						<input type='text' id='email' placeholder='Email' required />
					</div>
					<div className='child100'>
						<label htmlFor='password'>Password: </label>
						<input type='password' id='password' placeholder='password' required />
					</div>
					<p id='error' className='error'></p>
				</fieldset>

				<button type='submit' className='blueButton'>
					Login
				</button>
			</form>
		</main>
	);
}

export default SignIn;
