import React from 'react';

import './Button.css';

const Button = (props) => {
  return (
    <button key={Math.random.toString()}
      className="button"
      type={props.type || 'button'}
      id={Math.random.toString()}
      name={props.name}
      img={props.img}
      major={props.major}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
