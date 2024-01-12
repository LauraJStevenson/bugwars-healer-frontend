<template>
    <div id="login">
      <form class="input-form" @submit.prevent="login">
        <h1>Login</h1>
        <div class="login-input-group">
          <input type="email" id="email" placeholder="Email" v-model="formData.email" required />
        </div>
        <p></p>
        <div class="login-input-group">
          <input type="password" id="password" placeholder="Password" v-model="formData.password" required />
        </div>
  
        <p><input type="checkbox" @change="showPassword"> Show Password</p> 
  
        <p><button type="submit">Login</button></p>
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
    // Remember to implement the actual login logic here
    console.log('Login logic', formData.value);
    // Example: Redirect to the home page after login
    router.push('/');
  };
  
  const showPassword = () => {
  const x = document.getElementById("password") as HTMLInputElement;
  x.type = x.type === "password" ? "text" : "password";
};


  </script>
  
  <style>
  /* makes the card to hold the login*/
  #login {
  border: 2px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 15px;
  width: 345px;
  height: 530px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
}


/* changes the overall size and background color of the placeholders*/
  #email, #password, #username, #confirmPassword {
    height: 2.5em;
    width: 15em;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
    
  }

  /* changes the placeholder box color when clicked, ie, password, email etc*/
  .login-input-group input:focus{
    border: 2px #2f80ed solid;
    outline: 0;
  }


  a {
  color: black;
}

/* hover color for the nav links */
a:hover {
  color: #2f80ed;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

button {
  text-transform: uppercase;
  background-color: rgb(247, 171, 101);


}

button:hover {
background-color: #7acc9c;
transition: all 0.3s ease-in-out;


}



  </style>