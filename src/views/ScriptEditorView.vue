<template>
  <div class="script-editor">

    <div>
      <h1>Script Editor Page</h1>
    </div>

    <p>Here you can program the behavior of autonomous creatures called "bugs" to compete and survive in a simulated environment. Your scripts dictate how bugs sense their environment, make decisions, and interact with other entities.</p>

    <div class="wrapper">

      <div class="column1">

        <label for="multilineInput"><h3>Write Bug Code Here:</h3></label>
        
        <textarea v-model="scriptText" id="multilineInput" rows="25" cols="35" name="multilineInput"></textarea><br />

        <label for="scriptName"><h3>Script Name:</h3></label>

        <input v-model="scriptName" id="scriptName" type="text" placeholder="Enter script name" /><br />

        <button @click="compileAndSaveScript" class="button">Save Script</button>

        <RouterLink to="/gameplay">
          <button class="button">Play!</button>
        </RouterLink>

      </div>
      <div id="bug-code-example" class="column2">

        <h3>Instructions:</h3>

        <div class="instructions" rows="25" cols="35">
          <h4>* Script Structure *</h4>
          A bug script consists of a series of commands and conditions that are executed in a game environment. The script allows you to define complex behaviors using simple commands.

          <h4>* Basic Commands *</h4>
          Commands control the actions of your bug. Each command has a specific purpose:

          noop - No operation. The bug does nothing for one cycle.
          mov - Move forward one space.
          rotr - Rotate right (clockwise).
          rotl - Rotate left (counterclockwise).
          att - Attack. Targets the entity directly in front of the bug.
          eat - Eat food or another bug directly in front of your bug.


          <h4>* Conditional Commands *</h4>
          Conditional commands allow your bug to make decisions based on its surroundings:

          ifEnemy - Execute the next command if there is an enemy ahead.
          ifAlly - Execute the next command if there is an ally ahead.
          ifFood - Execute the next command if there is food ahead.
          ifEmpty - Execute the next command if the space ahead is empty.
          ifWall - Execute the next command if there is a wall ahead.
          goto - Go to a specified label in the script.

          <h4>* Labels *</h4>
          Labels are used to create loops or jump to parts of the script based on conditions:

          To declare a label, start a line with a colon followed by the label name (e.g., :start).
          Labels can be alphanumeric and underscores but must start with a letter.

          <h4>Example</h4>

          Here is a simple example of what your script should look like:
          <div class="sample">
          :start
          <br>
          ifEmpty mov # Moves forward if the space ahead is empty
          <br>
          ifWall rotr # Turns right if there is a wall
          <br>
          goto start # Loops back to the start
          </div>
        </div>

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

.script-editor {
  margin: 50px;
}
.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.column1 {
  align-items: center;
}

h1 {
  text-align: center;
}

h3 {
  margin: 5px 0;
}

textarea {
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  outline: none;
  border: 1px solid black;
}

textarea:focus {
  border: 1px solid rgb(212, 120, 44);
}

input {
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  outline: none;
  border: 1px solid black;
}

input:focus {
  border: 1px solid rgb(212, 120, 44);
}

button {
  text-transform: uppercase;
  background-color: rgb(247, 171, 101);
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;
}

.sample {
  font-style: italic;
}

@media (max-width: 768px) {
  .wrapper {
    grid-template-columns: 1fr; /* Switch to a single column for smaller screens */
  }
}
</style>
