import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { configureAxios } from './config/axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

configureAxios();
const app = createApp(App);

app.use(createPinia());
app.use(router);

library.add(faCheck, faAngleLeft, faAngleRight);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');