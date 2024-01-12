import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import LoginView from '../views/LoginView.vue';
import { useAuthStore } from '../stores/auth';

const isAuthenticated = () => {
  const authStore = useAuthStore();
  return authStore.isAuthenticated;
};

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
      meta: { requiresAuth: true },
    },


    {
      path: '/gamelobby',
      name: 'gamelobby',
      component: () => import('../views/GameLobbyView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/gameplay',
      name: 'gameplay',
      component: () => import('../views/GamePlayView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/credits',
      name: 'credits',
      component: () => import('../views/CreditsView.vue'),
    },
    {
      path: '/behindthescenes',
      name: 'behindthescenes',
      component: () => import('../views/BehindTheScenesView.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
