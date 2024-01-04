<script setup lang="ts"></script>

<template>
  <div class="global-nav-bar">
    <ul>
      <li><img src="#" /></li>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/GameLobby">Play</RouterLink>--></li>
      <li><RouterLink to="/HowToPlay">How to Play</RouterLink>--></li>
      <li><RouterLink to="/credits">Credits</RouterLink>--></li>
      <li>
        <!--<li v-if="isLoggedIn" @click="settings">Settings</li>-->
        Settings
        <!--<RouterLink to="/Settings">Settings</RouterLink>-->
      </li>
      <li>Login</li>
      <li>Register</li>

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
  border: 1px solid black;
}

ul {
  list-style: none;
}

li {
  text-decoration: none;
  color: black;
}

a {
  color: #f0eeec;
  text-decoration: none;
}
</style>