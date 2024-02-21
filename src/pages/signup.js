import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./firebase-config";

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

function SignUp() {
  const [formData, setFormData] = useState(new FormData('', '', '', '', '', '', '', '', '', ''));

  useEffect(() => {
    // Load form data from local storage if available
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Create user account with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Add user information to Firestore
      await addDoc(collection(db, "accounts"), {
        uid: userCredential.user.uid,
        fName: formData.fName,
        lName: formData.lName,
        address: formData.address,
        postal: formData.postal,
        province: formData.province,
        city: formData.city,
        phone: formData.phone,
        email: formData.email,
        date: formData.date,
        GuardianNameFirst: formData.GuardianNameFirst,
        GuardianNameLast: formData.GuardianNameLast,
        parentEmail: formData.parentEmail,
        GuardianNumber: formData.GuardianNumber,
      });

      console.log('User signed up successfully!');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    // Store form data in local storage
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  };

  const handleMinorFieldsChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, isMinor: true, [name]: value };
    setFormData(updatedFormData);
    // Store form data in local storage
    localStorage.setItem('formData', JSON.stringify(updatedFormData));
  };

  return (
    <div>
    <h2>Sign Up</h2>
    <form onSubmit={handleSignUp}>
      <input type="text" name="fName" placeholder="First Name" value={formData.fName} onChange={handleChange} required />
      <input type="text" name="lName" placeholder="Last Name" value={formData.lName} onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      <input type="text" name="postal" placeholder="Postal Code" value={formData.postal} onChange={handleChange} required />
      <input type="text" name="city" placeholder="city" value={formData.city} onChange={handleChange} required />
      <input type="text" name="province" placeholder="province" value={formData.province} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="phone" value={formData.phone} onChange={handleChange} required />
      <input type="date" name="date" placeholder="date" value={formData.date} onChange={handleChange} required />
      
      <input type="text" name="GuardianNameFirst" placeholder="Guardian First Name" value={formData.GuardianNameFirst} onChange={handleMinorFieldsChange} />
        <input type="text" name="GuardianNameLast" placeholder="Guardian Last Name" value={formData.GuardianNameLast} onChange={handleMinorFieldsChange} />
        <input type="email" name="parentEmail" placeholder="Parent Email" value={formData.parentEmail} onChange={handleMinorFieldsChange} />
        <input type="text" name="GuardianNumber" placeholder="Guardian Phone Number" value={formData.GuardianNumber} onChange={handleMinorFieldsChange} />
        
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  </div>
  );
}

export default SignUp;
