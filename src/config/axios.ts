import axios, { type AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../stores/auth';

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface FailedRequestQueueItem {
  config: AxiosRequestConfig;
  resolve: (token: string) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequestQueueItem[] = [];

const processQueue = (error: string | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (!prom.config.headers) {
      prom.config.headers = {};
    }

    if (error) {
      prom.reject(new Error(error));
    } else if (token) {
      prom.config.headers['Authorization'] = `Bearer ${token}`;
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export function configureAxios() {
  const baseURL = import.meta.env.VITE_REMOTE_API;

  axios.defaults.baseURL = baseURL;
  axios.defaults.headers['Content-Type'] = 'application/json';

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            config: originalRequest,
            resolve: (newToken: string) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
              resolve(axios(originalRequest));
            },
            reject
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      return new Promise<void>((resolve, reject) => {
        axios.post(`${baseURL}/refresh-token`, { refreshToken }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(({ data }) => {
          const authStore = useAuthStore();
          if (data.token && refreshToken) {
            authStore.setTokens(data.token, refreshToken);
            localStorage.setItem('token', data.token);
            axios.defaults.headers['Authorization'] = `Bearer ${data.token}`;
            processQueue(null, data.token);
            resolve();
          } else {
            processQueue('Access token or refresh token is missing', null);
            authStore.logout();
            reject(new Error('Access token or refresh token is missing'));
          }
        }).catch(refreshError => {
          const errorMessage = refreshError instanceof Error ? refreshError.message : String(refreshError);
          processQueue(errorMessage, null);
          const authStore = useAuthStore();
          authStore.logout();
        }).finally(() => {
          isRefreshing = false;
        });
      });
    }

    return Promise.reject(error);
  });
}
