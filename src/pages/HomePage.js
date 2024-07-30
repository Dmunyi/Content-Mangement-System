// pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/api';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const { data } = await fetchRecipes();
      setRecipes(data);
    };

    getRecipes();
  }, []);

  return (
    <div>
      <h1>Recipes</h1>
      {recipes.map(recipe => (
        <div key={recipe._id}>
          <Link to={`/recipe/${recipe._id}`}>{recipe.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
