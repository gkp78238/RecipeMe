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
      description: 'This black bean cake is full of fibre, easy to make for beginner bakers with simple ingredients. Best of off, its naturally sweetened with no added sugar, has a little hit of coffee with thick luscious sugar free frosting.', 
      id: Math.random().toString()
    },
    {
      username: 'Cheesy Mexican Nacho Stacks',
      img: 'https://spoonacular.com/recipeImages/590388-312x231.jpg',
      description: 'Nachos loaded with melted shredded cheese, black beans, and all your favorite toppings!',
      ingredients: 'Tortilla Chips, Black Beans, Shredded Cheese',
      id: Math.random().toString()
    },
    {
      username: 'Refried Black Bean Cakes',
      img: 'https://spoonacular.com/recipeImages/263116-312x231.jpg',
      description: 'These pan-fried cakes are crispy on the outside (thanks to a thin coating of cornmeal) and creamy in the center. They make an excellent vegetarian meal!',
      ingredients: 'Black Beans, Cornmeal',
      id: Math.random().toString()
    }
  ];

  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const [users, setUsers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);


  const loginHandler = (username, password) => {
    //console.log('Attemped Username: ' + username);
    //console.log('Attempted Password: ' + password);
    axios
      .post('http://localhost:8080/api/accounts/login', {
          name: username,
          password: password
      })
      .then((res) => {
        console.log(res);
        console.log('Generating new Authentication Token...');

        const accountId = res.data._id;
        console.log(accountId);
        const accountName = res.data.name;
        const new_token = 'Tasty' + Math.random().toString()

        axios
          .put('http://localhost:8080/api/accounts/' + accountId, {...res, auth_token: new_token})
          .then(() => {
            console.log(new_token);
            localStorage.setItem("auth_token", new_token);
            localStorage.setItem("accountName", accountName);
            localStorage.setItem("accountId", accountId);
            setLoggedIn(true);
            console.log("login sucess!");
            fetchMyRecipes();
          })
        })
          .catch((err) => {
            console.log('Token Generation failed. ' + err.toString());
            alert('Log in failed.');
          })
      .catch((err) => {alert('Log in failed.')});
  };

  const signUpHandler = (username, password) => {
    //console.log('Attemped Username: ' + username);
    //console.log('Attempted Password: ' + password);

    axios
    .post('http://localhost:8080/api/accounts/', {
        name: username,
        password: password
    })
    .then(alert('Signup successful. \n\n Log in with your credentials to create your cookbook!'))
    .catch((err) => {alert('Signup failed.')});
  };

  const logOutHandler = () => {
    localStorage.setItem("auth_token", null);
    localStorage.setItem("accountId", null);
    setLoggedIn(false); 
    setMyRecipes([]);
  };
  const fetchMyRecipes = () => {
    
      const accountId = localStorage.getItem("accountId");
      axios.get('http://localhost:8080/api/accounts/' + accountId)
        .then((response) => {
          const currentAccount = response.data;
          setMyRecipes(currentAccount.my_recipes);
          console.log('my_recipes array:', currentAccount.my_recipes);
        })
        .catch((error) => {
          console.error('Failed to fetch account data:', error);
        });
   
  };

  /*SAVE RECIPE TO COOKBOOK*/ 
  const saveRecipeHandler = (entryData) => {
    const recipeInQuestion = search.find(({ name }) => name === entryData.name);
    const newName = recipeInQuestion.username; 
    const newImage = recipeInQuestion.img;
    const newIngredients = recipeInQuestion.ingredients;
    const newDescription =  recipeInQuestion.description;
    const userData = {
      username: newName,
      img: newImage,
      ingredients: newIngredients,
      description: newDescription,
      id: Math.random().toString()
    };
  
    // Save the recipe to my_recipes array in the authenticated user's account
    const accountId = localStorage.getItem("accountId");
  
    // Fetch the current account data
    axios.get('http://localhost:8080/api/accounts/' + accountId)
      .then((response) => {
        const currentAccount = response.data;
  
        // Update my_recipes array
        const updatedAccount = {
          ...currentAccount,
          my_recipes: [...currentAccount.my_recipes, userData],
        };
  
        // Save the updated account data
        axios.post('http://localhost:8080/api/accounts/'+ accountId, updatedAccount)
          .then(() => {
            console.log('Recipe saved to my_recipes array.');
  
            // Log the updated my_recipes array content
            console.log('Updated my_recipes array:', updatedAccount.my_recipes);
  
            // Update the local state or trigger any other necessary actions
            setUsers((prevState) => [...prevState, userData]);
            setMyRecipes(updatedAccount.my_recipes); // Update my_recipes state
          })
          .catch((error) => {
            console.error('Failed to update account data:', error);
          });
      })
      .catch((error) => {
        console.error('Failed to fetch account data:', error);
      });
  };
  /*remove Recipe From cookbook*/ 
  const removeUserHandler = (userId) => {
    setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
    const accountId = localStorage.getItem("accountId");
    axios.get('http://localhost:8080/api/accounts/' + accountId)
      .then((response) => {
        const currentAccount = response.data;

  
        // Update my_recipes array in the backend
        const updatedAccount = {
          ...currentAccount,
          my_recipes: currentAccount.my_recipes.filter(recipe => recipe.id !== userId),
        };
        const accountId = localStorage.getItem("accountId");
      const toPost = 'http://localhost:8080/api/accounts/' + accountId;
        axios.post(toPost, updatedAccount)
          .then(() => {
            console.log('User removed from my_recipes array.');
          })
          .catch((error) => {
            console.error('Failed to update account data:', error);
          });
      })
      .catch((error) => {
        console.error('Failed to fetch account data:', error);
      });
  
  };

  const openEditForm = (userId) => {
    setShowEditForm(true);
    setEditUserId(userId);
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setEditUserId(null);
  };

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
              <UsersList isAuth={loggedIn} items={users} myRecipes={myRecipes} onEdit={openEditForm} onRemoveUser={removeUserHandler} />
            </div>
            {showEditForm && (
              <EditForm
                user={users.find((user) => user.id === editUserId)}
                onUpdateUser={handleUpdateUser}
                onCancel={closeEditForm}
              />
            )}
          </>
        ) : (
          <>
            <div style={{ display: 'flex' }}>
              <SearchList isAuth={loggedIn} items={initialSearch} onSaveRecipe={saveRecipeHandler} onEdit={openEditForm} />
              <UsersList isAuth={loggedIn} items={users} myRecipes={myRecipes} onEdit={openEditForm} />
            </div>
          </>
        )}
      </div>
    );
  }
  
  export default RecipeMe;