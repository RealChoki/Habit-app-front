import axios from 'axios'

const backendUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL

const apiClient = axios.create({
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
