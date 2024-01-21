<template>
  <div class="how-to-play-card">
    <img class="help-img" src="..\..\public\images\Blue-Bug.png" />
    <div>
      <h1>How To Play</h1>
      <h2>Easy Mode</h2>
      <p>Step 1: Choose your bug</p>
      <p>Step 2: Choose your enemy</p>
      <p>Step 3: Fight!</p>
      <h2>Advanced Mode</h2>
      <p>Step 1: Choose your bug</p>
      <p>Step 2: Write your script</p>
      <p>Step 3: Choose your enemy</p>
      <p>Step 4: Fight!</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.how-to-play-card {
  border: 2px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 15px;
  width: 345px;
  height: 720px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

h1 {
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;
  font-size: 25px;
  text-align: center;
}
h2 {
  text-align: center;
}
p {
  text-align: left;
}
.help-img {
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 5px;

  margin: 5px;
}
</style>
