import React, { useState } from "react";
import Card from './Card';
import Button from './Button';
import './SearchRecipes.css';

const SearchRecipes = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredImg, setEnteredImg] = useState('');
  const [enteredMajor, setEnteredMajor] = useState('');

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const imgChangeHandler = (event) => {
    setEnteredImg(event.target.value);
  };

  const majorChangeHandler = (event) => {
    setEnteredMajor(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (enteredMajor == '') {
      return;
    }

    const userData = enteredMajor

    console.log(userData);

    props.onSearchWithIngredients(userData);
    
  };

  return (
    <div className="search-bar">
         <p id= "search-inst">Ingredients to Include (e.g. "Apples, Flour, Sugar")</p>
      <form id="search-form" onSubmit={submitHandler}>
         <input
          id="major"
          type="text"
          value={enteredMajor}
          onChange={majorChangeHandler}
        />
        <Button id="search-button" type="submit">Search Recipes</Button>
      </form>
    </div>
  );
};

export default SearchRecipes;
