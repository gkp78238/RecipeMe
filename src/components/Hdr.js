// Hdr.js
import React, { useState } from 'react';
import Button from '../../src/components/Button';
import LoginForm from './LoginForm';
import './Hdr.css';

const Hdr = ({ isAuth, onLoginSuccess, onLogout, onLogin, onSignUp }) => {
  const [showLogin, setShowLogin] = useState(false);

  const loginButtonHandler = () => {
    setShowLogin(true);
  };

  const closeLoginHandler = () => {
    setShowLogin(false);
  };

  const liftLoginDataHandler = (username, password) => {
    setShowLogin(false);
    onLogin(username, password)
  };

  const liftSignUpDataHandler = (username, password) => {
    setShowLogin(false);
    onSignUp(username, password)
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
            <LoginForm onClose={closeLoginHandler} onLogin={liftLoginDataHandler} onSignUp={liftSignUpDataHandler}/>
          </div>
        </div>
      )}
      {isAuth && <div>You are logged in!</div>}
    </div>
  );
};

export default Hdr;
