<template>
    <div class="scripts-component">
      <!--This area reserved for message span similar to user settings changed-->
      <p><br /></p>
      <h3>Saved Bug Scripts:</h3>
      <ul id="bug-scripts">
      <li v-for="script in scriptStore.scripts" :key="script.id" class="bug-script">
        <span>{{ script.name }}</span>
        <!-- This routerlink is dynamic and will route to the script editor page with the user's scriptID so that their script appears in the editor automatically.-->
        <router-link :to="{ name: 'scriptEditorWithParam', params: { id: script.id } }" class="edit-script">Edit</router-link>
        <span class="delete-script" @click="() => deleteScript(script.id)">Delete</span>
      </li>
    </ul>
    </div>
  </template>
  

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useScriptStore } from '../stores/scriptStore';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const scriptStore = useScriptStore();
const authStore = useAuthStore();
const router = useRouter();

const userId = ref(authStore.user.id);

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
}

h3 {
  font-size: 0.9em;
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;

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

.delete-script {
  color: #d62828;
  cursor: pointer;
  margin-left: 55px;
}
.edit-script {
  color: #d62828;
  cursor: pointer;
  margin-left: 55px;
  text-decoration: none;
}

.bug-script {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

ul {
  list-style: none;
  padding: 0;
}

</style>