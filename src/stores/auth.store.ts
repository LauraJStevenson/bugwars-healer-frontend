import { createStore } from 'vuex';
import { AuthService } from '../services/AuthService';

interface AuthState {
    token: string | null;
    user: { username: string } | null;
}

export default createStore<AuthState>({
    state: {
        token: null,
        user: null,
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async login({ commit }, { username, password }) {
            try {
                const { token, user } = await AuthService.login(username, password);
                commit('setToken', token);
                commit('setUser', user);
            } catch (error) {
                console.error('Login error:', error);
                throw error; // Is there another way we can handle this error?
            }
        },

        async register({ commit }, userData) {
            try {
                const response = await AuthService.register(userData);
                console.log('Registration response:', response);
                // You might want to handle the registration response as needed
            } catch (error) {
                console.error('Registration error:', error);
                throw error; // Is there another way we can handle this error?
            }
        },

        logout({ commit }) {
            commit('setToken', null);
            commit('setUser', null);
        },
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },

        setUser(state, user) {
            state.user = user;
        },
    },
});
