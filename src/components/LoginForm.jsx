import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === "") {
      setUsernameError("Username is required.");
      return;
    }

    const user = JSON.parse(localStorage.getItem(username));
    if (!user) {
      setUsernameError("Username not found.");
      return;
    }

    if (password !== user.password) {
      setPasswordError("Invalid password.");
      return;
    }

    if (!usernameError && !passwordError) {
      navigate("/Profile", { state: { user } });
    }
  };

  const handleSignup = () => {
    navigate("/RegistrationForm");
  };

  return (
    <>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignup}>Signup</button>
    </>
  );
};

export default LoginForm;
