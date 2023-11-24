
import './LoginForm.css';
import React, { useState } from 'react';
import logoImage from '../resources/logo (2).png';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    // Perform your login logic here
    // For simplicity, assume login is successful
    // In a real application, you would check credentials and perform authentication

    // Assuming the login is successful, call the callback function
    props.onLoginSuccess();
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <button className="close-button" onClick={props.onClose}>
          X
        </button>
        <img src={logoImage} alt="Logo" className="logo" />

        <p id="caption">
          Sign in to generate your own recipe book using only what you have in your kitchen!
        </p>
        <form className="login-form" onSubmit={submitHandler}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;