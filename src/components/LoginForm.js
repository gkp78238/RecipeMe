import React from 'react';
import './loginForm.css';

const Login = () => {
  return (
    <section className="login-section">
      <div className="login-container">
        <img src="/workspaces/CSCI-4300-Final/src/resources/logo (2).png" alt="Logo" className="logo" />
        <p id="caption">
          Sign in to generate your own recipe book using only what you have in your kitchen!
        </p>
        <form className="login-form" action="#" method="post">
          <input type="text" id="username" name="username" placeholder="Username" required />
          <input type="password" id="password" name="password" placeholder="Password" required />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;