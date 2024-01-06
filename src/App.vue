<script setup lang="ts">
import GlobalNav from './components/GlobalNav.vue';
import Header from './components/HeaderComponent.vue';

</script>

<template>
  <div class="app">
    <div class="header-container">
      <Header />
    </div>
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
  height: 100vh;
  display: grid;
  margin: 0;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'nav header'
    'nav content-container';
}

.header-container {
  height: 100%;
  grid-area: header;
  border: 1px solid black;
  margin-top: 0;
  margin-bottom: 0;
  height: 80px;
}

.nav-container {
  grid-area: nav;
  padding: 0;
  margin: 0;
  width: 150px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.content-container {
  grid-area: content-container;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
