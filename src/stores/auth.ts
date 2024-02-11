import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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

  const user = ref<User>(emptyUser);
  const isAuthenticated = ref<boolean>(false);
  const authError = ref('');


  function initializeAuth() {
    console.log("Initializing auth...");

    const token = localStorage.getItem('token');
    const localUser = localStorage.getItem('user');

    console.log("Loaded token: ", token);
    console.log("Loaded user: ", localUser);

    if (token && localUser) {
      try {
        const parsedUser = JSON.parse(localUser);
        if (objectsHaveSameKeys(parsedUser, emptyUser)) {
          user.value = parsedUser;
          isAuthenticated.value = true;
        } else {
          logout();
        }
      } catch (error) {
        console.log("No token or user found in localStorage.");
        console.error("Error parsing user from localStorage:", error);
        logout();
      }
    }
  }

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

    // console.log(responseUser); //For debugging purposes only
    user.value = responseUser;
    isAuthenticated.value = true;
    localStorage.setItem('user', JSON.stringify(responseUser));
    localStorage.setItem('token', response.data.token);

    router.push({ name: 'home' });
  }

  async function logout(): Promise<any> {
    try {
      await authService.logout();

      user.value = emptyUser;
      isAuthenticated.value = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      router.push({ name: 'login', query: { loggedOut: 'true' } });
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  function clearAuthError() {
    authError.value = '';
  }

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
    initializeAuth
  };
});
