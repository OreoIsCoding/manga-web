import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.mangadex.org',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;