import axios from 'axios';

const API_BASE_URL = import.meta.env.BACKEND_URL || 'http://localhost:5000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Required for HTTP-only cookies as mentioned in Swagger
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Standardized response data extraction
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Centralized error handling
    return Promise.reject(error.response?.data || error.message);
  }
);