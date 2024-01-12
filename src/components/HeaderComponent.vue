<script setup lang="ts"></script>

<template>
  <div class="header">
    <h1>Bug Wars</h1>
    <!-- <li><img src="/public/images/Logo.png" /></li> -->
  </div>
</template>

<style scoped>
.header {
  color: rgb(255, 255, 255);
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #003049;
  border-radius: 5px;
  position: fixed;
  z-index: 1000;
}

h1 {
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;
  font-size: 30px;
  background-color: #003049;
}

/* 4em works to not make the page scroll */
/* img {
  width: 4em;
} */
</style>