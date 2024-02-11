import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { configureAxios } from './config/axios';
import { useAuthStore } from './stores/auth';

configureAxios();
const app = createApp(App);

app.use(createPinia());
app.use(router);

router.isReady().then(() => {
    const authStore = useAuthStore();
    authStore.initializeAuth();
});

app.mount('#app');