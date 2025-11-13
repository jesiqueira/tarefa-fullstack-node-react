// src/services/api.ts

import axios from 'axios'

// A URL VITE_API_URL é injetada no container frontend pelo docker-compose.yml
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
})

// Interceptor de Request: Adiciona o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor de Response: Trata erros de autenticação globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se for 401 Unauthorized e não for a rota de login, remove o token
    if (error.response?.status === 401 && error.config.url !== '/usuario/login') {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      // O ideal seria forçar um refresh ou logout no cliente,
      // mas o useAuth já fará isso reagindo à remoção do storage.
    }
    return Promise.reject(error)
  },
)

export default api
