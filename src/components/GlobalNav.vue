<script setup lang="ts"></script>

<template>
  <div class="global-nav-bar">
    <ul>
      <li><img src="../../public/images/img-placeholder.svg" /></li>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/GameLobby">Play</RouterLink></li>
      <li><RouterLink to="/HowToPlay">How to Play</RouterLink></li>
      <li><RouterLink to="/credits">Credits</RouterLink></li>
      <li>
        <!--<li v-if="isLoggedIn" @click="settings">Settings</li>-->
        Settings
        <!--<RouterLink to="/Settings">Settings</RouterLink>-->
      </li>
      <li><RouterLink to="/login">Login</RouterLink></li>
      <li><RouterLink to="/register">Register</RouterLink></li>

      <!--<li v-if="isLoggedIn" @click="logout">Logout</li>
      <li v-else></li>
      <li>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </li>
      -->
    </ul>
  </div>
</template>

<style scoped>
.global-nav-bar {
  width: 125px;
  color: black;
  height: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

li {
  text-decoration: none;
  color: black;
}

a {
  color: black;
  text-decoration: none;
}
</style>