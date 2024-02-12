<template>
  <div class="settings">
    <h2>Settings</h2>

    <div class="current-properties-div">
      <div class="current-username">
        <span>Username: {{ user.username }}</span>
      </div>

      <div class="current-email">
        <span>Email: {{ user.email }}</span>
      </div>

      <div class="current-name">
        <span>Name: {{ user.firstname }} {{ user.lastname }}</span>
      </div>
    </div>

    <div class="change-properties-div">
      <!-- Spans to display messages */ -->
      <div class="messages">
        <span v-if="validationError" class="error-message">{{ validationError }}</span>
        <span v-if="successMessage" class="success-message">{{ successMessage }}</span>
      </div>

      <div class="form-group">
        <label for="change-password">Change Password:</label>
        <input
          type="password"
          id="change-password"
          placeholder="Enter new password"
          v-model="newPassword"
        />
        <button @click="updatePassword" type="submit" class="submit-btn">Submit</button>
      </div>

      <div class="form-group">
        <label for="change-email">Change Email:</label>
        <input type="email" id="change-email" placeholder="Enter new email" v-model="newEmail" />
        <button @click="updateEmail" type="submit" class="submit-btn">Submit</button>
      </div>

      <div class="form-group">
        <label for="change-firstname">Change First Name:</label>
        <input
          type="firstname"
          id="change-firstname"
          placeholder="Enter new first name"
          v-model="newFirstName"
        />
        <button @click="updateFirstName" type="submit" class="submit-btn">Submit</button>
      </div>

      <div class="form-group">
        <label for="change-lastname">Change Last Name:</label>
        <input
          type="lastname"
          id="change-lastname"
          placeholder="Enter new last name"
          v-model="newLastName"
        />
        <button @click="updateLastName" type="submit" class="submit-btn">Submit</button>
      </div>

      <!-- USERNAME IS TIED TO JWT TOKEN AND WOULD NEED A TOKEN REFRESH. LEAVING OUT OPTION TO CHANGE IT FOR NOW -->
    </div>

    <!--Will need updated once we implement the game play functionality-->
    <div class="form-group toggle">
      <label for="music-toggle">Music:</label>
      <input type="checkbox" id="music-toggle" checked />
    </div>

    <div class="form-group bug-script">
      <ScriptSettingsComponent />
    </div>

    <p><br /></p>

    <div class="form-group delete-option">
      <label for="delete-account">Want to delete your account?</label>
      <button @click="deleteUserAccount" type="submit" id="delete-btn">
        {{ deleteClicked ? 'CONFIRM' : 'DELETE' }}
      </button>
      <span v-if="deleteClicked" class="warning-message"> THIS IS PERMANENT! ARE YOU SURE? </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import UserService from '../services/userService';
import { useRouter } from 'vue-router';
import ScriptSettingsComponent from '../components/ScriptSettingsComponent.vue';

/* Define refs for new values */
const newPassword = ref('');
const newEmail = ref('');
const newFirstName = ref('');
const newLastName = ref('');
const validationError = ref('');
const successMessage = ref('');
const router = useRouter();
const { isAuthenticated } = useAuthStore();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const logout = useAuthStore().logout;
const deleteClicked = ref(false);

/* USERNAME IS TIED TO JWT TOKEN AND WOULD NEED A TOKEN REFRESH. LEAVING OUT OPTION TO CHANGE IT FOR NOW- */
// const newUsername = ref('');

/* Watchers for adding fade-in/fade-out animations and timeouts to error and success spans */
watch(successMessage, (newValue: string) => {
  if (newValue) {
    nextTick(() => {
      const successMessageElement = document.querySelector('.success-message');
      if (successMessageElement) {
        successMessageElement.classList.add('fade-in');

        setTimeout(() => {
          successMessageElement.classList.remove('fade-in');
          successMessageElement.classList.add('fade-out');

          setTimeout(() => {
            successMessage.value = '';
            successMessageElement.classList.remove('fade-out');
          }, 1000);
        }, 3000);
      }
    });
  }
});

watch(validationError, (newValue: string) => {
  if (newValue) {
    nextTick(() => {
      const validationErrorElement = document.querySelector('.error-message');
      if (validationErrorElement) {
        validationErrorElement.classList.add('fade-in');

        setTimeout(() => {
          validationErrorElement.classList.remove('fade-in');
          validationErrorElement.classList.add('fade-out');

          setTimeout(() => {
            validationError.value = '';
            validationErrorElement.classList.remove('fade-out');
          }, 1000);
        }, 3000);
      }
    });
  }
});

/* Validation and update methods for inputs */

// Validation method for password

// Constraints are not set up yet on backend. Once implemented on backend, validation will need to be added for password constraints.

