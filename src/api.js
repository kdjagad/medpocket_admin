import axios from 'axios'

export const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${baseURL}/api/v1`,
})
api.interceptors.request.use(
  async (config) => {
    const token = await sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

export default api
