<template>
    <div id="login">
        
      <h2>Login Page</h2>
      <form @submit.prevent="login">

        <div class="form-input-group">
        <input type="email" id="email" placeholder="Email" v-model="formData.email" required />
      </div>

      <div class="form-input-group">
        <input type="password" id="password" placeholder="Password" v-model="formData.password" required />
      </div>
        
        <button type="submit">Login</button>
      </form>
      <p><router-link to="/register">New here? Create an account!</router-link></p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const formData = ref({
  email: '',
  password: '',
});
 
const router = useRouter();
  
  const login = () => {
    // Implement your login logic here
    console.log('Login logic', formData.value);
    // Example: Redirect to the home page after login
    router.push('/');
  };
  </script>

<style>


</style>