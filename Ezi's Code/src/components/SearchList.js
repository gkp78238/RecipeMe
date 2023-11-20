import React, { useState } from "react";
import User from './User';
import AddUser from './SearchRecipes';
import './UsersList.css';
import Card from './Card';
import Button from './Button';

const SearchList = (props) => {

    const addToPantryHandler = (event) => {
        event.preventDefault();

        const entryData = {
            name: event.currentTarget.name,
            img: event.currentTarget.img,
            major: event.currentTarget.major,
        }

        console.log(entryData);
    
        props.onSaveRecipe(entryData);
    }

    if (props.isAuth) {

    return (
            <Card className="users">
                <>
                    <p style={{fontSize: '2rem',color: '#292929',display: 'inline',textDecoration: 'underline',fontWeight: 'bold'}}>Recipe Results</p>
                    {props.items.map((result) => {
                        console.log(result.name);
                        return (
                            <>
                                <User
                                id={result.id}
                                name={result.username}
                                img={result.img}
                                major={result.major}
                                />
                                <Button 
                                id={Math.random.toString()}
                                name={result.username}
                                img={result.img}
                                major={result.major}
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
                    <p style={{fontSize: '2rem',color: '#292929',display: 'inline',textDecoration: 'underline',fontWeight: 'bold'}}>Recipe Results</p>
                    {props.items.map((result) => {
                        console.log(result);
                        return (
                            <>
                                <User
                                id={result.id}
                                name={result.username}
                                img={result.img}
                                major={result.major}
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