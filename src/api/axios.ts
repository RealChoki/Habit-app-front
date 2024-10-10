import axios from 'axios'

// const mongoUri = process.env.MONGODB_URI;
const mongoUri = 'http://localhost:5000'

const apiClient = axios.create({
  baseURL: mongoUri,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
