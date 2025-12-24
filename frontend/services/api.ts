import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user'); // Storing user object or token
  if (user) {
    const { token } = JSON.parse(user);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
