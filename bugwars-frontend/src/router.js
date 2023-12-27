import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from './views/RegistrationForm.vue';
import LoginForm from './views/LoginForm.vue';

const routes = [
    { path: '/', component: RegistrationForm },
    { path: '/login', name: 'login', component: LoginForm },
    { path: '/register', name: 'register', component: RegistrationForm },
  ];

const router = createRouter({
    history: createWebHistory(),
  routes,
});

export default router;