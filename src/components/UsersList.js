import React, { useState } from "react";
import User from './/User';
import AddUser from './SearchRecipes';
import './UsersList.css';
import Card from './Card';
import Button from './Button';
import divider from '../resources/Divider (1).png';
const UsersList = (props) => {
    if (props.isAuth) {
        return (
            <Card className="users">
                <>
                <img src = {divider} alt = "browse recipes" className="divider"></img>
                    {props.items.map((user) => {
                        return (
                            <>
                                <User
                                id={user.id}
                                name={user.username}
                                img={user.img}
                                major={user.major}
                                />
                                <Button id={Math.random.toString()} type="submit">Edit</Button>
                                <Button id={Math.random.toString()} type="submit">Remove</Button>
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
                    <p style={{fontSize: '2rem',color: '#292929',display: 'inline',textDecoration: 'underline',fontWeight: 'bold'}}>Log In to Add Cookbook Recipes</p>
                </>
            </Card>
        )
    }
}

export default UsersList;