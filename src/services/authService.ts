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
