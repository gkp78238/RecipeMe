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
            major: event.currentTarget.major,
            age: event.currentTarget.age,
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
                                major={result.major}
                                age= {result.age}
                                />
                                <Button className = "add-button"
                                id={Math.random.toString()}
                                name={result.username}
                                img={result.img}
                                major={result.major}
                                age={result.age}
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
                                major={result.major}
                                age = {result.age}
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