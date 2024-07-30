// services/api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);

export const fetchRecipes = () => API.get('/recipes');
export const fetchRecipe = (id) => API.get(`/recipes/${id}`);
export const createRecipe = (recipeData) => API.post('/recipes', recipeData);
export const updateRecipe = (id, recipeData) => API.put(`/recipes/${id}`, recipeData);
export const deleteRecipe = (id) => API.delete(`/recipes/${id}`);

export const addRating = (id, rating) => API.post(`/ratings/${id}/rate`, rating);
export const addReview = (id, review) => API.post(`/ratings/${id}/review`, review);
export const getReviews = (id) => API.get(`/ratings/${id}/reviews`);
