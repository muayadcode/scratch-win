import React from "react";
import "../Form.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { saveDataFirebase } from "../firebase-functions";

function Form() {
	class FormData {
		constructor(
			fName,
			lName,
			address,
			postal,
			province,
			city,
			phone,
			email,
			date,
			password,
			sponsors,
			consented,
			secret
		) {
			this.fName = fName;
			this.lName = lName;
			this.address = address;
			this.postal = postal;
			this.province = province;
			this.city = city;
			this.phone = phone;
			this.email = email;
			this.password = password;
			this.date = date;
			this.sponsors = sponsors;
			this.consented = consented;
			this.isMinor = false;
			this.secret = false;
		}

		setMinorFields(
			guardianNameFirst,
			guardianNameLast,
			guardianEmail,
			guardianNumber
		) {
			this.isMinor = true;
			this.guardianNameFirst = guardianNameFirst;
			this.guardianNameLast = guardianNameLast;
			this.guardianEmail = guardianEmail;
			this.guardianNumber = guardianNumber;
		}
	}

	class FormField {
		name;
		id;
		errorMsg;
		checker;
		constructor(name, errorMsg, checker, id) {
			this.name = name;
			this.errorMsg = errorMsg;
			this.checker = checker;
			this.id = id;
		}

		check(value) {
			return this.checker(value);
		}
	}

	const charReg = (data) => /^[a-zA-Z]+$/.test(data);
	const phoneReg = (data) =>
		/^[(]?([0-9]{3})[)]?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(data);
	const passwordCheck = (data) =>
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data);
	const hasCharsNum = (data) => /^[a-zA-Z0-9\s]+$/.test(data);
	const postalReg = (data) => /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(data);
	const emailReg = (data) =>
		/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data);
	const hasDate = (data) =>
		/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(data);
	const [errors, setErrors] = useState({
		fName: "",
		lName: "",
		email: "",
		phone: "",
		password: "",
		st: "",
		postal: "",
		province: "",
		city: "",
		date: "",
		guardianfName: "",
		guardianlName: "",
		guardianEmail: "",
		guardianPhone: "",
		consented: "",
	});

	useEffect(() => {
		// Load form data from local storage if available
		const storedFormData = localStorage.getItem("formData");
		// if () {
		// 	setFormDataLocal(JSON.parse(storedFormData));
		// }
		console.log("Form Data Local: ", storedFormData);
		if (storedFormData !== null) {
			navigate("/contest", { state: { formData: storedFormData } });
		}
	}, []);
	// const [formFields1, setField] = useState({ fName: "", lName: "", email: "", phone: "", password: "", st: "", postal: "", province: "", city: "", date: "", guardianfName: "", guardianlName: "", guardianEmail: "", guardianPhone: "" });
	const [isMinor, setIsMinor] = useState();
	// const [fieldsSecretOpen, setFieldsSecretOpen] = useState(false);
	const navigate = useNavigate();
	const [secret, setSecret] = useState(false);
	let secretOpen = false;

	let formFields = [
		new FormField("Last Name", "*Please enter a valid name.", charReg, "lName"),
		new FormField("Address", "*Invalid Address", hasCharsNum, "st"),
		new FormField("Postal", "*Invalid Postal Code", postalReg, "postal"),
		new FormField("Province", "*Invalid Province", charReg, "province"),
		new FormField("City", "*Invalid City", charReg, "city"),
		new FormField("Phone", "*Invalid Phone ", phoneReg, "phone"),
		new FormField(
			"Email",
			"*Please provide a valid email address.",
			emailReg,
			"email"
		),
		new FormField("Date", "*Invalid Date", hasDate, "date"),
		new FormField(
			"Password",
			"*Must contain at least one number, upper and lower case letter, a special character, and be at least 6 characters.",
			passwordCheck,
			"password"
		),
	];

	let formFieldsIsMinor = [
		new FormField(
			"Guardian's First Name",
			"*Invalid Name",
			charReg,
			"guardianfName"
		),
		new FormField(
			"Guardian's Last Name",
			"*Invalid Name",
			charReg,
			"guardianlName"
		),
		new FormField(
			"Guardian's Email",
			"*Invalid Email",
			emailReg,
			"guardianEmail"
		),
		new FormField(
			"Guardian's Phone",
			"*Invalid Phone",
			phoneReg,
			"guardianPhone"
		),
	];

	function secretCheck(value) {
		const secretPattern = /^(001100010010011110100001101101110011)$/;
		if (secretPattern.test(value) && !secretOpen) {
			window.open("https://www.youtube.com/watch?v=0Whn0YzNG4s", "_blank");
			secretOpen = true;
			return true;
		}
		return false;
	}

	const formCheck = (e) => {
		e.preventDefault();
		console.log("FORM CHECKED");
		console.log(e.target.elements);
		let errorsFound = 0;
		let errorsTemp = {
			fName: "",
			lName: "",
			email: "",
			phone: "",
			password: "",
			st: "",
			postal: "",
			province: "",
			city: "",
			date: "",
			guardianfName: "",
			guardianlName: "",
			guardianEmail: "",
			guardianPhone: "",
			consented: "",
		};

		let formFieldsTemp = {
			fName: e.target.elements["fName"].value,
			lName: e.target.elements["lName"].value,
			st: e.target.elements["st"].value,
			postal: e.target.elements["postal"].value,
			province: e.target.elements["province"].value,
			city: e.target.elements["city"].value,
			phone: e.target.elements["phone"].value,
			email: e.target.elements["email"].value,
			date: e.target.elements["date"].value,
			password: e.target.elements["password"].value,
			sponsors: e.target.elements["sponsors"].checked,
			consented: e.target.elements["consented"].checked,
		};

		let formSecret = false;

		let formFieldsIsMinorTemp;
		if (isMinor) {
			formFieldsIsMinorTemp = {
				guardianfName: e.target.elements["guardianfName"].value,
				guardianlName: e.target.elements["guardianlName"].value,
				guardianEmail: e.target.elements["guardianEmail"].value,
				guardianPhone: e.target.elements["guardianPhone"].value,
			};
		}

		if (isMinor) {
			formFieldsIsMinor.forEach((field) => {
				if (!field.check(formFieldsIsMinorTemp[`${field.id}`])) {
					errorsTemp[`${field.id}`] = field.errorMsg;
					errorsFound += 1;
				}
			});
		}
		formFields.forEach((field) => {
			formSecret = secretCheck(formFieldsTemp[`${field.id}`]);
			if (!field.check(formFieldsTemp[`${field.id}`])) {
				errorsTemp[field.id] = field.errorMsg;
				// console.log(errorsTemp[`${field.id}`]);
				errorsFound += 1;
			}
		});

		if (!formFieldsTemp.consented) {
			errorsTemp.consented = "*Please consent to the rules and regulations.";
			errorsFound += 1;
		}

		if (errorsFound > 0) {
			setErrors(errorsTemp);
			console.log("FAIL");
		} else {
			if (isMinor) {
				const data = saveFormData(
					formFieldsTemp,
					formFieldsIsMinorTemp,
					formSecret
				);
				saveDataFirebase(data);
				navigate("/success", {
					state: { formData: data },
				});
			} else {
				const data = saveFormData(
					formFieldsTemp,
					formFieldsIsMinorTemp,
					formSecret
				);
				saveDataFirebase(data);
				navigate("/success", { state: { formData: data } });
			}
			console.log("PASS");
		}
	};

	// Define the function saveFormData
	function saveFormData(formfields, formFieldsIsMinor) {
		let formData = new FormData(
			formfields.fName,
			formfields.lName,
			formfields.st,
			formfields.postal,
			formfields.province,
			formfields.city,
			formfields.phone,
			formfields.email,
			formfields.date,
			formfields.password,
			formfields.sponsors,
			formfields.consented,
			secret
		);
		if (formFieldsIsMinor !== undefined) {
			formData.setMinorFields(
				formFieldsIsMinor.guardianfName.value,
				formFieldsIsMinor.guardianlName.value,
				formFieldsIsMinor.guardianEmail.value,
				formFieldsIsMinor.guardianPhone.value
			);
		}
		return formData;
	}

	// let age;

	function dateChange(e) {
		const dob = new Date(e.target.value);
		const today = new Date();
		const age = today.getFullYear() - dob.getFullYear();
		let parentDetails = document.getElementById("parentInfoFields");
		if (age < 16) {
			setIsMinor(true);
			parentDetails.classList.remove("displayNone");
			parentDetails.classList.add("displayBlock");
		} else {
			setIsMinor(false);
			parentDetails.classList.remove("displayBlock");
			parentDetails.classList.add("displayNone");
		}
	}

	function handleTermsScroll() {
		let rules = document.getElementById("consented");
		let rulesLabel = document.getElementById("consentedLabel");
		let rulesBox = document.getElementById("rulesBox");

		if (
			rulesBox.scrollTop + rulesBox.clientHeight >=
			rulesBox.scrollHeight - 10
		) {
			rules.classList.remove("disabled");

			rulesLabel.classList.remove("disabled");
		}
	}

	return (
		<main className='cardStyle greenCard'>
			<form id='myForm' onSubmit={formCheck}>
				<fieldset className='formStyle'>
					<div className='child50'>
						<label htmlFor='fName'>First Name: </label>
						<input type='text' id='fName' placeholder='First Name' />
						<p id='fNameError' className='error'>
							{errors.fName}
						</p>
					</div>
					<div className='child50'>
						<label htmlFor='lName'>Last Name: </label>
						<input type='text' id='lName' placeholder='Last Name' />
						<p id='lNameError' className='error'>
							{errors.lName}
						</p>
					</div>
					<div className='child100'>
						<label htmlFor='st'>Address Line: </label>
						<input type='text' id='st' placeholder='Address Line' />
						<p id='stError' className='error'>
							{errors.st}
						</p>
					</div>
					<div className='child30'>
						<label htmlFor='postal'>Postal: </label>
						<input type='text' id='postal' placeholder='Postal Code' />
						<p id='postalError' className='error'>
							{errors.postal}
						</p>
					</div>
					<div className='child30'>
						<label htmlFor='province'>Province: </label>
						<input type='text' id='province' placeholder='Province' />
						<p id='provinceError' className='error'>
							{errors.province}
						</p>
					</div>
					<div className='child30'>
						<label htmlFor='city'>City: </label>
						<input type='text' id='city' placeholder='City' />
						<p id='cityError' className='error'>
							{errors.city}
						</p>
					</div>
					<div className='child100'>
						<label htmlFor='phone'>Phone Number: </label>
						<input type='tel' id='phone' placeholder='0000000000' />
						<p id='phoneError' className='error'>
							{errors.phone}
						</p>
					</div>
					<div className='child100'>
						<label htmlFor='date'>Date Of Birth: </label>
						<input type='date' id='date' onChange={dateChange} />
						<p id='dateError' className='error'>
							{errors.date}
						</p>
					</div>

					<div id='parentInfoFields' className='displayNone'>
						<section className='flexWrapCenter'>
							<em className='error h48'>
								*Participants under the age of 16 must provide valid parent information,
								including name, email, and phone number.
							</em>
							<div className='child55'>
								<label htmlFor='guardianfName'>Guardian's First Name: </label>
								<input type='text' id='guardianfName' />
								<p id='guardianfNameError' className='error'>
									{errors.guardianfName}
								</p>
							</div>
							<div className='child55'>
								<label htmlFor='guardianlName'>Guardian's Last Name: </label>
								<input type='text' id='guardianlName' />
								<p id='guardianlNameError' className='error'>
									{errors.guardianlName}
								</p>
							</div>
							<div className='child100'>
								<label htmlFor='guardianEmail'>Guardian's Email: </label>
								<input type='email' id='guardianEmail' />
								<p id='guardianEmailError' className='error'>
									{errors.guardianEmail}
								</p>
							</div>
							<div className='child100'>
								<label htmlFor='guardianPhone'>Guardian's Phone Number: </label>
								<input type='text' id='guardianPhone' />
								<p id='guardianPhoneError' className='error'>
									{errors.guardianPhone}
								</p>
							</div>
						</section>
					</div>
					<div className='child100'>
						<label htmlFor='email'>Email Address: </label>
						<input type='text' id='email' placeholder='Email Address' />
						<p id='emailError' className='error'>
							{errors.email}
						</p>
					</div>
					<div className='child100'>
						<label htmlFor='password'>Password: </label>
						<input type='text' id='password' />
						<p id='passwordError' className='h48 error '>
							{errors.password}
						</p>
					</div>
					<h2>Terms and Conditions:</h2>
					<div id='rulesBox' className='rules-box' onScroll={handleTermsScroll}>
						<h3>Usage of Data Collected on the Site:</h3>
						<p>
							BuyMore Dollars Inc. values your privacy and is committed to protecting
							the information collected during your participation in the Virtual
							Scratch Off Contest. By engaging with the site, you consent to the
							collection, processing, and use of your data for contest-related purposes
							only. Rest assured, your information will be handled with the utmost care
							and in accordance with applicable data protection laws.
						</p>
						<h3>Minimum Age of Users:</h3>
						<p>
							To participate in the Virtual Scratch Off Contest, users must be at least
							16 years old. Users under the age of 16 are strictly prohibited from
							entering unless accompanied by a guardian's permission. BuyMore Dollars
							Inc. takes the protection of minors seriously and urges parents or
							guardians to supervise and approve their children's participation in the
							contest.
						</p>
						<h3>Chance of Winning and Prize Distribution:</h3>
						<p>
							Winners of the Virtual Scratch Off Contest will be determined through a
							random draw, ensuring a fair and unbiased selection process. Prize
							distribution will adhere to the specified tiers: a grand prize, second
							tier prizes, third tier prizes, and fourth tier prizes, as outlined in
							the contest details. By participating, contestants acknowledge the
							unpredictability of winning and understand that the majority of plays may
							result in a default "Please Play Again."
						</p>
						<h3>Opting Out of Communications:</h3>
						<p>
							BuyMore Dollars Inc. may send communications related to contest updates,
							promotions, and newsletters. Contestants have the option to opt out of
							receiving such communications by updating their preferences in their
							account settings or following the provided opt-out instructions in the
							communications received. Please note that opting out may affect your
							receipt of important contest-related information.
						</p>
						<p>
							By participating in the Virtual Scratch Off Contest, you agree to abide
							by these conditions. BuyMore Dollars Inc. reserves the right to update
							these conditions as necessary, and any changes will be reflected on this
							legal page. We appreciate your understanding and compliance with these
							terms. If you have any questions or concerns, please contact our support
							team for assistance.
						</p>
					</div>
					<section className='checkBoxes'>
						<div className=' checkBox'>
							<input type='checkbox' id='consented' className='disabled' />
							<label id='consentedLabel' className='disabled' htmlFor='consented'>
								I Consent to Rules and Regulations listed above.
							</label>
							<p id='consentedError' className='error'>
								{errors.consented}
							</p>
						</div>

						<div className=' checkBox'>
							<input type='checkbox' id='sponsors' />
							<label htmlFor='sponsors'>
								I Consent to Receive Communications Regarding BuyMore Dollar Products
								and Sponsors
							</label>
						</div>
					</section>
				</fieldset>
				<button id='formSubmit' className='blueButton'>
					Submit
				</button>
			</form>
		</main>
	);
}

export default Form;
