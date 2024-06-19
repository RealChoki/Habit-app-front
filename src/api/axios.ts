import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-backend-url.onrender.com', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