// Method to update password
const updatePassword = async () => {
  try {
    if (newPassword.value) {
      await UserService.updateUser(user.value.id, { password: newPassword.value });
      successMessage.value = 'Password updated successfully!';
      newPassword.value = '';
    }
  } catch (error) {
    console.error('An error occurred: ', error);
    validationError.value = 'Failed to update password.';
  }
};

// Validation method for email
const validateEmail = () => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (newEmail.value.length < 5 || newEmail.value.length > 50) {
    validationError.value = 'Email must be between 5 and 50 characters.';
    return false;
  }

  // Check if the email matches the regex
  if (!emailRegex.test(newEmail.value)) {
    validationError.value = 'Please enter a valid email address.';
    return false;
  }

  return true;
};

// Method to update email
const updateEmail = async () => {
  if (validateEmail()) {
    try {
      const response = await UserService.updateUser(user.value.id, { email: newEmail.value });
      user.value.email = response.data.email;
      successMessage.value = 'Email updated successfully!';
      user.value.email = newEmail.value;
      newEmail.value = '';
    } catch (error) {
      console.error('An error occurred: ', error);
      validationError.value = 'Failed to update email.';
    }
  }
};

// Validation method for first name
const validateFirstName = () => {
  if (newFirstName.value.length < 2 || newFirstName.value.length > 15) {
    validationError.value = 'First name must be between 2 and 15 characters.';
    return false;
  }
  return true;
};

// Method to update first name
const updateFirstName = async () => {
  if (validateFirstName()) {
    try {
      const response = await UserService.updateUser(user.value.id, {
        firstname: newFirstName.value,
      });
      user.value.firstname = response.data.firstname;
      successMessage.value = 'First name updated successfully!';
      user.value.firstname = newFirstName.value;
      newFirstName.value = '';
    } catch (error) {
      console.error('An error occurred: ', error);
      validationError.value = 'Failed to update first name.';
    }
  }
};

// Validation method for last name
const validateLastName = () => {
  if (newLastName.value.length < 2 || newLastName.value.length > 15) {
    validationError.value = 'Last name must be between 2 and 15 characters.';
    return false;
  }
  return true;
};

// Method to update last name
const updateLastName = async () => {
  if (validateLastName()) {
    try {
      const response = await UserService.updateUser(user.value.id, { lastname: newLastName.value });
      user.value.lastname = response.data.lastname;
      successMessage.value = 'Last name updated successfully!';
      user.value.lastname = newLastName.value;
      newLastName.value = '';
    } catch (error) {
      console.error('An error occurred: ', error);
      validationError.value = 'Failed to update last name.';
    }
  }

  /* USERNAME IS TIED TO JWT TOKEN AND WOULD NEED A TOKEN REFRESH. LEAVING OUT OPTION TO CHANGE IT FOR NOW- */
};

/*  Method to delete user account */
const deleteUserAccount = async () => {
  if (!deleteClicked.value) {
    deleteClicked.value = true;
  } else {
    try {
      await UserService.deleteUser(user.value.id);
      logout();
      router.push({ name: 'login', query: { accountDeleted: 'true' } });
    } catch (error) {
      console.error('An error occurred during account deletion: ', error);
      validationError.value = 'Failed to delete account.';
    }
  }
};
</script>

<style scoped>
/* Base styling for settings page */

.settings {
  border: 2px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 50px;
  width: 450px;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.current-properties-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid black;
  padding: 15px;
}

.change-properties-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

h2 {
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;
}

/* Music checkbox toggle styling */

.toggle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

.toggle label {
  margin: 5px;
}

#music-toggle {
  width: 15px;
  margin: 5px;
}

/* Bug Script div styling */

.bug-script {
  width: 100%;
  border-bottom: 1px solid black;;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Form and input box styling */

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}

#change-email,
#change-password,
#change-username,
#change-name,
#change-firstname,
#change-lastname {
  height: 2.5em;
  width: 15em;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}

/* Button styling */

.submit-btn {
  margin-left: 5px;
}

button {
  text-transform: uppercase;
  background-color: rgb(247, 171, 101);
  cursor: pointer;
}

/* Delete button styling */

#delete-btn {
  background-color: #d62828;
  cursor: pointer;
  color: #f0eeec;
  height: 2em;
  width: 5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.delete-option {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;
}

/* Color and positioning for top of page error and success message spans */

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

span.success-message {
  text-align: center;
  color: #136f63;
  max-width: 100%;
  font-size: 0.8em;
}

/* Color and positioning for bottom deletion spans */

span.warning-message {
  text-align: center;
  color: #d62828;
  max-width: 100%;
  font-size: 0.8em;
  margin-top: 10px;
}

/* Fade in and out for success and error message spans */

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
</style>