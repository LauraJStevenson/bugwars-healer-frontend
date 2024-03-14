import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { configureAxios } from './config/axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

configureAxios();
const app = createApp(App);

app.use(createPinia());
app.use(router);

library.add(faCheck, faAngleLeft, faAngleRight);
library.add(faBars);
library.add(faX);
library.add(faUserPlus);
library.add(faArrowRightFromBracket);
library.add(faArrowRightToBracket);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');