import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";

function FormSuccess() {
	const location = useLocation();
	const formData = location.state.formData;
	const navigate = useNavigate();

	useEffect(() => {
		if (formData == null) {
			console.log("No form data");
			navigate("/");
		}
	}, []);

	console.log(formData);

	return (
		<main className='cardStyle greenCard flexCol gap1'>
			<img className='logo' src='./logo.png' alt='Completion' />
			<h1>Congratulations!</h1>
			<p>Your Form has been Successfully Submitted!</p>
			<section className='line'></section>
			<h3>
				Get ready to embark on a thrilling journey of virtual scratch-offs and a
				chance to win BuyMore Dollars.
			</h3>

			<section className='innerCard'>
				<h3>Here's a quick summary of your submission:</h3>
				<p>
					<strong>Full Name:</strong> {`${formData.fName} ${formData.lName}`}
				</p>
				<p>
					<strong>Date of Birth:</strong> {formData.date}
				</p>
				<p>
					<strong>Email Address:</strong> {formData.email}
				</p>
				<p>
					<strong>Phone Number:</strong> {formData.phone}
				</p>
				<p>
					<strong>Street Address:</strong> {formData.street}
				</p>
				<p>
					<strong>City:</strong> {formData.city}
				</p>
				<p>
					<strong>Province:</strong> {formData.province}
				</p>
				<p>
					<strong>Postal Code:</strong> {formData.postal}
				</p>

				{formData.isMinor ? (
					<div id='parentInfo'>
						<p>
							<strong>Guardian's First Name:</strong> {formData.guardianfName}
						</p>
						<p>
							<strong>Guardian's Last Name:</strong> {formData.guardianlName}
						</p>
						<p>
							<strong>Guardian's Email:</strong> {formData.guardianEmail}
						</p>
						<p>
							<strong>Guardian's Phone Number:</strong> {formData.guardianPhone}
						</p>
					</div>
				) : null}
			</section>

			<p className='text20 extraLight'>Hit the next button to start scratching!</p>
			<button className='blueButton'>
				<Link to='/contest'>Next</Link>
			</button>
		</main>
	);
}

export default FormSuccess;
