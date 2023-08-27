import axios from 'axios'

export const api_url = 'http://192.168.0.101:5006/api/v1'

const api = axios.create({
  baseURL: api_url,
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
