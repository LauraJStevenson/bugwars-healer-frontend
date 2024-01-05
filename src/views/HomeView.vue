<script setup lang="ts">
</script>

<template>
  <div class="home-view">
    <h1>Welcome, warriors!</h1>
    <p>
      Bug Wars is an exciting battle simulator using pre-scripted bugs or bugs you can create
      yourself. For more details on how to play take a look at the 'How to Play' button on the left.
      For more information about us, checkout 'Credits'. Please log in or register to play.
    </p>
    <span> </span>

    <p>Who will win the Bug Wars?</p>

    <!--v-if statement needs to be created for this link to go to the login page if user is not logged in and to go to the game lobby page if they are logged in.-->

    <div>
      <router-link to="/register">
        <img src="/images/home-img.jpg" alt="Illustration of a computer displaying Bug Wars." />
      </router-link>
    </div>
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
</style>

