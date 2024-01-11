import type { RetryAxiosRequestConfig } from '@/config/axios';
import { authService } from '@/services/authService';
import type { LoginDto, User } from '@/types';
import { type SuccessResponse } from '@/utils/makeRequest';
import { objectsHaveSameKeys } from '@/utils/objectsHaveSameKeys';
import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const emptyUser: User = {
    username: '',
    roles: [],
  };
  const user = ref<User>(emptyUser);
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
      username: response.data.username,
      roles: response.data.roles,
    };
    console.log(responseUser);
    user.value = responseUser;
    localStorage.setItem('user', JSON.stringify(responseUser));
    localStorage.setItem('accessToken', response.data.accessToken);

    router.push({ name: 'home' });
  }

  function logout(redirect = true) {
    user.value = emptyUser;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    if (redirect) router.push({ name: 'home' });
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
    
  };
});