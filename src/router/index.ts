import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegistrationView from '../views/RegistrationView.vue';

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
    {
      path: '/scripteditor',
      name: 'scripteditor',
      component: () => import('../views/ScriptEditorView.vue'),
      meta: { requiresAuth: true },
    },
    //The following route is a dynamic route used from thr Settings View. It routes to the ScriptEditor View with the Script ID as a param so the user will automatically see their script in the editor.
    {
      path: '/scripteditor/:id',
      name: 'scriptEditor',
      component: () => import('../views/ScriptEditorView.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isAuthenticated()) {
//     next({ name: 'login' });
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
