<template>
  <div id="registration">
    <form class="input-form" @input="error = ''" @submit.prevent="submitForm">
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
      <div v-if="error" class="error-message fade-effect">{{ error }}</div>

      <p><button id="submitButton" type="submit" :disabled="isSubmitDisabled">Register</button></p>
      <p>
        <router-link to="/login" class="login-link">Already have an account? Login!</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/authService';
import type { RegisterDto } from '../types';

import { type SuccessResponse } from '../utils/makeRequest';
import {
	RegExpMatcher,
	TextCensor,
	englishDataset,
	englishRecommendedTransformers,
} from 'obscenity';

const matcher = new RegExpMatcher({
	...englishDataset.build(),
	...englishRecommendedTransformers,
});


const router = useRouter();
const error = ref('');


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

const submitForm = async () => {
  if(matcher.hasMatch(formData.value.username)) {
    error.value = 'The username is not useable.';
    console.log("yagmur");
    return;
  }
  if(formData.value.username.length < 3) {
    error.value = 'Username must be at least 3 characters long.';
    return;
  }
  if(formData.value.username.length > 15) {
    error.value = 'Username must be at least 15 characters long.';
    return;
  }
  if(matcher.hasMatch(formData.value.firstname)) {
    error.value = 'The firstname is not useable.';
    return;
  }
  if(formData.value.firstname.length < 2) {
    error.value = 'Firstname must be at least 2 characters long.';
    return;
  }
  if(formData.value.firstname.length > 15) {
    error.value = 'Firstname must be at least 15 characters long.';
    return;
  }
  if(matcher.hasMatch(formData.value.lastname)) {
    error.value = 'The lastname is not useable.';
    return;
  }
  if(formData.value.lastname.length < 2) {
    error.value = 'Lastname must be at least 2 characters long.';
    return;
  }
  if(formData.value.lastname.length > 15) {
    error.value = 'Lastname must be at least 15 characters long.';
    return;
  }
  if (passwordsDoNotMatch.value) {
    return;
  }
  const registerDTO: RegisterDto = {
    username: formData.value.username,
    firstname: formData.value.firstname,
    lastname: formData.value.lastname,
    email: formData.value.email,
    password: formData.value.password,
  };
  const response = await authService.register(registerDTO);
  if (response.type === 'success') {
    const successResponse = response as SuccessResponse;
    const errorMessage = successResponse.data.errorMessage;
    if(errorMessage == null) {
      router.push({ name: 'login', query: { registered: 'true' } });
    } else {
      console.error(errorMessage);
    }
  } else {
    console.error(response.error);
  }
};
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
  text-align: center;
}

#email,
#password,
#username,
#confirmPassword,
#lastname,
#firstname {
  height: 2.5em;
  width: 15em;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}

button {
  text-transform: uppercase;
  background-color: rgb(247, 171, 101);
  cursor: pointer;
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
