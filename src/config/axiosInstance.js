import axios from 'axios';
import { API_URL } from '../.env';

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: API_URL
});

axiosInstance.interceptors.request.use(
  config => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use((response) => { 
  return response
}, function (error) { 
  const originalRequest = error.config;

  if (error.response.status === 401 && originalRequest.url ===
`${API_URL}/Auth`) { 
      return Promise.reject(error);
  }

  if (error.response.status === 401 && !originalRequest._retry) { 

      originalRequest._retry = true;
      const refreshToken = 'xxxxxxxxxx'; // Write the  logic  or call here the function which is having the login to refresh the token.
      return axios.post(`${API_URL}/Auth`,
          {
              "refresh_token": refreshToken
          })
          .then(res => {
              if (res.status === 201) {
                  localStorage.setItem('token',res.data);
                  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                  return axios(originalRequest);
              }
          })
  }
  return Promise.reject(error);
});

export default axiosInstance;
