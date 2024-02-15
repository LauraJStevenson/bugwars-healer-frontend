<template>
    <div class="scripts-component">

      <!-- Spans to display messages */ -->
      <div class="messages">
        <span v-if="validationError" class="error-message">{{ validationError }}</span>
        <span v-if="successMessage" class="success-message">{{ successMessage }}</span>
      </div>

      <h3>Saved Bug Scripts:</h3>

      <ul id="bug-scripts">

          <li v-for="script in scriptStore.scripts" :key="script.id" class="bug-script">
 
            <span v-if="editingScriptId !== script.id">{{ script.name }}</span>
            <template v-if="editingScriptId === script.id">
              <input v-model="newScriptName" placeholder="New script name">
              <button @click="updateScriptName" class="save-name">Save</button>
            </template>
            <button v-else @click="renameScript(script.id)" class="rename-script">Rename</button>

            <router-link :to="{ name: 'scriptEditorWithParam', params: { id: script.id } }" class="edit-script">Edit</router-link>
            <span class="delete-script" @click="() => deleteScript(script.id)">Delete</span>

        </li>

    </ul>

    </div>

  </template>
  

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue';
import ScriptService from '../services/scriptService';
import { useScriptStore } from '../stores/scriptStore';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';

/* Define refs for new values */
const scriptStore = useScriptStore();
const authStore = useAuthStore();
const userId = ref(authStore.user.id);
const editingScriptId = ref(null);
const newScriptName = ref('');
const validationError = ref('');
const successMessage = ref('');


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

// Method to start renaming a script (makes input box appear)
const renameScript = (scriptId: any) => {
  editingScriptId.value = scriptId;
  const scriptToRename = scriptStore.scripts.find(s => s.id === scriptId);
  if (scriptToRename) {
    newScriptName.value = scriptToRename.name;
  }
};


// Validation method for script name
const validateScriptName = () => {
  const nameRegex = /^[a-zA-Z0-9_\- ]+$/;

  if (!newScriptName.value || newScriptName.value.length < 1 || newScriptName.value.length > 50) {
    validationError.value = 'Script name must be between 1 and 50 characters.';
    return false;
  }

  if (!nameRegex.test(newScriptName.value)) {
    validationError.value = 'Script name contains invalid characters.';
    return false;
  }

  return true;
};

// Method to update script name
const updateScriptName = async () => {
  if (!editingScriptId.value) {
    console.log('Validation error: No script selected for update.');
    validationError.value = 'No script selected for update.';
    return;
  }

  if (validateScriptName()) {
    try {
      const response = await ScriptService.updateScript(editingScriptId.value, { name: newScriptName.value });

      if (response && response.data) {
        const index = scriptStore.scripts.findIndex(script => script.id === editingScriptId.value);
        if (index !== -1) {
          scriptStore.scripts[index] = response.data;
          successMessage.value = 'Script name updated successfully!';
        } else {
          console.log('Error: Failed to find the script in the local store.');
          throw new Error('Failed to find the script in the local store.');
        }

        newScriptName.value = '';
        editingScriptId.value = null;
      } else {
        console.log('Error: No data returned from the update operation.');
        throw new Error('No data returned from the update operation.');
      }
    } catch (error) {
      console.error('An error occurred during script update:', error);

      if (axios.isAxiosError(error)) {
        console.log(`Axios error response: ${error.response ? JSON.stringify(error.response.data) : 'No response data'}`);
        validationError.value = error.response && error.response.data && error.response.data.message 
                                ? error.response.data.message 
                                : 'Failed to update script name.';
      } else if (error instanceof Error) {
        console.log(`Error details: ${error.message}`);
        validationError.value = error.message;
      } else {
        console.log('An unknown error occurred');
        validationError.value = 'An unknown error occurred';
      }
    }
  }
};


// Fetches user scripts
onMounted(() => {
  if (userId.value) {
    scriptStore.fetchScriptsByUserId(userId.value);
  } else {
    console.error("User ID is not available.");
  }
});

// Deletes a script
const deleteScript = async (scriptId: number) => {
  try {
      await scriptStore.deleteScript(scriptId);
      successMessage.value = 'Script deleted successfully!';
    } catch (error) {
      console.error('An error occurred: ', error);
      validationError.value = 'Failed to delete script.';
    }
};
</script>


<style scoped>

.scripts-component {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100%;
}

h3 {
  font-size: 0.9em;
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;

}

.bug-script {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.bug-script-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  width: 100%;
  padding-bottom: 50px;
}

ul {
  list-style: none;
  padding: 0;
}


/** Script Edit / Delete Links */
.edit-script, .rename-script, .save-name, .delete-script {
  color: #d62828;
  cursor: pointer;
  margin-left: 40px;
  text-decoration: none;
  border: none;
  font-size: .9em;
  cursor: pointer;
}

/** Name Edit Input Box */
input {
  width: 95%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
  height: 2.5em;
  width: 13em;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
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