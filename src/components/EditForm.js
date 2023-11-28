// EditForm.js
import React, { useState } from 'react';
import './EditForm.css';

const EditForm = ({ user, onUpdate, onCancel }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedUser);
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
            <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={editedUser.description} onChange={handleChange} />
          </label>
          <label>
            Ingredients List:
            <input type="text" name="ingredients" value={editedUser.ingredients} onChange={handleChange} />
          </label>
          <label>
            Image URL:
            <input type="text" name="img" value={editedUser.img} onChange={handleChange} />
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