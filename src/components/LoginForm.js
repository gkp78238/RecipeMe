import './LoginForm.css';
import React, { useState } from 'react';
import logoImage from '../resources/logo (2).png';

const LoginForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (isSignUp === false) {
      props.onLogin(username, password);
    }

    if (isSignUp === true) {
      props.onSignUp(username, password);
    }
  };

  const handleSignUp = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <button className="close-button" onClick={props.onClose}>
          X
        </button>
        <img src={logoImage} alt="Logo" className="logo" />

        <p id="caption">
          Sign in/up to generate your own recipe book using only what you have in your kitchen!
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
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {isSignUp ? (
            <>
              <button type="submit" className="login-button">
                Sign Up
              </button>
              <button type="button" className="login-button" onClick={handleSignUp}>
                Use an Existing Account?
              </button>
            </>
          ) : (
            <>
              <button type="submit" className="login-button">
                Login
              </button>
              <button type="button" className="login-button" onClick={handleSignUp}>
                Create New Account?
              </button>
            </>
          )
}
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
