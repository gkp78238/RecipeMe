import React, { useState } from 'react';
import User from './User';
import EditForm from './EditForm';
import './UsersList.css';
import Card from './Card';
import Button from './Button';
import divider from '../resources/Divider (1).png';

const UsersList = (props) => {
  const [isEditing, setIsEditing] = useState(null);

  const startEditing = (userId) => {
    setIsEditing(userId);
  };

  const handleRemoveClick = (userId) => {
    props.onRemoveUser(userId);
  };

  const updateUser = (updatedUser) => {
    props.onUpdateUser(updatedUser);
    setIsEditing(null);
  };

  const cancelEditing = () => {
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
                username={user.username}
                img={user.img}
                ingredients={user.ingredients}
                description={user.description}
                onEdit={startEditing}
              />
              <Button type="button" onClick={() => startEditing(user.id)}>
                Edit
              </Button>
              <Button type="button" onClick={() => handleRemoveClick(user.id)}>
                Remove
              </Button>
              {isEditing === user.id && (
                <EditForm user={user} onUpdateUser={updateUser} onCancel={cancelEditing} />
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

