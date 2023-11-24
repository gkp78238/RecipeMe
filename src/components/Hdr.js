import React, { useState } from 'react';
import Button from '../../src/components/Button';
import LoginForm from './LoginForm';
import './Hdr.css';


const Hdr = (props) => {
  const [showLogin, setShowLogin] = useState(false);

  const loginButtonHandler = () => {
    setShowLogin(!showLogin);
  };

  const closeLoginHandler = () => {
    setShowLogin(false);
  };

  return (
    <div className="hdr">
      <h1>RecipeMe!</h1>

      {props.isAuth ? (
        <Button onClick={props.onLogout}>Sign Out</Button>
      ) : (
        <Button onClick={loginButtonHandler}>Login</Button>
      )}

      {showLogin && (
        <div className="overlay" onClick={closeLoginHandler}>
          <div className="login-overlay">
            <LoginForm onClose={closeLoginHandler} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hdr;