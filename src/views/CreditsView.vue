<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue';
</script>

<template>
  <div class="credits">
    <!-- Font imports -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
      rel="stylesheet"
    />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
      rel="stylesheet"
    />

    <h1>Credits</h1>

    <p>Summary of who our team is.</p>

    <div class="team-card">
      <img class="card-photo" />
      <h2>Name</h2>
      <h3>Title</h3>
      <p>Contributions go here.</p>
      <ul>
        <li><a href="#">Name's LinkedIn</a></li>
        <li><a href="#">Name's Github</a></li>
      </ul>
    </div>
  </div>
</template>
  
<style>
h1 {
  font-family: 'Press Start 2P', 'Space Mono', cursive;
}
</style>
  