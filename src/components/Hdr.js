import React, { useState } from 'react';
import Button from '../../src/components/Button';
import LoginForm from './LoginForm';
import './Hdr.css';

const Hdr = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const loginButtonHandler = () => {
    setShowLogin(true);
  };

  const closeLoginHandler = () => {
    setShowLogin(false);
  };

  const loginSuccessHandler = () => {
    setIsAuth(true);
    setShowLogin(false);
  };

  const signOutHandler = () => {
    setIsAuth(false);
    // Additional logic for sign-out, if needed
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