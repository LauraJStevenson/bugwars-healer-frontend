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

  loadUserFromLocalStorage();

  const authError = ref('');

  async function login(loginDto: LoginDto) {
    const response = await authService.login(loginDto);

    if (response.type === 'success') {
      successfulLoginActions(response);
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
      logout();
    } catch (error) {
      logout();
    }
  }

  return {
    user,
    authError,
    clearAuthError,
    login,
    logout,
    isAuthenticated,
  };
});
