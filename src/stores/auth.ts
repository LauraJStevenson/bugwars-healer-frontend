import { defineStore } from 'pinia';
import { ref } from 'vue';
import { authService } from '../services/authService';
import type { LoginDto, User } from '../types';
import { type SuccessResponse } from '../utils/makeRequest';
import { objectsHaveSameKeys } from '../utils/objectsHaveSameKeys';

export const useAuthStore = defineStore('auth', () => {
  const emptyUser: User = {
    username: '',
    roles: [],
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    scripts: [],
  };

  const user = ref<User>(emptyUser);
  const isAuthenticated = ref<boolean>(false);

  loadUserFromLocalStorage();

  const authError = ref('');

  async function login(loginDto: LoginDto, router: any) {
    const response = await authService.login(loginDto);

    if (response.type === 'success') {

      const successResponse = response as SuccessResponse;
      const errorMessage = successResponse.data.errorMessage;
      if (errorMessage == null) {
        successfulLoginActions(response, router);
      } else {
        authError.value = errorMessage;
      }
    } else {
      authError.value = response.error;
    }
  }

  function successfulLoginActions(response: SuccessResponse, router: any) {
    const responseUser = {
      id: response.data.id,
      username: response.data.username,
      firstname: response.data.firstname,
      lastname: response.data.lastname,
      email: response.data.email,
      roles: response.data.roles,
      scripts: response.data.scripts || [],
    };

    user.value = responseUser;
    isAuthenticated.value = true;
    localStorage.setItem('user', JSON.stringify(responseUser));
    localStorage.setItem('token', response.data.token);

    router.push({ name: 'home' });
  }

  async function logout(router?: any): Promise<any> {
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

  function reset() {
    user.value = { ...emptyUser };
    isAuthenticated.value = false;
    authError.value = '';
  }

  function clearAuthError() {
    authError.value = '';
  }

  async function loadUserFromLocalStorage() {
    const localUser = localStorage.getItem('user');
    if (localUser == null) return;

    try {
      const parsedUser = JSON.parse(localUser);
      if (objectsHaveSameKeys(parsedUser, emptyUser)) {
        user.value = parsedUser;
        isAuthenticated.value = true;
        return;
      }
      logout(undefined);
    } catch (error) {
      logout(undefined);
    }
  }

  function setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  function clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  return {
    user,
    authError,
    clearAuthError,
    login,
    logout,
    isAuthenticated,
    emptyUser,
    reset,
    setTokens,
    clearTokens
  };
});
