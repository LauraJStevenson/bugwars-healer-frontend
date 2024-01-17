<template>
  <div id="login">
    <form class="input-form" @submit.prevent="submit" @input="clearAuthError">
      <h1>Login</h1>
      <div class="login-input-group">
        <input type="text" id="email" placeholder="Username" v-model="formData.email" required />
      </div>
      <p></p>
      <div class="login-input-group">
        <input
          type="password"
          id="password"
          placeholder="Password"
          v-model="formData.password"
          required
        />
      </div>

      <p><input type="checkbox" @change="showPassword" /> Show Password</p>

      <!-- Span to display messages */ -->
      <div class="messages">
        <span v-if="authError" class="error-message fade-effect">{{ authError }}</span>
      </div>

      <p><button type="submit">Login</button></p>
    </form>
    <p><router-link to="/register">New here? Create an account!</router-link></p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch, nextTick, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const formData = ref({
  email: '',
  password: '',
});

const router = useRouter();
const { login, clearAuthError } = useAuthStore();
const { authError } = storeToRefs(useAuthStore());

/* Watcher for message span */
watch(authError, (newValue) => {
  if (newValue) {
    nextTick(() => {
      const authErrorElement = document.querySelector('.error-message');
      if (authErrorElement) {
        authErrorElement.classList.add('fade-in');

        setTimeout(() => {
          authErrorElement.classList.remove('fade-in');
          authErrorElement.classList.add('fade-out');

          setTimeout(() => {
            clearAuthError();
            authErrorElement.classList.remove('fade-out');
          }, 1000); // Fade out duration
        }, 3000); // Display duration
      }
    });
  }
});

/* Used for account deletion from SettingsView */
onMounted(() => {
  if (router.currentRoute.value.query.accountDeleted) {
    authError.value = 'User account has been deleted. Please re-register to login.';
  }
});

function submit() {
  const loginDto = {
    username: formData.value.email,
    password: formData.value.password,
  };

  login(loginDto);
}

const showPassword = () => {
  const x = document.getElementById('password') as HTMLInputElement;
  x.type = x.type === 'password' ? 'text' : 'password';
};
</script>

<style scoped>
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
}

/* centers the actual Login information*/
.input-form {
  text-align: center;
}

/* changes the overall size and background color of the placeholders*/
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

/* changes the placeholder box color when clicked, ie, password, email etc*/
.login-input-group input:focus {
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
  cursor: pointer;
}

button:hover {
  background-color: #7acc9c;
  transition: all 0.3s ease-in-out;
}

/* Message span styling */

.fade-in {
  opacity: 0;
  animation: fadeInAnimation 1s forwards;
}

.fade-out {
  animation: fadeOutAnimation 1s forwards;
}

@keyframes fadeInAnimation {
  to {
    opacity: 1;
  }
}

@keyframes fadeOutAnimation {
  to {
    opacity: 0;
  }
}

.messages {
  max-width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

span.error-message {
  text-align: center;
  color: #d62828;
  max-width: 100%;
  font-size: 0.8em;
}
</style>
