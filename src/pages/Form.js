import React from 'react';
import '../Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Form() {

    const [formData, setFormData] = useState({});
    const [fieldsChecker, setField] = useState({});
    const [isMinor, setIsMinor] = useState(false);
    const [fieldsSecretOpen, setFieldsSecretOpen] = useState(false);

    const charReg = (data) => /^[a-zA-Z]+$/.test(data);
    const phoneReg = (data) => /^[(]?([0-9]{3})[)]?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(data);
    const passwordCheck = (data) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data);
    const hasCharsNum = (data) => /^[a-zA-Z0-9\s]+$/.test(data);
    const postalReg = (data) => /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(data);
    const emailReg = (data) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data);
    const hasDate = (data) => /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(data);

    const secret = (data) => {
        const secretPattern = /^(001100010010011110100001101101110011)$/;
        if (secretPattern.test(data.field.value) && !fieldsSecretOpen) {
            window.open("https://www.youtube.com/watch?v=0Whn0YzNG4s", "_blank");
            setFieldsSecretOpen(true);
        }
    };

    const resetErrors = () => {
        fieldsChecker.forEach(inputField => inputField.error.innerText = "");
        fieldsCheckerIsMinor.forEach(inputField => inputField.error.innerText = "");
    };

    const formCheck = (e) => {
        e.preventDefault();
        console.log("FORM CHECKED");
        let errorsFound = 0;
        resetErrors();
        const rulesCheckbox = document.getElementById('rules');
        const rulesCheckboxError = document.getElementById('checkboxError');

        if (!rulesCheckbox.checked) {
            rulesCheckboxError.innerText = "*Please consent to the rules and regulations.";
            errorsFound += 1;
        } else {
            rulesCheckboxError.innerText = "";
        }

        if (isMinor) {
            fieldsCheckerIsMinor.forEach(inputField => {
                if (!inputField.checker(inputField)) {
                    inputField.error.innerText = inputField.msg;
                    errorsFound += 1;
                }
            });
        }

        fieldsChecker.forEach(inputField => {
            secret(inputField);
            if (!inputField.checker(inputField)) {
                inputField.error.innerText = inputField.msg;
                errorsFound += 1;
            }
        });

        if (errorsFound > 0) {
            console.log("FAIL");
        } else {
            saveFormData(fieldsChecker);
            console.log(formData);
            console.log("PASS");
            successValues();
        }
    };

    function successValues() {
        const mySuccess = document.getElementById("success");
        const parentInfo = document.getElementById("parentInfo");
        let successFName = document.getElementById("successName");
        let dob = document.getElementById("birth");
        let emailA = document.getElementById("emailF");
        let phoneNum = document.getElementById("phoneF");
        let street = document.getElementById("street");
        let cityF = document.getElementById("cityF");
        let provinceF = document.getElementById("provinceF");
        let postalF = document.getElementById("postalF");
        let gFirst = document.getElementById("gFirst");
        let gLast = document.getElementById("gLast");
        let gEmail = document.getElementById("gEmail");
        let gNum = document.getElementById("gNum");

        if (isMinor) {
            parentInfo.style.display = 'block';
            gFirst.innerText = formData.GuardianNameFirst;
            gLast.innerText = formData.GuardianNameLast;
            gEmail.innerText = formData.parentEmail;
            gNum.innerText = formData.GuardianNumber;
        }

        successFName.innerText = `${formData.fName} ${formData.lName}`;
        dob.innerText = formData.date;
        emailA.innerText = formData.email;
        phoneNum.innerText = formData.phone;
        street.innerText = formData.address;
        cityF.innerText = formData.city;
        postalF.innerText = formData.postal;
        provinceF.innerText = formData.province;

        mySuccess.style.display = 'block';
        console.log("passssss");
    }

    // Define the function needsGuardian
    function needsGuardian() {
        if (!isMinor) {
            return true;
        } else {
            return hasChars();
        }
    }

    // Define the FormData class
    class FormData {
        constructor(fName, lName, address, postal, province, city, phone, email, date, password) {
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
        }

        setMinorFields(GuardianNameFirst, GuardianNameLast, parentEmail, GuardianNumber) {
            this.isMinor = true;
            this.GuardianNameFirst = GuardianNameFirst;
            this.GuardianNameLast = GuardianNameLast;
            this.parentEmail = parentEmail;
            this.GuardianNumber = GuardianNumber;
        }
    }

    // Define the function saveFormData
    function saveFormData(fieldsChecker) {
        formData = new FormData(
            fieldsChecker[0].field.value,
            fieldsChecker[1].field.value,
            fieldsChecker[2].field.value,
            fieldsChecker[3].field.value,
            fieldsChecker[4].field.value,
            fieldsChecker[5].field.value,
            fieldsChecker[6].field.value,
            fieldsChecker[7].field.value,
            fieldsChecker[8].field.value,
            fieldsChecker[9].field.value
        );
        if (isMinor) {
            formData.setMinorFields(
                fieldsCheckerIsMinor[0].field.value,
                fieldsCheckerIsMinor[1].field.value,
                fieldsCheckerIsMinor[2].field.value,
                fieldsCheckerIsMinor[3].field.value
            );
        }
    }


    // Define the formInitiator function
    function formInitiator() {
        let fName = document.getElementById('fName');
        let fNameError = document.getElementById('fNameError');
        let lName = document.getElementById('lName');
        let lNameError = document.getElementById('lNameError');
        let address = document.getElementById('st');
        let stError = document.getElementById('stError');
        let postal = document.getElementById('postal');
        let postalError = document.getElementById('postalError');
        let province = document.getElementById('province');
        let provinceError = document.getElementById('provinceError');
        let city = document.getElementById('city');
        let cityError = document.getElementById('cityError');
        let phone = document.getElementById('phone');
        let phoneError = document.getElementById('phoneError');
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let passwordError = document.getElementById('passwordError');
        let emailError = document.getElementById('emailError');
        let date = document.getElementById('date');
        let dateError = document.getElementById('dateError');
        let GuardianNameFirst = document.getElementById('GfName');
        let GfNameError = document.getElementById('GfNameError');
        let GuardianNameLast = document.getElementById('GlName');
        let GlNameError = document.getElementById('GlNameError');
        let GuardianNumber = document.getElementById('GpNumber');
        let GpNumberError = document.getElementById('GpNumberError');
        let parentEmail = document.getElementById('parentEmail');
        let parentEmailError = document.getElementById('parentEmailError');

        const fieldsChecker = [
            { field: fName, checker: charReg, error: fNameError, msg: "*Please enter a valid name." },
            { field: lName, checker: charReg, error: lNameError, msg: "*Please enter a valid name." },
            { field: address, checker: hasCharsNum, error: stError, msg: "*Invalid Address" },
            { field: postal, checker: postalReg, error: postalError, msg: "*Invalid Postal Code" },
            { field: province, checker: charReg, error: provinceError, msg: "*Invalid Province" },
            { field: city, checker: charReg, error: cityError, msg: "*Invalid City" },
            { field: phone, checker: phoneReg, error: phoneError, msg: "*The phone number you entered is not in the correct format.use only numbers." },
            { field: email, checker: emailReg, error: emailError, msg: "*Please provide a valid email address." },
            { field: date, checker: hasDate, error: dateError, msg: "*Invalid Date" },
            { field: password, checker: passwordCheck, error: passwordError, msg: "*Must contain at least one number, upper and lower case letter, and at least 6 characters." }
        ];

        const fieldsCheckerIsMinor = [
            { field: GuardianNameFirst, checker: charReg, error: GfNameError, msg: "*Invalid Name" },
            { field: GuardianNameLast, checker: charReg, error: GlNameError, msg: "*Invalid Name" },
            { field: parentEmail, checker: emailReg, error: parentEmailError, msg: "*Invalid Email" },
            { field: GuardianNumber, checker: phoneReg, error: GpNumberError, msg: "*Invalid Phone Number" },
        ];

        const parentInfoFields = document.getElementById('parentInfoFields');

        date.addEventListener('change', function () {
            const dob = new Date(this.value);
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();

            if (age < 16) {
                setIsMinor(true);
                dateError.textContent = "";
                parentInfoFields.style.display = 'block';
            } else {
                setIsMinor(false);
                parentInfoFields.style.display = 'none';
            }
        });

        let formSubmit = document.getElementById("formSubmit");
        formSubmit.addEventListener("click", formCheck);
    }

    document.addEventListener("DOMContentLoaded", function () {
        formInitiator();
    });

    let rulesBox = document.getElementById('rulesBox');
    rulesBox.addEventListener('scroll', () => {
        let rules = document.getElementById('rules');
        let rulesLabel = document.getElementById('rulesLabel');

        if (rulesBox.scrollTop + rulesBox.clientHeight >= rulesBox.scrollHeight) {
            rules.classList.remove('disabled');
            rulesLabel.classList.remove('disabled');
        }
    });

    return (
        <> 
        
        <form id="myForm" onSubmit={formCheck}>
        <fieldset>
          <span className="child50">
            <label htmlFor="fName">First Name: </label>
            <input type="text" id="fName" placeholder="First Name" />
            <p id="fNameError" className="error"></p>
          </span>
          <span className="child50">
            <label htmlFor="lName">Last Name: </label>
            <input type="text" id="lName" placeholder="Last Name" />
            <p id="lNameError" className="error"></p>
          </span>
          <span className="child100">
            <label htmlFor="st">Address Line: </label>
            <input type="text" id="st" placeholder="Address Line" />
            <p id="stError" className="error"></p>
          </span>
          <span className="child30">
            <label htmlFor="postal">Postal: </label>
            <input type="text" id="postal" placeholder="Postal Code" />
            <p id="postalError" className="error"></p>
          </span>
          <span className="child30">
            <label htmlFor="province">Province: </label>
            <input type="text" id="province" placeholder="Province" />
            <p id="provinceError" className="error"></p>
          </span>
          <span className="child30">
            <label htmlFor="city">City: </label>
            <input type="text" id="city" placeholder="City" />
            <p id="cityError" className="error"></p>
          </span>
          <span className="child100">
            <label htmlFor="phone">Phone Number: </label>
            <input type="tel" id="phone" placeholder="0000000000" />
            <p id="phoneError" className="error"></p>
          </span>
          <span className="child100">
            <label htmlFor="date">Date Of Birth: </label>
            <input type="date" id="date" />
            <p id="dateError" className="error"></p>
          </span>
          <div id="parentInfoFields">
            <section className="myFields">
              <span className="under">*Participants under the age of 16 must provide valid parent information, including name, email, and phone number.</span>
              <span className="child55">
                <label htmlFor="GfName">Guardian's First Name: </label>
                <input type="text" id="GfName" />
                <p id="GfNameError" className="error"></p>
              </span>
              <span className="child55">
                <label htmlFor="GlName">Guardian's Last Name: </label>
                <input type="text" id="GlName" />
                <p id="GlNameError" className="error"></p>
              </span>
              <span className="child100">
                <label htmlFor="parentEmail">Guardian's Email: </label>
                <input type="email" id="parentEmail" />
                <p id="parentEmailError" className="error"></p>
              </span>
              <span className="child100">
                <label htmlFor="GpNumber">Guardian's Phone Number: </label>
                <input type="text" id="GpNumber" />
                <p id="GpNumberError" className="error"></p>
              </span>
            </section>
          </div>
          <span className="child100">
            <label htmlFor="email">Email Address: </label>
            <input type="text" id="email" placeholder="Email Address" />
            <p id="emailError" className="error"></p>
          </span>
          <span className="child100">
            <label htmlFor="password">Password: </label>
            <input type="text" id="password" />
            <p id="passwordError" className="error"></p>
          </span>
          <h2>Terms and Conditions:</h2>
          <div id="rulesBox" className="rules-box">
          <h3>
                    Usage of Data Collected on the Site:
                </h3>
                <p>
                    BuyMore Dollars Inc. values your privacy and is committed to protecting the information collected
                    during
                    your participation in the Virtual Scratch Off Contest. By engaging with the site, you consent to the
                    collection, processing, and use of your data for contest-related purposes only. Rest assured, your
                    information will be handled with the utmost care and in accordance with applicable data protection
                    laws.
                </p>
                <h3>
                    Minimum Age of Users:
                </h3>
                <p>
                    To participate in the Virtual Scratch Off Contest, users must be at least 16 years old. Users under
                    the
                    age of 16 are strictly prohibited from entering unless accompanied by a guardian's permission.
                    BuyMore
                    Dollars Inc. takes the protection of minors seriously and urges parents or guardians to supervise
                    and
                    approve their children's participation in the contest.
                </p>
                <h3>
                    Chance of Winning and Prize Distribution:
                </h3>
                <p>
                    Winners of the Virtual Scratch Off Contest will be determined through a random draw, ensuring a fair
                    and
                    unbiased selection process. Prize distribution will adhere to the specified tiers: a grand prize,
                    second
                    tier prizes, third tier prizes, and fourth tier prizes, as outlined in the contest details. By
                    participating, contestants acknowledge the unpredictability of winning and understand that the
                    majority
                    of plays may result in a default "Please Play Again."
                </p>
                <h3>
                    Opting Out of Communications:
                </h3>
                <p>
                    BuyMore Dollars Inc. may send communications related to contest updates, promotions, and
                    newsletters.
                    Contestants have the option to opt out of receiving such communications by updating their
                    preferences in
                    their account settings or following the provided opt-out instructions in the communications
                    received.
                    Please note that opting out may affect your receipt of important contest-related information.
                </p>
                <p>
                    By participating in the Virtual Scratch Off Contest, you agree to abide by these conditions. BuyMore
                    Dollars Inc. reserves the right to update these conditions as necessary, and any changes will be
                    reflected on this legal page. We appreciate your understanding and compliance with these terms. If
                    you
                    have any questions or concerns, please contact our support team for assistance.
                </p>
          </div>
          <div className="child100 checkBox">
            <input type="checkbox" id="rules" className="disabled" />
            <label className="disabled" htmlFor="rules">I Consent to Rules and Regulations</label>
            <p className="error" id="checkboxError"></p>
          </div>
          <div className="child100 checkBox">
            <input type="checkbox" id="sponsors" />
            <label htmlFor="sponsors">I Consent to Receive Communications Regarding BuyMore Dollar Products and Sponsors</label>
          </div>
          <button id="formSubmit">Submit</button>
        </fieldset>
      </form>
      <div id="success">
      <div className="formStyle">
        <img className="logo" src='./logo.png' alt="Completion" />
        <h2>Congratulations!</h2>
        <p>Your Form has been Successfully Submitted!</p>
        <section className="line"></section>
        <p className="ready">Get ready to embark on a thrilling journey of virtual scratch-offs and a chance to win BuyMore Dollars.</p>
        
        <section className="successInfo">
          <p className="sub">Here's a quick summary of your submission:</p>
          <span><strong>Full Name:</strong><p>{}</p></span>
          <span><strong>Date of Birth:</strong><p>{}</p></span>
          <span><strong>Email Address:</strong><p>{}</p></span>
          <span><strong>Phone Number:</strong><p>{}</p></span>
          <span><strong>Street Address:</strong><p>{}</p></span>
          <span><strong>City:</strong><p>{}</p></span>
          <span><strong>State/Province:</strong><p>{}</p></span>
          <span><strong>ZIP/Postal Code:</strong><p>{}</p></span>

          {  (
            <div id="parentInfo">
              <span><strong>Guardian's First Name:</strong><p>{}</p></span>
              <span><strong>Guardian's Last Name:</strong><p>{}</p></span>
              <span><strong>Guardian's Email:</strong><p>{}</p></span>
              <span><strong>Guardian's Phone Number:</strong><p>{}</p></span>
            </div>
          )}
        </section>

        <p className="scratchP">Hit the next button to start scratching!</p>
        <button id="formNext">Next</button>
      </div>
    </div>
    
            
        </>
    );
          }


export default Form;
