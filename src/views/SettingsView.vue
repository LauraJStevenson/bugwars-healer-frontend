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

      <!-- Span to display messages */ -->
      <div class="messages">
        <span :class="messageClass" class='messageSpan'>{{ displayMessage }}</span>
      </div>



      <div class="form-group" id="password-group">
        <label for="change-password">Change Password:</label>
        <input
          type="password"
          id="change-password"
          placeholder="Enter new password"
          v-model="newPassword"
        />
        <button @click="updatePassword" type="submit" class="submit-btn"   :disabled="!isPasswordValid">Submit</button>
      </div>

      <!-- Password Requirements Div -->
      <div class="password-requirements">
        <ul class="password-requirements-list">
          <li :class="{'text-success': passwordValidations.minLength}">
            <font-awesome-icon icon="check" v-if="passwordValidations.minLength" class="fa-icon" /> 8 characters minimum
          </li>
          <li :class="{'text-success': passwordValidations.number}">
            <font-awesome-icon icon="check" v-if="passwordValidations.number" class="fa-icon" /> Contains a number
          </li>
          <li :class="{'text-success': passwordValidations.uppercase}">
            <font-awesome-icon icon="check" v-if="passwordValidations.uppercase" class="fa-icon" /> Contains an uppercase letter
          </li>
        </ul>
      </div>



      <div class="form-group">
        <label for="change-email">Change Email:</label>
        <input type="email" id="change-email" placeholder="Enter new email" v-model="newEmail" />
        <button @click="updateEmail" type="submit" class="submit-btn email-submit">Submit</button>
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
      <label for="delete-btn">Want to delete your account?</label>
      <button @click="deleteUserAccount" type="submit" id="delete-btn">
        {{ deleteClicked ? 'CONFIRM' : 'DELETE' }}
      </button>
      <span v-if="deleteClicked" class="warning-message"> THIS IS PERMANENT! ARE YOU SURE? </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed, reactive } from 'vue';
import { useAuthStore } from '../stores/auth';
import UserService from '../services/userService';
import { useRouter } from 'vue-router';
import ScriptSettingsComponent from '../components/ScriptSettingsComponent.vue';
import validationService from '../services/validationService'

/* Define refs for new values */
const newPassword = ref('');
const newEmail = ref('');
const newFirstName = ref('');
const newLastName = ref('');
const validationError = ref('');
const successMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const deleteClicked = ref(false);


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

const displayMessage = computed(() => {
  return successMessage.value || validationError.value;
});

const messageClass = computed(() => {
  if (successMessage.value) return 'success-message fade-in';
  if (validationError.value) return 'error-message fade-in';
  return '';
});


/* Update methods for inputs */

// Method to update password
const updatePassword = async () => {
  if (isPasswordValid.value && newPassword.value) {
    try {
      const response = await UserService.updatePassword(user.value.id, newPassword.value);
      if (response.status === 200) {
        successMessage.value = 'Password updated successfully!';
        newPassword.value = '';
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('An error occurred: ', error);
      validationError.value = 'Failed to update password.';
    }
  }
};

// This is linked to the password submit button. Button will be greyed out until constraint requirements are met.
const isPasswordValid = computed(() => {
  return (
    passwordValidations.minLength &&
    passwordValidations.number &&
    passwordValidations.uppercase
  );
});

// Reactive property for password validation status
const passwordValidations = reactive({
  minLength: false,
  number: false,
  uppercase: false,
});

// Watch new password field for changes and validate it
watch(newPassword, (newValue) => {
  passwordValidations.minLength = newValue.length >= 8;
  passwordValidations.number = /\d/.test(newValue);
  passwordValidations.uppercase = /[A-Z]/.test(newValue);
});



// Method to update email
const updateEmail = async () => {
  const emailError = validationService.validateEmail(newEmail.value);
  if (emailError === '') {
    try {
      const response = await UserService.updateEmail(user.value.id, newEmail.value);
      if (response && response.data) {
        authStore.updateUserDetails({ email: newEmail.value });
        successMessage.value = 'Email updated successfully!';
        newEmail.value = '';
      } else {
        throw new Error('Failed to update email.');
      }
    } catch (error) {
      console.error('An error occurred: ', error);
      validationError.value = 'Failed to update email.';
    }
  } else {
    validationError.value = emailError;
  }
};



// Method to update first name
const updateFirstName = async () => {
  const firstNameError = validationService.validateFirstName(newFirstName.value);
  if (firstNameError === '') {
    try {
      const response = await UserService.updateFirstName(user.value.id, newFirstName.value);
      if (response && response.data) {
        successMessage.value = 'First name updated successfully!';
        authStore.updateUserDetails({ firstname: newFirstName.value });
        newFirstName.value = '';
      } else {
        throw new Error('Failed to update first name.');
      }
    } catch (error) {
      console.error('An error occurred: ', error);
      validationError.value = 'Failed to update first name.';
    }
  } else {
    validationError.value = firstNameError;
  }
};



// Method to update last name
const updateLastName = async () => {
  const lastNameError = validationService.validateLastName(newLastName.value);
  if (lastNameError === '') {
    try {
      const response = await UserService.updateLastName(user.value.id, newLastName.value);
      if (response && response.data) {
        successMessage.value = 'Last name updated successfully!';
        authStore.updateUserDetails({ lastname: newLastName.value });
        newLastName.value = '';
      } else {
        throw new Error('Failed to update last name.');
      }
    } catch (error) {
      console.error('An error occurred: ', error);
      validationError.value = 'Failed to update last name.';
    }
  } else {
    validationError.value = lastNameError;
  }
};



/*  Method to delete user account */
const deleteUserAccount = async () => {
  if (!deleteClicked.value) {
    deleteClicked.value = true;
  } else {
    try {
      await UserService.deleteUser(user.value.id);
      await authStore.logout(router);
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

/** Password group and requirements styling */

#password-group {
  margin-bottom: 0px;
}

.password-requirements-list {
  list-style-type: none;
  padding: 0px;
}

.password-requirements {
  color: gray;
  font-size: .8em;
  margin-bottom: 10px;
  font-weight: bold;;
}

.text-success {
  color: #1ea749;
}

.fa-icon {
  color: #1ea749;
  margin-right: 5px;
}

.password-requirements-list li {
  display: flex;
  align-items: center;
}
</style>