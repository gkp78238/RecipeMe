// UsersList.js
import React, { useState } from 'react';
import User from './User';
import EditForm from './EditForm';
import './UsersList.css';
import Card from './Card';
import Button from './Button';
import divider from '../resources/Divider(1).png';

const UsersList = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (userId) => {
    setIsEditing(userId);
    props.onEdit(userId)
  };

  const handleRemoveClick = (userId) => {
    props.onRemoveUser(userId);
  };

  const handleUpdateUser = (updatedUser) => {
    props.onUpdateUser(updatedUser);
    setIsEditing(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
  };
  const addRecipeHandler = () => {
    const newUser = {
      id: Math.random().toString(), 
      username: "New Recipe",
      ingredients: "Add ingredients...", 
      description: "Add Description", 
      img: ''
     
    }
    props.onAdd(newUser);
    renderRecipes();
  }
const renderRecipes = () => {
    if (props.isAuth || props.myRecipes.length > 0) {
      return props.myRecipes.map((recipe) => (
        <div key={recipe.id}>
          <User
            id={recipe.id}
            username={recipe.username}
            img={recipe.img}
            ingredients={recipe.ingredients}
            description={recipe.description}
          />
          <Button type="button" onClick={() => handleEditClick(recipe.id)}>
            Edit
          </Button>
          <Button type="button" onClick={() => handleRemoveClick(recipe.id)}>
            Remove
          </Button>
        
        </div>
      ));
    } else {
      return (
        <p style={{ fontSize: '2rem', color: '#292929', display: 'inline', textDecoration: 'underline', fontWeight: 'bold' }}>
          Log In to Add Cookbook Recipes
        </p>
      );
    }
  };

  return (
    <Card className="users">
      <img src={divider} alt="browse recipes" className="divider" />
     {props.isAuth && (
      <button type="button" onClick={addRecipeHandler} className="addButton">Add New Recipe</button>
     ) }
      {renderRecipes()}
    </Card>
  );
};

export default UsersList;