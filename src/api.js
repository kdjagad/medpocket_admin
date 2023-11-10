import axios from 'axios'

export const api_url = 'https://prod-api.medpocket.in/api/v1'
// export const api_url =
//   process.env.NODE_ENV == 'development'
//     ? 'http://localhost:5000/api/v1'
//     : 'https://prod-api.medpocket.in/api/v1'

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
