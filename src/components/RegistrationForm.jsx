import React, { useState } from "react";
import moment from "moment";
import "./style.css";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
    setAge("");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleTermsAndConditionsChange = (event) => {
    setTermsAndConditions(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === "") {
      setUsernameError("Username is required.");
      return;
    }

    if (localStorage.getItem(username)) {
      setUsernameError("Username is already taken.");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    if (!password.match(/[A-Z]/)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!password.match(/[0-9]/)) {
      setPasswordError("Password must contain at least one number.");
      return;
    }

    if (!password.match(/[!@#$%^&*()_+-=[\]{};':"\\|,.<>/?]/)) {
      setPasswordError("Password must contain at least one special character.");
      return;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    if (gender === "") {
      return;
    }

    if (birthDate === "") {
      return;
    }

    const ageInMs = moment().diff(birthDate, "years");
    if (ageInMs < 18) {
      return;
    }

    setAge(
      `${moment.duration(moment().diff(birthDate)).years()} years, ${moment
        .duration(moment().diff(birthDate))
        .months()} months, ${moment
        .duration(moment().diff(birthDate))
        .days()} days`
    );

    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailError("Invalid email address.");
      return;
    }

    if (!termsAndConditions) {
      return;
    }

    localStorage.setItem(
      username,
      JSON.stringify({
        username,
        password,
        gender,
        birthDate,
        age,
        email,
      })
    );
    if (
      !usernameError &&
      !passwordError &&
      !confirmPasswordError &&
      !emailError
    ) {
      alert("You Have Succesfully Registered");
      navigate("/");
    }
  };

  return (
    <div>
      {registered ? (
        <div>
          <h1>Registration successful!</h1>
          <p>Your username is: {username}</p>
          <p>Your password is: {password}</p>
          <p>Your gender is: {gender}</p>
          <p>Your birth date is: {birthDate}</p>
          <p>Your age is: {age}</p>
          <p>Your email address is: {email}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
            {usernameError && <p>{usernameError}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p>{passwordError}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && <p>{confirmPasswordError}</p>}
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select id="gender" value={gender} onChange={handleGenderChange}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="birthDate">Birth Date:</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={handleBirthDateChange}
            />
          </div>
          {age && <p>Your age is: {age}</p>}
          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p>{emailError}</p>}
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={termsAndConditions}
                onChange={handleTermsAndConditionsChange}
              />
              I accept the terms and conditions.
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
