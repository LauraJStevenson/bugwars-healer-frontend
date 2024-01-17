import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';
import type { LoginDto, User } from '../types';
import { type SuccessResponse } from '../utils/makeRequest';
import { objectsHaveSameKeys } from '../utils/objectsHaveSameKeys';
import UserService from '../services/userService';


export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const emptyUser: User = {
    username: '',
    roles: [],
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
    console.log(responseUser);
    user.value = responseUser;
    isAuthenticated.value = true;
    localStorage.setItem('user', JSON.stringify(responseUser));
    localStorage.setItem('token', response.data.token);
    console.log(localStorage.getItem('token'));

    router.push({ name: 'home' });
  }

  function logout() {
    user.value = emptyUser;
    isAuthenticated.value = false;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // Redirect to the login page with a query parameter to display log out message
    router.push({ name: 'login', query: { loggedOut: 'true' } });
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
