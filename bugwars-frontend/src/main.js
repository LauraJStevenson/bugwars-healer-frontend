import { createApp } from 'vue';
import App from './App.vue';
import RegistrationForm from './views/RegistrationForm.vue';
import LoginForm from './views/LoginForm.vue';
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  { path: '/', component: RegistrationForm },
  { path: '/login', name: 'login', component: LoginForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');


