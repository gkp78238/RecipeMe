// App.js
import React, { useState } from 'react';
import SearchRecipes from './components/SearchRecipes';
import Hdr from './components/Hdr';
import UsersList from './components/UsersList';
import SearchList from './components/SearchList';
import axios from 'axios';
import EditForm from './components/EditForm';

function RecipeMe() {
  const initialSearch = [
    {
      username: 'Black Bean Chocolate Cake',
      img: 'https://www.mysugarfreekitchen.com/wp-content/uploads/2021/02/Chocolate-Black-Bean-Cake-Makeover-20.jpg',
      ingredients: 'Black Beans, Devils Food Cake Mix',
      description: '15  ounces of unseasoned black beans, 5 large eggs,  1 tablespoon pure vanilla extract, .5 teaspoon sea salt, 6 tablespoons coconut oil .5 cup honey 6 tablespoons dark Dutch-processed cocoa powder 1  teaspoon aluminum-free baking powder .5 teaspoon baking soda ', 
      id: Math.random().toString()
    },
    {
      username: 'Cheesy Mexican Nacho Stacks',
      img: 'https://spoonacular.com/recipeImages/590388-312x231.jpg',
      description: 'chips, cheese, black beans, tomatoes',
      ingredients: 'Tortilla Chips, Black Beans, Shreaded Cheese',
      id: Math.random().toString()
    },
    {
      username: 'Refried Black Bean Cakes',
      img: 'https://spoonacular.com/recipeImages/263116-312x231.jpg',
      description: 'refried black beans,',
      ingredients: 'Black Beans, Cornmeal',
      id: Math.random().toString()
    }
  ];

  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const [users, setUsers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const saveRecipeHandler = (entryData) => {
    const recipeInQuestion = search.find(({ username }) => username === entryData.name);

    const newImage = recipeInQuestion.img;
    const newIngredients = recipeInQuestion.ingredients;
    const newDescription = recipeInQuestion.description; 
    const userData = {
      username: entryData.name,
      img: newImage,
      ingredients: newIngredients,
      description: newDescription,
      id: Math.random().toString()
    };

    setUsers((prevState) => [...prevState, userData]);
    console.log(users);
  };

  const loginHandler = (username, password) => {
    console.log('Attemped Username: ' + username);
    console.log('Attempted Password: ' + password);
    axios
      .post('http://localhost:8080/api/accounts/login', {
          name: username,
          password: password
      })
      .then((res) => {
        console.log(res);
        console.log('Generating new Authentication Token...');

        const accountId = res.data._id;
        const new_token = 'Tasty' + Math.random().toString()

        axios
          .put('http://localhost:8080/api/accounts/' + accountId, {...res, auth_token: new_token})
          .then(() => {
            console.log(new_token);
            localStorage.setItem("auth_token", new_token);
            localStorage.setItem("accountId", accountId);
            setLoggedIn(true)
          })})
          .catch((err) => {
            console.log('Token Generation failed. ' + err.toString());
            alert('Log in failed.');
          })
      .catch((err) => {alert('Log in failed.')});
  };

  const signUpHandler = (username, password) => {
    console.log('Attemped Username: ' + username);
    console.log('Attempted Password: ' + password);

    axios
    .post('http://localhost:8080/api/accounts/', {
        name: username,
        password: password
    })
    .then(loginHandler(username, password))
    .catch((err) => {alert('Signup failed.')});
  };

  const logOutHandler = () => {
    localStorage.setItem("auth_token", null);
    localStorage.setItem("accountId", null);
    setLoggedIn(false)
  };

        // Function to open the edit form with the user ID
        const openEditForm = (userId) => {
          setShowEditForm(true);
          setEditUserId(userId);
        };
      
        // Function to close the edit form
        const closeEditForm = () => {
          setShowEditForm(false);
          setEditUserId(null);
        };
      
        // Function to handle updating a user's information in the state
        const handleUpdateUser = (updatedUser) => {
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === updatedUser.id ? { ...user, ...updatedUser } : user))
          );
          closeEditForm();
        };

  const searchHandler = (enteredUserData) => {
    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        ingredients: enteredUserData,
        ranking: '1',
        ignorePantry: 'true',
        number: '5'
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
        ingredients: usedIngredients,
        description: description
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
        <Hdr isAuth={loggedIn} onLogin={loginHandler} onSignUp={signUpHandler} onLogout={logOutHandler} />
        {loggedIn ? (
          <>
            <SearchRecipes onSearchWithIngredients={searchHandler} />
            <div style={{ display: 'flex' }}>
              <SearchList isAuth={loggedIn} items={search} onSaveRecipe={saveRecipeHandler} onEdit={openEditForm} />
              <UsersList isAuth={loggedIn} items={users} onEdit={openEditForm} />
            </div>
            {showEditForm && (
              <EditForm
                user={users.find((user) => user.id === editUserId)}
                onUpdate={handleUpdateUser}
                onCancel={closeEditForm}
              />
            )}
          </>
        ) : (
          <>
            <div style={{ display: 'flex' }}>
              <SearchList isAuth={loggedIn} items={initialSearch} onSaveRecipe={saveRecipeHandler} onEdit={openEditForm} />
              <UsersList isAuth={loggedIn} items={users} onEdit={openEditForm} />
            </div>
          </>
        )}
      </div>
    );
}

export default RecipeMe;
