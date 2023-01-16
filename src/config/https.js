import axios from 'axios'
import LocalStorageService from './services/storage/localstorageservice'
import router from './router/router'

const localStorageService = LocalStorageService.getService()

axios.interceptors.response.use(
    response => {
      return response
    },
    function (error) {
      const originalRequest = error.config
  
      if (
        error.response.status === 401 &&
        originalRequest.url === 'https://localhost:44337/api/reg'
      ) {
        router.push('/login')
        return Promise.reject(error)
      }
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = localStorageService.getRefreshToken()
        return axios
          .post('/auth/token', {
            refresh_token: refreshToken
          })
          .then(res => {
            if (res.status === 201) {
              localStorageService.setToken(res.data)
              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + localStorageService.getAccessToken()
              return axios(originalRequest)
            }
          })
      }
      return Promise.reject(error)
    }
  )