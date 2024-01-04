import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },

    {
      path: '/howtoplay',
      name: 'howtoplay',
      component: () => import('../views/HowToPlayView.vue'),
    },


    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
    },


    {
      path: '/gamelobby',
      name: 'gamelobby',
      component: () => import('../views/GameLobbyView.vue'),
    },
    {
      path: '/gameplay',
      name: 'gameplay',
      component: () => import('../views/GamePlayView.vue'),
    },
    {
      path: '/credits',
      name: 'credits',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreditsView.vue'),
    },
  ],
});

export default router;
