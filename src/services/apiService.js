import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor for authentication
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle different error statuses
      switch (error.response.status) {
        case 401:
          // Handle unauthorized
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          // Handle forbidden
          throw new Error('Access denied');
        default:
          throw new Error(error.response.data.message || 'An error occurred');
      }
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error('Error in request configuration');
    }
  }
);

export const apiService = {
  // Get questions from backend
  async getQuestions() {
    try {
      const response = await axios.get('/get-quiz');
      return response.data.questions;
    } catch { 
      throw new Error('Failed to fetch questions');
    }
  },

  // Submit quiz answers
  async submitAnswers(answers) {
    try {
      const response = await axios.post('/submit-quiz', answers);
      return response.data;
    } catch { 
      throw new Error('Failed to submit answers');
    }
  },

 
};
