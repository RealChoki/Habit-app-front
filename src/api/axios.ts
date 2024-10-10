import axios from 'axios'

const backendUrl = 'http://localhost:5000'

const apiClient = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
