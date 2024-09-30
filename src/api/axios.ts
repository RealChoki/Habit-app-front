import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://habit-app-back.onrender.com', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
