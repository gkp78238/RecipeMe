// User.js
import React, { useState } from 'react';
import './User.css';
import EditForm from './EditForm';

const User = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const updateUser = (updatedUser) => {
    // Log the user before editing
    console.log('User before editing:', props);

    // Pass the updated user details to the parent component
    props.onUpdateUser(updatedUser);

    // Log the user after editing
    console.log('User after editing:', updatedUser);

    // Exit the edit mode
    setIsEditing(false);
  };

  return (
    <div className="recipeCard">
      <h1 id="Title">{props.username}</h1>
      <div className="card-content">
        <img src={props.img} alt={props.username} className="circle-image" />

        <div>
          <h4 id="List-Label">Description</h4>
          <section className="description">
            <p>{props.description}</p>
          </section>
        </div>

        <div className="ingredient-section">
          <h4 id="List-Label">Ingredients Used:</h4>
          <p className="ingredient">{props.ingredients}</p>
        </div>

        {/* Render the EditForm when in edit mode */}
        {isEditing && (
          <EditForm
            user={props}
            onUpdateUser={updateUser}
            onCancel={cancelEditing}
          />
        )}
      </div>
    </div>
  );
};

export default User;

