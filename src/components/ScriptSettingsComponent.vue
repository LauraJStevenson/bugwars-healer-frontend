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
        <button @click="saveNewScriptName" class="save-name">Save</button>
      </template>
      <button v-else @click="renameScript(script.id)" class="rename-script">Rename</button>

          <router-link :to="{ name: 'scriptEditor', params: { id: script.id } }" class="edit-script">Edit</router-link>
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

// Method to update script name
const renameScript = (scriptId:any) => {
  editingScriptId.value = scriptId;
  const script = scriptStore.scripts.find(script => script.id === scriptId);
  newScriptName.value = script ? script.name : '';
};

const saveNewScriptName = async () => {
  if (!newScriptName.value) {
    validationError.value = "Script name cannot be empty.";
    return;
  }
  try {
    await ScriptService.updateScript(editingScriptId.value, { name: newScriptName.value });
    const scriptIndex = scriptStore.scripts.findIndex(script => script.id === editingScriptId.value);
    if (scriptIndex !== -1) {
      scriptStore.scripts[scriptIndex].name = newScriptName.value;
      successMessage.value = "Script name updated successfully.";
    }
    editingScriptId.value = null;
    newScriptName.value = '';
  } catch (error) {
    console.error('Error updating script name:', error);
    validationError.value = "Failed to update script name.";
  }
};


onMounted(() => {
  if (userId.value) {
    scriptStore.fetchScriptsByUserId(userId.value);
  } else {
    console.error("User ID is not available.");
  }
});

const deleteScript = async (scriptId: number) => {
  await scriptStore.deleteScript(scriptId);
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