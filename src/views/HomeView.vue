<template>
  <div class="home-view">
    <h1>Welcome, {{ isAuthenticated ? user.username : 'warriors' }}!</h1>
    <p>
      Bug Wars is an exciting battle simulator using pre-scripted bugs or bugs you can program
      yourself. For more details on how to play take a look at the 'How to Play' button on the left.
      For more information about us, checkout 'Credits'. Please log in or register to play.
    </p>

    <router-link
      :to="isAuthenticated ? '/gamelobby' : '/login'"
      class="image-container"
      @mouseenter="showGoButton = true"
      @mouseleave="showGoButton = false"
    >
      <div class="image-overlay"></div>
      <img
        src="../../public/images/home-img.jpg"
        alt="Illustration of Bug Wars being played on a computer."
        class="computer-illustration"
      />

      <div
        v-if="showGoButton"
        class="go-button"
        @click="$router.push(isAuthenticated ? '/gamelobby' : '/login')"
      >
        Let's Go!
      </div>
    </router-link>
  </div>
</template>



<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';

const showGoButton = ref(false);

const { isAuthenticated, user } = useAuthStore();
</script>


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
  /* position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 50%;
}

.computer-illustration {
  width: 100%;
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

.image-container:hover .computer-illustration {
  transform: scale(0.9);
  filter: blur(3px);
}

.go-button:hover {
  filter: none;
}

p {
  text-align: center;
}
</style>
