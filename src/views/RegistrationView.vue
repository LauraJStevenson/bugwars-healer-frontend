<!-- RegistrationView.vue -->

<template>
  <div id="registration">
    
    <form class="flex-container" @submit.prevent="submitForm"> <!-- used to be called registration-form -->

      <h1>Sign Up</h1>

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

      <div v-if="passwordsDoNotMatch" class="error-message">Passwords do not match</div>

      <button id = "submitButton" type="submit" :disabled="isSubmitDisabled">Register</button>
      <p><router-link to="/login" class="login-link">Already have an account? Login!</router-link></p>
      
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';


const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const router = useRouter();
const passwordsDoNotMatch = computed(() => formData.value.password !== formData.value.confirmPassword);
const isSubmitDisabled = computed(() => passwordsDoNotMatch.value);



const submitForm = () => {
  if (!passwordsDoNotMatch.value) {
  console.log('Registration form submitted with data:', formData.value);
  // Logging the data to the console just to see what happens
  
  //Redirect to login page after registering
  router.push('/login')
  } 

};
</script>

<style scoped>

.error-message {
  color: red;
}

</style>