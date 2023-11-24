import React from 'react';
import './User.css';

const User = props => {
    return (    
        <div className="card">
            <h1 id="Title">{props.name}</h1>
            <div className="card-content">
                <img src={props.img} alt={props.name} className="circle-image" />
                <section className="description">
                    <p>{props.name}</p>
                </section>
                <div className="ingredient-section">
                    <h4 id="List-Label">Ingredients:</h4>
                    <p className = "ingredient">{props.major}</p>
                </div>
                <button>Add To Book</button>
            </div>
        </div>
    );
};

export default User;
