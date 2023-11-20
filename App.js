import React, { useState } from 'react';
import User from './components/User';
import SearchRecipes from './components/SearchRecipes';
import Hdr from './components/Hdr';
import Card from './components/Card';
import UsersList from './components/UsersList';
import SearchList from './components/SearchList';
import axios from 'axios';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [search, setSearch] = useState([
    {
      username: 'Black Bean Chocolate Cake',
      img: 'https://www.mysugarfreekitchen.com/wp-content/uploads/2021/02/Chocolate-Black-Bean-Cake-Makeover-20.jpg',
      major: 'Black Beans, Devils Food Cake Mix',
      id: Math.random().toString()
    },
    {
      username: 'Cheesy Mexican Nacho Stacks',
      img: 'https://spoonacular.com/recipeImages/590388-312x231.jpg',
      major: 'Tortilla Chips, Black Beans, Shreaded Cheese',
      id: Math.random().toString()
    },
    {
      username: 'Refried Black Bean Cakes',
      img: 'https://spoonacular.com/recipeImages/263116-312x231.jpg',
      major: 'Black Beans, Cornmeal',
      id: Math.random().toString()
    }
  ]);

  const [users, setUsers] = useState([
    /*
    {
      username: 'Hatsune Miku',
      img: 'https://i0.wp.com/www.michigandaily.com/wp-content/uploads/2023/01/dailymiku.png?resize=300%2C300&ssl=1',
      major: 'Vocal Performance',
      id: Math.random().toString()
    },
    {
      username: 'Bartz Klauser',
      img: 'https://pbs.twimg.com/profile_images/644018357684019200/kfwZ9aaL_400x400.jpg',
      major: 'Forestry Sciences',
      id: Math.random().toString()
    }
    */
  ]);

  const saveRecipeHandler = (entryData) => {
    const recipeInQuestion = search.find(({username}) => username === entryData.name);

    const newImage = recipeInQuestion.img;
    const newIngredients = recipeInQuestion.major;

    console.log("LOOK HEREEEE: " + newImage);
    console.log("AND HEREEEE: " + newIngredients);

    const userData = {
      username: entryData.name,
      img: newImage,
      major: newIngredients,
      id: Math.random().toString()
    };

    //use prevState

    setUsers((prevState) => {
      return [...prevState, userData];
    });

    console.log(users);
  }

  const loginHandler = () => {
    if (loggedIn) {setLoggedIn(false)}
    else setLoggedIn(true)
  }

  const searchHandler = (enteredUserData) => {
      const axios = require('axios');

      const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
        params: {
          ingredients: enteredUserData,
          ranking: '1',
          ignorePantry: 'true',
          number: '4'
        },
        headers: {
          'X-RapidAPI-Key': '324eaf270bmsh955b8dc3f439d1cp1ba680jsn50324fdab7cb',
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };

      const formatSearch = (result) => {
        const foodname = result.title;
        const image = result.image;
        const ingredients = result.usedingredients + ', ' + result.missedingredients;

        const recipe = {
          username: foodname,
          img: image,
          major: ingredients
        }

        return recipe;

        }

      /////Why is searchResults undefined?
      axios.request(options)
        .then((response) => {
          setSearch((response) => response.data.map((result) => {formatSearch(result)}))
        })
        .catch((error) => console.error(error));
        
  };


  return (
    <div>
      <Hdr isAuth={loggedIn} onLogin={loginHandler}/>
      <SearchRecipes onSearchWithIngredients={searchHandler}/>
      <div style={{display: 'flex'}}>
        <SearchList isAuth={loggedIn} items={search} onSaveRecipe={saveRecipeHandler} />
        <UsersList isAuth={loggedIn} items={users} />
      </div>
    </div>
  );
}

export default App;
