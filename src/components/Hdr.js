// Hdr.js
import React, { useState } from 'react';
import Button from '../../src/components/Button';
import LoginForm from './LoginForm';
import './Hdr.css';

const Hdr = ({ isAuth, onLoginSuccess, onLogout }) => {
  const [showLogin, setShowLogin] = useState(false);

  const loginButtonHandler = () => {
    setShowLogin(true);
  };

  const closeLoginHandler = () => {
    setShowLogin(false);
  };

  const loginSuccessHandler = () => {
    onLoginSuccess(true);
    setShowLogin(false);
  };

  const signOutHandler = () => {
    onLogout(false);
   
  };

  return (
    <div className="hdr">
      <h1>RecipeMe!</h1>
      {isAuth ? (
        <Button onClick={signOutHandler}>Sign Out</Button>
      ) : (
        <Button onClick={loginButtonHandler}>Login</Button>
      )}
      {showLogin && (
        <div className="overlay">
          <div className="login-overlay">
            <LoginForm onClose={closeLoginHandler} onLoginSuccess={loginSuccessHandler} />
          </div>
        </div>
      )}
      {isAuth && <div>You are logged in!</div>}
    </div>
  );
};

export default Hdr;
