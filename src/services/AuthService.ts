// import axios from 'axios';

// const API_URL = 'https://stage-bugwars-healer.onrender.com/api/v1/bug-data';

// interface LoginResponse {
//     token: string;
//     user: {
//         username: string;
//     };
// }

// interface RegisterResponse {
//     message: string;
// }

// export const AuthService = {
//     login: async (username: string, password: string): Promise<LoginResponse> => {
//         const response = await axios.post(`${API_URL}/api/v1/login`, { username, password });
//         return response.data;
//     },

//     register: async (userData: any): Promise<RegisterResponse> => {
//         const response = await axios.post(`${API_URL}/api/v1/users`, userData);
//         return response.data;
//     },
// };
import type { LoginDto, RegisterDto } from '../types';
import { makeRequest } from '../utils/makeRequest';

import axios from 'axios';

export const authService = {
  register(registerDto: RegisterDto) {
    return makeRequest(() => axios.post('/users', registerDto), {
      successStatuses: [201],
      errorStatuses: {
        400: 'All fields are required.',
        409: (response) => response.data.message,
      },
    });
  },

  login(loginDto: LoginDto) {
    return makeRequest(() => axios.post('/login', loginDto), {
      successStatuses: [200],
      errorStatuses: {
        400: 'Username and Password cannot be blank.',
        401: 'Your login attempt failed. Please try again.',
      },
    });
  },
};
