import Vue from 'vue';
import Vuex, { MutationTree } from 'vuex';
import axios, { AxiosResponse } from 'axios';

Vue.use(Vuex);

interface User {
    // Define the structure of the User object
}

interface State {
    message: string;
    token: string;
    user: User;
}

interface Mutations extends MutationTree<State> {
    SET_AUTH_TOKEN(state: State, token: string): void;
    SET_USER(state: State, user: User): void;
    LOGOUT(state: State): void;
    SET_MESSAGE(state: State, message: string): void;
    CLEAR_MESSAGE(state: State): void;
}

const currentToken = localStorage.getItem('token');
const currentUser = JSON.parse(localStorage.getItem('user') || 'null');

if (currentToken != null) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
}

export default new Vuex.Store<State>({
    state: {
        message: '',
        token: currentToken || '',
        user: currentUser || {},
    },
    mutations: {
        SET_AUTH_TOKEN(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        SET_USER(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        LOGOUT(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = '';
            state.user = {};
            axios.defaults.headers.common = {};
        },
        SET_MESSAGE(state, message) {
            state.message = message;
        },
        CLEAR_MESSAGE(state) {
            state.message = '';
        },
    },
});
