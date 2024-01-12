<script setup lang="ts"></script>

<template>
  <div class="global-nav-bar">
    <ul>
      <li><img src="/public/images/Logo.png" /></li>

      <li><RouterLink active-class="active" to="/">Home</RouterLink></li>
      <li><RouterLink active-class="active" to="/gamelobby">Play</RouterLink></li>
      <li><RouterLink active-class="active" to="/howtoplay">How to Play</RouterLink></li>
      <li><RouterLink active-class="active" to="/credits">Credits</RouterLink></li>
      <li><RouterLink active-class="active" to="/behindthescenes">Behind the Scenes</RouterLink></li>
      <li>
        <!--<li v-if="isLoggedIn" @click="settings">Settings</li>-->
        <RouterLink active-class="active" to="/settings">Settings</RouterLink>
      </li>
      <li><RouterLink active-class="active" to="/login">Login</RouterLink></li>
      <li><RouterLink active-class="active" to="/register">Register</RouterLink></li>

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
  width: 9em;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 7px;
  border-radius: 5px;
  position: fixed;
  height: 100%;
  padding-bottom: 0;
  

  
}

ul {
  list-style: none;
  padding: 15px 15px 15px 15px;
  margin: 0;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2.41em;
  background-color: #136F63;
  border-radius: 5px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
  
}

li {
  text-decoration: none;
  color: black;
  text-align: center;
  background-color: #136F63;
  
}

a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  background-color: #136F63;
  
}

/* hover color for the nav links */
a:hover {
  color: #F77F00;
  text-decoration: underline;
  font-weight: bold;
  margin-right: 5px;

}

/* 4em works to not make the page scroll */
img {
  width: 4em;
  background-color: #136F63;
}

.active {
  font-weight: bold;
  text-decoration: underline;
  color: #F77F00;
}
</style>