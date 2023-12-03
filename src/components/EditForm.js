// EditForm.js
import React, { useState } from 'react';
import './EditForm.css';

const EditForm = ({ user, onUpdateUser, onCancel, myRecipes, onEdit, onClose }) => {
  const [updatedName, setUpdatedName] = useState(user.username);
  const [updatedDescription, setUpdatedDescription] = useState(user.description);
  const [updatedIngredients, setUpdatedIngredients] = useState(user.ingredients);
  const [updatedImg, setUpdatedImg] = useState(user.img);
  const handleSubmit = () => {
    const updatedUser = {
      id: user.id,
      username: updatedName,
      description: updatedDescription,
      ingredients: updatedIngredients,
      img: updatedImg,
    };

    // Call onUpdateUser to update in UsersList
    onUpdateUser(updatedUser);

    // Call onEdit to update in RecipeMe
    onEdit(updatedUser);
   
  
  };
  return (
    <div className="overlay">
      <div className="modal">
        <span className="close-btn" onClick={onCancel}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </label>
          <label>
            Ingredients List:
            <input
              type="text"
              name="ingredients"
              value={updatedIngredients}
              onChange={(e) => setUpdatedIngredients(e.target.value)}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="img"
              value={updatedImg}
              onChange={(e) => setUpdatedImg(e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
