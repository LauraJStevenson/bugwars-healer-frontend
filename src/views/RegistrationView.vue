<template>
  <div id="registration">
    <form class="input-form" @submit.prevent="submitForm">
      <h1>Sign Up</h1>

      <div class="reg-input-group">
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="formData.username"
          required
        />
      </div>
      <p></p>
      <div class="reg-input-group">
        <input
          type="text"
          id="firstname"
          placeholder="First Name"
          v-model="formData.firstname"
          required
        />
      </div>
      <p></p>
      <div class="reg-input-group">
        <input
          type="text"
          id="lastname"
          placeholder="Last Name"
          v-model="formData.lastname"
          required
        />
      </div>
      <p></p>
      <div class="reg-input-group">
        <input type="email" id="email" placeholder="Email" v-model="formData.email" required />
      </div>
      <p></p>
      <div class="reg-input-group">
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="formData.password"
          required
        />
      </div>
      <p></p>
      <div class="reg-input-group">
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          v-model="formData.confirmPassword"
          required
        />
      </div>

      <div v-if="passwordsDoNotMatch" class="error-message">Passwords do not match</div>

      <p><button id="submitButton" type="submit" :disabled="isSubmitDisabled">Register</button></p>
      <p>
        <router-link to="/login" class="login-link">Already have an account? Login!</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formData = ref({
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const passwordsDoNotMatch = computed(
  () => formData.value.password !== formData.value.confirmPassword,
);
const isSubmitDisabled = computed(() => passwordsDoNotMatch.value);

const store = inject('store'); // Inject the store from the parent component

const submitForm = async () => {
  if (!passwordsDoNotMatch.value && store) {
    try {
      // Call store.dispatch inside the setup function
      await store.dispatch('register', formData.value);
      console.log('Registration successful');

      // Redirect to login page after registering
      router.push('/login');
    } catch (error) {
      console.error('Registration error:', error.message);
      // Display user-friendly error message to the user
      alert(error.message);
    }
  }
};

// Provide the store to child components
provide('store', store);
</script>


<style scoped>
#registration {
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
}

.error-message {
  color: #eb5757;
}

.reg-input-group input:focus {
  border: 2px #2f80ed solid;
  outline: 0;
}

a {
  color: black;
}

a:hover {
  color: #2f80ed;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}
</style>
