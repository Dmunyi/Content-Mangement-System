// pages/RecipePage.js
import React, { useEffect, useState } from 'react';
import { fetchRecipe, addRating, addReview, getReviews } from '../services/api';

const RecipePage = ({ match }) => {
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getRecipe = async () => {
      const { data } = await fetchRecipe(match.params.id);
      setRecipe(data);
    };

    const loadReviews = async () => {
      const { data } = await getReviews(match.params.id);
      setReviews(data);
    };

    getRecipe();
    loadReviews();
  }, [match.params.id]);

  const handleRating = async () => {
    try {
      await addRating(match.params.id, { rating });
    } catch (err) {
      console.error(err);
    }
  };

  const handleReview = async () => {
    try {
      await addReview(match.params.id, { review });
      setReview('');
      setReviews([...reviews, { review }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {recipe && (
        <div>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <ul>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          <h3>Rating</h3>
          <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} max="5" min="1" />
          <button onClick={handleRating}>Rate</button>
          <h3>Reviews</h3>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} />
          <button onClick={handleReview}>Submit Review</button>
          {reviews.map((r, index) => (
            <div key={index}>
              <p>{r.review}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipePage;
