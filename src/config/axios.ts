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
    // Ensure headers exist on the config object
    if (!prom.config.headers) {
      prom.config.headers = {};
    }

    if (error) {
      prom.reject(new Error(error));
    } else if (token) {
      // Now we're sure headers is not undefined
      prom.config.headers['Authorization'] = `Bearer ${token}`;
      prom.resolve(token); // Resolve the promise with the new token
    }
  });

  failedQueue = []; // Clear the queue once processed
};

export function configureAxios() {
  const baseURL = import.meta.env.VITE_REMOTE_API;

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
          if (data.accessToken && refreshToken) {
            authStore.setTokens(data.accessToken, refreshToken); // Update store
            localStorage.setItem('accessToken', data.accessToken); // Update local storage
            axios.defaults.headers['Authorization'] = `Bearer ${data.accessToken}`; // Update axios header globally
            processQueue(null, data.accessToken); // Process all queued requests with the new token
            resolve();
          } else {
            processQueue('Access token or refresh token is missing', null); // Reject all queued requests
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
