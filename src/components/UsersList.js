// UsersList.js

import React, { useState } from 'react';
import User from './User';
import EditForm from './EditForm';
import './UsersList.css';
import Card from './Card';
import Button from './Button';
import divider from '../resources/Divider (1).png';

const UsersList = (props) => {
  const [isEditing, setIsEditing] = useState(null);

  const handleEditClick = (userId) => {
    setIsEditing(userId);
  };

  const handleRemoveClick = (userId) => {
    // Handle the logic to remove the user, e.g., by calling a function passed through props
    // props.onRemoveUser(userId);
  };

  const handleUpdateUser = (updatedUser) => {
    // Handle the logic to update the user, e.g., by calling a function passed through props
    // props.onUpdateUser(updatedUser);
    setIsEditing(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
  };

  if (props.isAuth) {
    return (
      <Card className="users">
        <>
          <img src={divider} alt="browse recipes" className="divider"></img>
          {props.items.map((user) => (
            <div key={user.id}>
              <User
                id={user.id}
                name={user.username}
                img={user.img}
                major={user.major}
                age={user.age}
                onEdit={handleEditClick} // Pass the onEdit callback to User component
                onUpdate={handleUpdateUser} // Pass the onUpdate callback to User component
              />
              <Button id={user.id} type="button" onClick={() => handleRemoveClick(user.id)}>
                Remove
              </Button>
              {isEditing === user.id && (
                <EditForm user={user} onUpdate={handleUpdateUser} onCancel={handleCancelEdit} />
              )}
            </div>
          ))}
        </>
      </Card>
    );
  } else {
    return (
      <Card className="users">
        <>
          <img src={divider} alt="browse recipes" className="divider"></img>
          <p style={{ fontSize: '2rem', color: '#292929', display: 'inline', textDecoration: 'underline', fontWeight: 'bold' }}>
            Log In to Add Cookbook Recipes
          </p>
        </>
      </Card>
    );
  }
};

export default UsersList;
