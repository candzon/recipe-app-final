import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

// Login API call
export const login = async (username, password) => {
    try {
        const credentials = { username, password };
        const response = await axios.post(`${API_BASE_URL}/api/login`, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Login failed');
        } else if (error.request) {
            throw new Error('Network error. Please try again');
        } else {
            throw new Error('An error occurred. Please try again');
        }
    }
};


// Register API call
export const register = async (userData) => {
    try {
        if (userData) {
            const response = await axios.post(`${API_BASE_URL}/api/register`, userData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                return { message: "Registration successful" };
            } else {
                throw new Error('Registration failed');
            }
        }
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Registration failed');
        } else if (error.request) {
            throw new Error('Network error. Please try again');
        } else {
            throw new Error('An error occurred. Please try again');
        }
    }
};

// Fetch recipes API call
export const fetchRecipes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/recipes/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
};

// Fetch recipe by ID API call
export const fetchRecipeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipe:', error);
    }
};
