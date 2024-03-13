<script setup lang="ts">
import GlobalNav from './components/GlobalNav.vue';

</script>

<template>
  <div class="app">
    <div class="nav-container">
      <GlobalNav />
    </div>
    <div class="content-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app {
  height: 100%;
  display: grid;
  margin: 0;
  width: 100vw;
  height: 100vh;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'nav nav'
    'content-container content-container';
}

.header-container {
  grid-area: header;
  height: 78px;
  border-left: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 7px;
  padding-right: 5px;
}

.nav-container {
  grid-area: nav;
  height: 70px;
  border-left: none;
  margin-top: 0;
  margin-bottom: 0;
}

.content-container {
  grid-area: content-container;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

@media (max-width: 768px) {

  .menu {
    display: none;
  }
}
</style>
