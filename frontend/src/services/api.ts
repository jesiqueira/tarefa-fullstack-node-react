import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
})

export const userService = {
  async getUsers() {
    const response = await api.get('/users')
    return response.data
  },

  async getUserById(id: number) {
    const response = await api.get(`/users/${id}`)
    return response.data
  },
}

export const postService = {
  async getPosts() {
    const response = await api.get('/posts')
    return response.data
  },
}

export default api
