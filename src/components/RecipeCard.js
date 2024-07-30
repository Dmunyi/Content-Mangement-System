// components/RecipeCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe._id}`}>
        <h2>{recipe.title}</h2>
      </Link>
      <p>{recipe.description}</p>
    </div>
  );
};

export default RecipeCard;
