import React from "react";
import User from './User';
import './UsersList.css';
import Card from './Card';
import Button from './Button';
import divider from '../resources/Divider.png';

const SearchList = (props) => {
  const { isAuth, items, onSaveRecipe } = props;

  const addToBookHandler = (result) => {
    const entryData = {
      username: result.username,
      img: result.img,
      ingredients: result.ingredients,
      description: result.description,
      id: result.id // You should include a unique identifier for the user
    };

    console.log("Entry Data:", entryData);
    onSaveRecipe(entryData);
  };

  return (
    <Card className="users">
      <>
        <img src={divider} alt="browse recipes" className="divider" />
        {items.map((result) => (
          <div key={result.id}>
            <User
              id={result.id}
              username={result.username}
              img={result.img}
              ingredients={result.ingredients}
              description={result.description}
            />
            {isAuth && (
              <Button
                className="add-button"
                onClick={() => addToBookHandler(result)}
              >
                Save to My Book
              </Button>
            )}
          </div>
        ))}
      </>
    </Card>
  );
};

export default SearchList;