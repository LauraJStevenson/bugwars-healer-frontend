<!-- LoginForm.vue -->
<template>
    <div id="login">
      <h1>Bug Wars Login</h1>
      <form class="login-input" @submit.prevent="submitForm">
        <h2>Login</h2>
        <div class="form-input-group">
          <input type="text" id="username" placeholder="Username" v-model="formData.username" required />
        </div>
        <div class="form-input-group">
          <input type="password" id="password" placeholder="Password" v-model="formData.password" required />
        </div>
        <button id="submit" type="submit">Login</button>
        <p><router-link :to="{ name: 'register' }">Need an account? Sign up.</router-link></p>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          username: '',
          password: '',
        },
      };
    },
    methods: {
      submitForm() {
        // Perform login form submission logic here
        this.$emit('login-success', this.formData.username);
        console.log('Login form submitted with data:', this.formData);
        // You can send the data to your server or perform other actions
        // Logging the data to the console just to see what happens
      },
    },
  };
  </script>

<style>
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  text-align: center;
}

h1 {
  text-align: center;
  margin-top: 0;
}

.login-input {
  background-color: rgba(255, 255, 255, 0.5);
  color: rgb(0, 0, 0);
  padding: 2em;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 0 #4D565E;
  width: 300px;
  margin-top: 20px;
}

.login-input input {
  padding: 7px;
  border-radius: 5px;
  border: 1px #c0c0c0 solid;
  width: 200px;
  margin: 0.5em;
}

.login-input input:focus {
  border: 1px #00ADEE solid;
  outline: 0;
}

.form-input-group {
  margin: 1em;
}

a {
  color: #356f9e;
}

a:hover {
  color: #ff6359;
  text-decoration: none;
}
</style>
