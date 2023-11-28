
import React, { useState } from 'react';
import './User.css';
import EditForm from './EditForm';

const User = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="recipeCard">
      <h1 id="Title">{props.name}</h1>
      <div className="card-content">
        <img src={props.img} alt={props.name} className="circle-image" />

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

        {props.onEdit && (
          // Only show the "Edit" button if the onEdit prop is provided
          <>
            {isEditing ? (
              <EditForm user={props} onUpdate={props.onUpdate} onCancel={handleCancelEdit} />
            ) : (
              <button type="button" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default User;
