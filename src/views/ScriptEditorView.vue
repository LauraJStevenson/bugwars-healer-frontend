<template>
  <div class="script-editor">
    <div><h1>Script Editor Page</h1></div>
    <div class="wrapper">
      <div class="column1">
        <label for="multilineInput"><h3>Write Bug Code Here:</h3></label>
        <textarea v-model="scriptText" class="multilineInput" rows="25" cols="35"></textarea><br />
        <label for="scriptName"><h3>Script Name:</h3></label>
        <input v-model="scriptName" id="scriptName" type="text" placeholder="Enter script name" /><br />
        <button @click="compileAndSaveScript" class="button">Save Script</button>
        <RouterLink to="/gameplay">
          <button class="button">Play!</button>
        </RouterLink>
      </div>
      <div id="bug-code-example" class="column2">
        <label for="immutableTextbox"><h3>Bug Code Looks Like This:</h3></label>
        <textarea id="immutableTextarea" rows="25" cols="35" readonly>
          :LABEL
          #Action Commands (Size 1)#       
            noop #NoOperation#
            mov  #MoveForward#
            rotr #RotateRight#
            rotl #RotateLeft#
            att  #Attack#
            eat  #EatFoodOrBug#
          
          #Conditional Commands (Size 2)#
            ifEnemy
            ifAlly
            ifFood
            ifEmpty
            ifWall
            goto

          #Please Note:#
            #Action commands may ONLY have one command.#
            #Conditional commands MUST have an Action Command appended.#
            #Declaring a LABEL should have a ':' and the ':' should be the first character of the line.#
            #LABELS can be alphanumeric +_ but they MUST begin with a character.#
            #Anything inside of hashtags is a comment.#
        </textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';

const scriptName = ref('');
const scriptText = ref('');
const authStore = useAuthStore();

const compileAndSaveScript = async () => {
  if (!scriptName.value.trim()) {
    alert('Please provide a name for the script.');
    return;
  }

  if (!authStore.user || !authStore.user.id) {
    alert('User is not authenticated.');
    return;
  }

  console.log('User ID:', authStore.user.id);

  try {
    const compileResponse = await axios.post('/game/compile', { script: scriptText.value });
    if (compileResponse.data) {

      const saveResponse = await axios.post('/scripts/', {
        name: scriptName.value,

        rawCode: scriptText.value.replace(/\r?\n/g, '\n'),
        bytecode: compileResponse.data.compiledScript,
        userId: authStore.user.id,
      });

      if (saveResponse.data) {
        alert('Script saved successfully!');
        scriptName.value = '';
        scriptText.value = '';
      } else {
        alert('Failed to save the script.');
      }
    } else {
      alert('Script compilation failed.');
    }
  } catch (error) {
    console.error('Error compiling or saving the script:', error);
    alert('An error occurred.');
  }
};

</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}
.column1 {
  align-items: center;
}
h1 {
  text-align: center;
}
textarea {
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}
button {
  text-transform: uppercase;
  background-color: rgb(247, 171, 101);
  cursor: pointer;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .wrapper {
    grid-template-columns: 1fr; /* Switch to a single column for smaller screens */
  }
}
</style>
