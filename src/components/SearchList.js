import React, { useState } from "react";
import User from './User';
import AddUser from './SearchRecipes';
import './UsersList.css';
import Card from './Card';
import Button from './Button';
import divider from '../resources/Divider.png';

const SearchList = (props) => {

    const addToPantryHandler = (event) => {
        event.preventDefault();

        const entryData = {
            name: event.currentTarget.name,
            img: event.currentTarget.img,
            ingredients: event.currentTarget.ingredients,
            description: event.currentTarget.description,
        }

        console.log(entryData);
    
        props.onSaveRecipe(entryData);
    }

    if (props.isAuth) {

    return (
            <Card className="users">
                <>
                    <img src = {divider} alt = "browse recipes" className="divider"></img>
                    {props.items.map((result) => {
                        console.log(result.name);
                        return (
                            <>
                                <User
                                id={result.id}
                                name={result.username}
                                img={result.img}
                                ingredients={result.ingredients}
                                description= {result.description}
                                />
                                <Button className = "add-button"
                                id={Math.random.toString()}
                                name={result.username}
                                img={result.img}
                                ingredients={result.ingredients}
                                description={result.description}
                                onClick={addToPantryHandler}
                                >Add to Pantry</Button>
                            </>
                            )
                        })
                    }      
                </>
            </Card>
        )
    } else {
        return (
            <Card className="users">
                <>
                <img src = {divider} alt = "browse recipes" className="divider"></img>
                    {props.items.map((result) => {
                        console.log(result);
                        return (
                            <>
                                <User
                                id={result.id}
                                name={result.username}
                                img={result.img}
                                ingredients={result.ingredients}
                                description = {result.description}
                                />
                            </>
                            )
                        })
                    }      
                </>
            </Card>
        )

    }
}

export default SearchList;