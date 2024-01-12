// import { createStore } from 'vuex';
// import { AuthService } from '../services/AuthService';

// interface AuthState {
//     token: string | null;
//     user: { username: string } | null;
// }

// export default createStore<AuthState>({
//     state: {
//         token: null,
//         user: null,
//     },
//     getters: {
//         isAuthenticated: (state) => !!state.token,
//     },
//     actions: {
//         async login({ commit }, { username, password }) {
//             try {
//                 const { token, user } = await AuthService.login(username, password);
//                 commit('setToken', token);
//                 commit('setUser', user);
//             } catch (error) {
//                 console.error('Login error:', error);
//                 throw error; // Is there another way we can handle this error?
//             }
//         },

//         async register({ commit }, userData) {
//             try {
//                 const response = await AuthService.register(userData);
//                 console.log('Registration response:', response);
//                 // You might want to handle the registration response as needed
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 throw error; // Is there another way we can handle this error?
//             }
//         },

//         logout({ commit }) {
//             commit('setToken', null);
//             commit('setUser', null);
//         },
//     },
//     mutations: {
//         setToken(state, token) {
//             state.token = token;
//         },

//         setUser(state, user) {
//             state.user = user;
//         },
//     },
// });
// ==============================================================================================================
// ++++++++++++++++++++++++++++++++++code below was copied from Team Doomity++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// import type { RetryAxiosRequestConfig } from '@/config/axios';
// import { authService } from '@/services/authService';
// import type { LoginDto, User } from '@/types';
// import { type SuccessResponse } from '@/utils/makeRequest';
// import { objectsHaveSameKeys } from '@/utils/objectsHaveSameKeys';
// import axios, { AxiosError } from 'axios';
// import { defineStore } from 'pinia';
// import { ref } from 'vue';
// import { useRouter } from 'vue-router';

// export const useAuthStore = defineStore('auth', () => {
//   const router = useRouter();
//   const emptyUser: User = {
//     username: '',
//     roles: [],
//   };
//   const user = ref<User>(emptyUser);
//   loadUserFromLocalStorage();
//   const authError = ref('');

//   async function login(loginDto: LoginDto) {
//     const response = await authService.login(loginDto);

//     if (response.type === 'success') {
//       successfulLoginActions(response);
//     } else {
//       authError.value = response.error;
//     }
//   }

//   function successfulLoginActions(response: SuccessResponse) {
//     const responseUser = {
//       username: response.data.username,
//       roles: response.data.roles,
//     };
//     user.value = responseUser;
//     localStorage.setItem('user', JSON.stringify(responseUser));
//     localStorage.setItem('accessToken', response.data.accessToken);
//     localStorage.setItem('refreshToken', response.data.refreshToken);

//     router.push({ name: 'home' });
//   }

//   function logout(redirect = true) {
//     user.value = emptyUser;
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('user');
//     authService.logout();
//     if (redirect) router.push({ name: 'home' });
//   }

//   function clearAuthError() {
//     authError.value = '';
//   }

//   async function loadUserFromLocalStorage() {
//     try {
//       await attemptToRefreshToken();
//     } catch (error) {
//       console.error(error);
//     }

//     const localUser = localStorage.getItem('user');
//     if (localUser == null) return;

//     try {
//       const parsedUser = JSON.parse(localUser);
//       if (objectsHaveSameKeys(parsedUser, emptyUser)) {
//         user.value = parsedUser;
//         return;
//       }
//       logout();
//     } catch (error) {
//       logout();
//     }
//   }

//   async function attemptToRefreshToken(
//     originalRequest: RetryAxiosRequestConfig | undefined = undefined,
//   ) {
//     try {
//       const response = await authService.refreshToken();
//       if (response == null) return;
//       const { accessToken } = response.data;
//       localStorage.setItem('accessToken', accessToken);

//       if (originalRequest == null) return;

//       axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//       return axios(originalRequest);
//     } catch (_error) {
//       if (_error instanceof AxiosError && _error.response?.status === 403) {
//         logout();
//         return Promise.resolve('logout successful');
//       }
//       return Promise.reject(_error);
//     }
//   }

//   return {
//     user,
//     authError,
//     clearAuthError,
//     login,
//     logout,
//     attemptToRefreshToken,
//   };
// });