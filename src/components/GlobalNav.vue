<template>
  <div class="global-nav-bar">
    <ul>
      <li><img src="/public/images/Logo.png" /></li>

      <li><RouterLink active-class="active" to="/">Home</RouterLink></li>

      <li v-if="isAuthenticated">
        <RouterLink active-class="active" to="/gamelobby">Play</RouterLink>
      </li>

      <li><RouterLink active-class="active" to="/howtoplay">How to Play</RouterLink></li>

      <li><RouterLink active-class="active" to="/credits">Credits</RouterLink></li>

      <li>
        <RouterLink active-class="active" to="/behindthescenes">Behind the Scenes</RouterLink>
      </li>

      <li v-if="isAuthenticated">
        <RouterLink active-class="active" to="/settings">Settings</RouterLink>
      </li>

      <li v-if="!isAuthenticated">
        <RouterLink active-class="active" to="/login">Login</RouterLink>
      </li>

      <li v-if="!isAuthenticated">
        <RouterLink v-if="!isAuthenticated" active-class="active" to="/register"
          >Register</RouterLink
        >
      </li>

      <li v-if="isAuthenticated">
        <RouterLink @click="handleLogout" to="/">Logout</RouterLink>
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { useAuthStore } from '../stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
  },
  methods: {
    handleLogout() {
      this.authStore.logout();
    },
  },
};
</script>


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
  background-color: #136f63;
  border-radius: 5px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
}

li {
  text-decoration: none;
  color: black;
  text-align: center;
  background-color: #136f63;
}

a {
  color: rgb(255, 255, 255);
  text-decoration: none;
  background-color: #136f63;
}

/* hover color for the nav links */
a:hover {
  color: #f77f00;
  text-decoration: underline;
  font-weight: bold;
  margin-right: 5px;
}

/* 4em works to not make the page scroll */
img {
  width: 4em;
  background-color: #136f63;
}

.active {
  font-weight: bold;
  text-decoration: underline;
  color: #f77f00;
}
</style>
