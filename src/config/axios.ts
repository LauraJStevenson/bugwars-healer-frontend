import { useAuthStore } from '@/stores/auth';
import axios, { type AxiosRequestConfig } from 'axios';

export interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export function configureAxios() {
  axios.defaults.baseURL = import.meta.env.VITE_REMOTE_API;
  //When we deploy to render we can use this as an environment variable, create .env file in root directory
  //vite will package the project into vanilla javascript
  axios.defaults.headers['Content-Type'] = 'application/json';


}