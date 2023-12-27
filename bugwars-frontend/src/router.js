import { createRouter, createWebHistory } from 'vue-router';
import RegistrationForm from './views/RegistrationForm.vue';
import LoginForm from './views/LoginForm.vue';

const routes = [
  { path: '/register', name: 'register', component: RegistrationForm },
  { path: '/login', name: 'login', component: LoginForm },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;