<script setup lang="ts">
import GlobalNav from './components/GlobalNav.vue';
import Header from './components/Header.vue';
</script>

<template>
  <div class="app">
    <Header />
    <GlobalNav class="left-global-nav" />
  </div>
</template>

<style scoped>
.left-global-nav {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
}
</style>