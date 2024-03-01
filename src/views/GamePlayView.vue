<template>
  <div v-if="map && map.cells" class="game-play">

    <!-- Score Tracker -->
    <div class="score-tracker">
      <div>Bug Team 1 Score: {{ gameStore.scores.team1 }} </div>
      <div>Bug Team 2 Score: {{ gameStore.scores.team2 }}</div>
    </div>

    <!-- Time Slider -->
    <div class="time-slider-div">
      <input class="time-slider" type="range" min="0" :max="gameStore.ticks" v-model="currentTick" @input="updateCurrentTick" />
    </div>

    <!-- Game Map-->
    <div class="game-map">
      <div v-for="(row, rowIndex) in map.cells" :key="rowIndex" class="row">
        <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell">

          <template v-if="cell.type === 'Bug'">
            Bug at {{ cell.x }},{{ cell.y }}
          
            
            <span v-if="getScriptName(cell)">
              {{ getScriptName(cell) }}
            </span>
          </template>
          <template v-else>
            {{ cell.type }} at {{ cell.x }},{{ cell.y }}
          </template>
        </div>
      </div>
    </div>

    <!-- Script Selections-->
    <div class="script-selections">

      <!-- Script selector for the first bug -->
      <div class="script-selector">
        <select v-model="selectedScriptIndex1" id="selectedScriptIndex1">
          <option v-for="(script, index) in scripts" :key="index" :value="index">
            {{ script.name }}
          </option>
        </select>
        <button @click="assignScript(1)" class="submit-btn">Bug Team One</button>
      </div>

      <!-- Script selector for the second bug -->
      <div class="script-selector">
        <select v-model="selectedScriptIndex2" id="selectedScriptIndex2">
          <option v-for="(script, index) in scripts" :key="index" :value="index">
            {{ script.name }}
          </option>
        </select>
        <button @click="assignScript(2)" class="submit-btn">Bug Team Two</button>
      </div>
    </div>

    <!-- Battle Button -->
    <button @click="startBattle">BATTLE!</button>

    </div>

</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useGameStore } from '../stores/gameStore';
import { useScriptStore } from '../stores/scriptStore';
import { useAuthStore } from '../stores/auth';
import type { Bug, Cell } from '@/types';

const gameStore = useGameStore();
const scriptStore = useScriptStore();
const authStore = useAuthStore();
const currentTick = ref(0);

const map = ref(gameStore.map);
const selectedScriptIndex1 = ref(0);
const selectedScriptIndex2 = ref(0);

const user = computed(() => authStore.user);

onMounted(async () => {
  try {
    await gameStore.fetchMap();
    if (user.value && user.value.id) {
      await scriptStore.fetchScriptsByUserId(user.value.id);
    }
  } catch (error) {
    console.error('Error during mounted hook:', error);
  }
});

// Scripts
const scripts = computed(() => scriptStore.scripts);

const getScriptName = (cell: Cell): string | undefined => {
  if (cell.type === 'Bug') {
    const scriptIndex = (cell as Bug).scriptIndex;
    return scriptIndex !== undefined ? scripts.value[scriptIndex]?.name : undefined;
  }
  return undefined;
};


const assignScript = (bugId: number) => {
  const selectedScriptIndex = bugId === 1 ? selectedScriptIndex1.value : selectedScriptIndex2.value;
  const script = scripts.value[selectedScriptIndex];
  // Need to implement logic to assign the selected script to the bug
};

// Map
const annotatedCells = computed(() => map.value.cells.map(row => 
  row.map(cell => {
    // Check if the cell is a Bug and then extract the scriptIndex...
    const isBug = cell.type === 'Bug';
    const scriptIndex = isBug ? (cell as Bug).scriptIndex : undefined;

    return {
      ...cell,
      isBug,
      // Use scriptIndex to get the script name, ensuring scriptIndex is not undefined...
      scriptName: isBug && scriptIndex !== undefined ? scripts.value[scriptIndex].name : undefined,
    };
  })
));

// Battle Game Play

const updateCurrentTick = () => {
  gameStore.setCurrentTick(currentTick.value);
};

const startBattle = () => {
  gameStore.startBattle();
};


</script>


<style scoped>

.game-play {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Game map styling */
.game-map {
  width: 80%;
  height: 60%;
  border: 2px #003049 solid;
}

/* Button styling */

.submit-btn {
  margin-left: 5px;
  width: 120px;
  height: 30px;
}

button {
  text-transform: uppercase;
  background-color: rgb(247, 171, 101);
  cursor: pointer;
}

/* Script Selectors Styling */
.script-selections {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.script-selector {
  margin: 10px;
}

/* Score Tracker Styling */
.score-tracker {
  margin: 10px;
  font-size: 1.2em;
}

/* Time Slider Styling */

.time-slider {
  background-color: rgb(212,120,44); 
  height: 2px;
  margin: 15px;
  -webkit-appearance: none;
  appearance: none;
}

.time-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 23px;
  height: 24px;
  border: 0;
  background: url('../../public/images/Blue_Up.png') no-repeat center center;
  background-size: cover;
  cursor: pointer;
}

.time-slider::-moz-range-thumb {
  width: 23px;
  height: 25px;
  border: 0;
  background: url('../../public/images/Blue_Up.png') no-repeat center center;
  background-size: cover;
  cursor: pointer;
}

.time-slider::-moz-range-track {
  background-color: rgb(212,120,44);
  border: none;
}

.time-slider::-moz-range-progress {
  background-color: rgb(212,120,44);
}
</style>
