<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import RegistrationView from './views/RegistrationView.vue';
import GlobalNav from './components/GlobalNav.vue';
</script>

<template>
  <div class="app">
    <GlobalNav class="left-global-nav" />
  </div>
  <RouterView />
</template>

<style scoped>
.left-global-nav {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
}
</style>