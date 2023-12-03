// UsersList.js
import React, { useState } from 'react';
import User from './User';
import EditForm from './EditForm';
import './UsersList.css';
import Card from './Card';
import Button from './Button';
import divider from '../resources/Divider (1).png';

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
const renderRecipes = () => {
    if (props.isAuth && props.myRecipes.length > 0) {
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
          {isEditing === recipe.id && (
            <EditForm
              user={recipe}
              onUpdate={handleUpdateUser}
              onCancel={handleCancelEdit}
              onEdit={props.onEdit}  // Pass the handleEditRecipe function
              onClose={props.onClose}
            />
          )}
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
      {renderRecipes()}
    </Card>
  );
};

export default UsersList;