// EditForm.js

import React, { useState } from 'react';

const EditForm = ({ user, onUpdate, onCancel }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the updated user data to the parent component
    onUpdate(editedUser);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Recipe Name:
        <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
      </label>
      <label>
        Recipe Description
      </label>
      {/* Add similar input fields for other properties */}
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditForm;