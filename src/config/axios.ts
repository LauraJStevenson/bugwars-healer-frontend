import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/auth';

export interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export function configureAxios() {
  const baseURL = import.meta.env.VITE_REMOTE_API;

  //When we deploy to render we can use this as an environment variable,
  //create .env file in root directory declaring variable VITE_REMOTE_API = http://localhost:8080/api/v1
  //no brackets or quotes, just simple text
  //vite will package the project into vanilla javascript

  axios.defaults.baseURL = baseURL;
  axios.defaults.headers['Content-Type'] = 'application/json';

  axios.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${baseURL}/refresh-token`, { refreshToken }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const authStore = useAuthStore();

        if (data.accessToken && refreshToken) {
          authStore.setTokens(data.accessToken, refreshToken);
        } else {
          // Handle the case where tokens are not available as expected
          console.error('Access token or refresh token is missing');
          authStore.logout(); // For instance, logout the user or prompt re-authentication
        }

        axios.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        const authStore = useAuthStore();
        authStore.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  });
}