import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

// Login API call
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

// Register API call
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
  }
};

// Fetch recipes API call
export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recipes/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};

// Fetch recipe by ID API call
export const fetchRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
  }
};
