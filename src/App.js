// App.js
import React, { useState } from 'react';
import SearchRecipes from './components/SearchRecipes';
import Hdr from './components/Hdr';
import UsersList from './components/UsersList';
import SearchList from './components/SearchList';
import axios from 'axios';

function App() {
  const initialSearch = [
    {
      username: 'Black Bean Chocolate Cake',
      img: 'https://www.mysugarfreekitchen.com/wp-content/uploads/2021/02/Chocolate-Black-Bean-Cake-Makeover-20.jpg',
      major: 'Black Beans, Devils Food Cake Mix',
      age: '15  ounces of unseasoned black beans, 5 large eggs,  1 tablespoon pure vanilla extract, .5 teaspoon sea salt, 6 tablespoons coconut oil .5 cup honey 6 tablespoons dark Dutch-processed cocoa powder 1  teaspoon aluminum-free baking powder .5 teaspoon baking soda ', 
      id: Math.random().toString()
    },
    {
      username: 'Cheesy Mexican Nacho Stacks',
      img: 'https://spoonacular.com/recipeImages/590388-312x231.jpg',
      age: 'chips, cheese, black beans, tomatoes',
      major: 'Tortilla Chips, Black Beans, Shreaded Cheese',
      id: Math.random().toString()
    },
    {
      username: 'Refried Black Bean Cakes',
      img: 'https://spoonacular.com/recipeImages/263116-312x231.jpg',
      age: 'refied black beans,',
      major: 'Black Beans, Cornmeal',
      id: Math.random().toString()
    }
  ];

  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const [users, setUsers] = useState([]);

  const saveRecipeHandler = (entryData) => {
    const recipeInQuestion = search.find(({ username }) => username === entryData.name);

    const newImage = recipeInQuestion.img;
    const newIngredients = recipeInQuestion.major;
    const newDescription = recipeInQuestion.age; 
    const userData = {
      username: entryData.name,
      img: newImage,
      major: newIngredients,
      age: newDescription,
      id: Math.random().toString()
    };

    setUsers((prevState) => [...prevState, userData]);
    console.log(users);
  };

  const loginHandler = () => {
    setLoggedIn((prevLoggedIn) => !prevLoggedIn);
  };

  const searchHandler = (enteredUserData) => {
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

   // Function to extract used ingredients(from search) and the other ingredients needed for a recipe and create a string
   function getDescriptionString(recipe) {
  const usedIngredients = recipe.usedIngredients.map(ingredient => ingredient.original);
  const unusedIngredients = recipe.missedIngredients.map(ingredient => ingredient.original); 
  return usedIngredients.concat(unusedIngredients).join('•  ');
}
function getUsedIngredientsString(recipe) {
  const usedIngredients = recipe.usedIngredients.map(ingredient => ingredient.name);
  return usedIngredients.join(', ');
}
    const formatSearch = (result) => {
      const foodname = result.title;
      const image = result.image;
      const description= getDescriptionString(result);
      const usedIngredients = getUsedIngredientsString(result);
      return {
        username: foodname,
        img: image,
        major: usedIngredients,
        age: description
      };
    };

    axios
      .request(options)
      .then((response) => {
        setSearch(response.data.map((result) => formatSearch(result)));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Hdr isAuth={loggedIn} onLoginSuccess={loginHandler} onLogout={loginHandler} />
      {loggedIn ? (
        <>
          <SearchRecipes onSearchWithIngredients={searchHandler} />
          <div style={{ display: 'flex' }}>
            <SearchList isAuth={loggedIn} items={search} onSaveRecipe={saveRecipeHandler} />
            <UsersList isAuth={loggedIn} items={users} />
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex' }}>
            <SearchList isAuth={loggedIn} items={initialSearch} onSaveRecipe={saveRecipeHandler} />
            <UsersList isAuth={loggedIn} items={users} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
