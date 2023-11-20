import React, { useState } from 'react';
import Button from './Button';

import './Hdr.css';

const Hdr = (props) => {

  const loginButtonHandler = (event) => {
    props.onLogin();
  }

  if (props.isAuth) { 
    return (
      <div className="hdr">
        <h1>RecipeMe!</h1>
        <Button onClick={loginButtonHandler}>Sign Out</Button>
      </div>
    );
  } else {
    return (
      <div className="hdr">
        <h1>RecipeMe!</h1>
        <Button onClick={loginButtonHandler}>Login</Button>
      </div>
    );
  }
};

export default Hdr;