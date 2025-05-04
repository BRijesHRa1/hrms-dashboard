import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('jwtToken', response.data.jwtToken);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userName', response.data.name);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed', success: false };
    }
  },
  
  signup: async (name, email, password) => {
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed', success: false };
    }
  },
  
  logout: () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('jwtToken');
  }
};

export default api; 