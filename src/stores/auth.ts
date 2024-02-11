import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLocalStorage } from '@vueuse/core'; // Import useLocalStorage
import { authService } from '../services/authService';
import type { LoginDto, User } from '../types';
import { type SuccessResponse } from '../utils/makeRequest';
import { objectsHaveSameKeys } from '../utils/objectsHaveSameKeys';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const emptyUser: User = {
    username: '',
    roles: [],
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
  };

  // Replace ref with useLocalStorage for user and isAuthenticated
  const user = useLocalStorage<User>('user', emptyUser);
  const isAuthenticated = useLocalStorage<boolean>('isAuthenticated', false);
  const authError = ref('');

  function initializeAuth() {
    console.log("Initializing auth...");
    // Since we are now using useLocalStorage, the manual local storage checks and parsing are no longer necessary here.
    // The user and isAuthenticated states are directly bound to their respective local storage values.
    // Any required logic to verify or validate tokens should still be implemented as needed.
  }

  // Call initializeAuth to ensure any necessary setup or validation is performed.
  // However, in this simplified form, it might be unnecessary. Consider removing if not needed.
  initializeAuth();

  async function login(loginDto: LoginDto) {
    const response = await authService.login(loginDto);

    if (response.type === 'success') {
      const successResponse = response as SuccessResponse;
      const errorMessage = successResponse.data.errorMessage;
      if (errorMessage == null) {
        successfulLoginActions(response);
      } else {
        authError.value = errorMessage;
      }
    } else {
      authError.value = response.error;
    }
  }

  function successfulLoginActions(response: SuccessResponse) {
    const responseUser = {
      id: response.data.id,
      username: response.data.username,
      firstname: response.data.firstname,
      lastname: response.data.lastname,
      email: response.data.email,
      roles: response.data.roles,
    };

    user.value = responseUser;
    isAuthenticated.value = true;
    // Direct localStorage management for token is still required as it's not managed by useLocalStorage here
    localStorage.setItem('token', response.data.token);
    router.push({ name: 'home' });
  }

  async function logout() {
    try {
      await authService.logout();
      user.value = emptyUser;
      isAuthenticated.value = false;
      // Clear token directly from localStorage
      localStorage.removeItem('token');
      // No need to manually manage 'user' and 'isAuthenticated' in localStorage, as useLocalStorage handles it
      router.push({ name: 'login', query: { loggedOut: 'true' } });
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  function clearAuthError() {
    authError.value = '';
  }

  // Functions for managing tokens directly in localStorage
  // These could be adapted if tokens should also be managed reactively with useLocalStorage
  function setTokens(token: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  function clearTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  return {
    user,
    authError,
    clearAuthError,
    login,
    logout,
    isAuthenticated,
    setTokens,
    clearTokens,
    initializeAuth,
  };
});
