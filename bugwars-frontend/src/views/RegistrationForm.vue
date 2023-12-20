<!-- RegistrationForm.vue -->
<template>
    <div id="register">
      
      <form class="register-input" @submit.prevent="submitForm"> 
        <h1 class="logo">
      <span class="material-symbols-outlined my-icon"></span> Bug Wars
    </h1>
        <h2>Register</h2>
        <div class="form-input-group">
          <input type="text" id="username" placeholder="Username" v-model="formData.username" required />
        </div>
        <div class="form-input-group">
          <input type="email" id="email" placeholder="Email" v-model="formData.email" required />
        </div>
        <div class="form-input-group">
          <input type="password" id="password" placeholder="Password" v-model="formData.password" required />
        </div>
        <div class="form-input-group">
          <input type="password" id="confirmPassword" placeholder="Confirm Password" v-model="formData.confirmPassword" required />
        </div>
        <button id = "submit" type="submit">Register</button>
        <p><router-link to="/login">Already have an account? Log in</router-link></p>
      </form>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        formData: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
      };
    },
    methods: {
      submitForm() {
        // Perform form submission logic here
        this.$emit('registration-success', this.formData.username);
        console.log('Form submitted with data:', this.formData);
        // You can send the data to your server or perform other actions
        // logging the data to the console just to see what happens
      },
    },
  };
</script>

<style>
#register {
  display: flex; 
  align-items: center;
  justify-content: center; 
  flex-direction: center;
  position: absolute;
  top: 0; bottom: 0; 
  left: 0; right: 0;
  z-index: -1;
  text-align: center;
}

.register-input{
    background-color: rgba(255, 255, 255, 0.5);
    color: rgb(0, 0, 0);
    padding: 2em;
    border-radius: 5px;
    box-shadow: 1px 1px 5px 0  #4D565E;
    width: 300px;
}

.register-input input {
  padding: 7px;
  border-radius: 5px;
  border: 1px #c0c0c0 solid;
  width: 200px;
  margin: .5em;
}

.register-input input:focus {
  border: 1px #00ADEE solid;
  outline: 0;
}

.form-input-group{
    margin: 1em;
}

h1 {
   text-align: center;
   margin-top: 0;
}



</style>