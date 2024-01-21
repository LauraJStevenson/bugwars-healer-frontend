import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { configureAxios } from './config/axios';

configureAxios();
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

