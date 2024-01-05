<template>
  <div class="home-view">
    <h1>Welcome, warriors!</h1>
    <p>
      Bug Wars is an exciting battle simulator using pre-scripted bugs or bugs you can program
      yourself. For more details on how to play take a look at the 'How to Play' button on the left.
      For more information about us, checkout 'Credits'. Please log in or register to play.
    </p>

    <!--This router link needs to be modified once auth is set up to go to register when user is not logged in and to go to the game lobby when they are logged in-->
    <router-link
      to="/register"
      class="image-container"
      @mouseover="showGoButton = true"
      @mouseout="showGoButton = false"
    >
      <div class="image-overlay"></div>
      <img
        src="../../public/images/home-img.jpg"
        alt="Illustration of Bug Wars being played on a computer."
        class="computer-illustration"
      />

      <div v-if="showGoButton" class="go-button" @click="$router.push('/register')">Let's Go!</div>
    </router-link>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  text-align: center;
}

h1 {
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;
}

.image-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.computer-illustration {
  width: 50%;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: block;
  max-width: 100%;
  height: auto;
}

.image-container:hover .image-overlay {
  display: block;
}

.go-button {
  position: absolute;
  z-index: 2;
  background-color: #f77f00;
  color: #f0eeec;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.image-container:hover .go-button {
  display: flex;
}

.computer-illustration:hover {
  transform: scale(0.9);
  filter: blur(3px);
  cursor: pointer;
}

.go-button:hover {
  filter: none;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';

const showGoButton = ref(false);
</script>
