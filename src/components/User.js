import React from 'react';
import './User.css';

const User = props => {
    return (    
        <div className="recipeCard">
            <h1 id="Title">{props.name}</h1>
            <div className="card-content">
                <img src={props.img} alt={props.name} className="circle-image" />
              
              < div>
              <h4 id="List-Label">Description</h4>
                <section className="description">
                    <p>{props.age}</p>
                </section>
                </div>
                <div className="ingredient-section">
                    <h4 id="List-Label">Ingredients Used:</h4>
                    <p className = "ingredient">{props.major}</p>
                </div>

            </div>
        </div>
    );
};

export default User;
