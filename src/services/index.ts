import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  // Server
  // baseURL: 'http://144.24.84.56:8084/',
  // Develop
  baseURL: 'http://localhost:8080/',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  console.log('AccessToken:', auth.accessToken)
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

api.interceptors.response.use((res) => {
  // ApiResponse<T> 형태면 data를 한 번 더 풀어서 반환
  if (res.data && 'data' in res.data) {
    return res.data.data
  }
  return res.data
})

export default api
