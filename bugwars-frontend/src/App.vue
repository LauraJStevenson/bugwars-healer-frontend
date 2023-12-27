<!-- App.vue -->
<template>
  <div id="app">
    <router-view></router-view>
    <component :is="currentView" v-bind="viewProps"></component>
  </div>
</template>

<script>
import RegistrationForm from './views/RegistrationForm.vue';
import RegistrationSuccess from './views/RegistrationSuccess.vue';

export default {
  name: 'App',
  data() {
    return {
      currentView: 'RegistrationForm',
      viewProps: {},
    };
  },
  methods: {
    showRegistrationSuccess(username) {
      this.currentView = 'RegistrationSuccess';
      this.viewProps = { username };
    },
    showRegistrationForm() {
      this.currentView = 'RegistrationForm';
      this.viewProps = {};
    },
  },
  components: {
    RegistrationForm,
    RegistrationSuccess,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Material+Icons');

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

