

<template>
  <div v-if="currentMapCells" class="game-play">
    <div class="score-tracker">
      <div>Bug Team 1 Score: {{ gameStore.scores.team1 }}</div>
      <div>Bug Team 2 Score: {{ gameStore.scores.team2 }}</div>
    </div>

    <div class="time-slider-div">
      <input type="range" min="0" :max="gameStore.ticks" v-model="currentTick" @input="updateCurrentTick" class="time-slider" />
    </div>

    <div class="game-box">
      <button @click="previousMap" class="icon-button">
        <font-awesome-icon icon="angle-left" />
      </button>

      <div class="game-map">
        <div v-for="(row, rowIndex) in currentMapCells" :key="rowIndex" class="row">
          <div v-for="(cell, cellIndex) in row" :key="cellIndex" class="cell">
            <img v-if="cell.image" :src="cell.image" :alt="cell.type" :class="{'bug': cell.type === 'Bug', [cell.direction.toLowerCase()]: cell.type === 'Bug'}" />
          </div>
        </div>
      </div>

      <button @click="nextMap" class="icon-button">
        <font-awesome-icon icon="angle-right" />
      </button>
    </div>

    <div class="script-selections">
      <div class="script-selector">
        <select v-model="selectedScriptIndex1" id="selectedScriptIndex1">
          <option v-for="(script, index) in scripts" :key="index" :value="index">{{ script.name }}</option>
        </select>
      </div>

      <div class="script-selector">
        <select v-model="selectedScriptIndex2" id="selectedScriptIndex2">
          <option v-for="(script, index) in scripts" :key="index" :value="index">{{ script.name }}</option>
        </select>
      </div>
    </div>

    <button @click="startBattle">BATTLE!</button>
  </div>
</template>


<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useGameStore } from '../stores/gameStore';
import { useScriptStore } from '../stores/scriptStore';
import { useAuthStore } from '../stores/auth';
import type { Bug, Cell } from '@/types';
import blueBugImage from '../assets/bugs/blue/Blue_Up.png';
import redBugImage from '../assets/bugs/red/Red_Up.png';
import greenBugImage from '../assets/bugs/green/Green_Up.png';
import yellowBugImage from '../assets/bugs/yellow/Yellow_Up.png';
import foodImage from '../assets/apple/Apple.png';
import wallImage from '../assets/map/wall/Wall.png';
import floorImage from '../assets/map/floor/Floor.png'
import treasureImage from '../assets/treasure/Treasure_.png';

const gameStore = useGameStore();
const scriptStore = useScriptStore();
const authStore = useAuthStore();
const currentTick = ref(0);

const map = ref(gameStore.maps);
const selectedScriptIndex1 = ref(0);
const selectedScriptIndex2 = ref(0);

const user = computed(() => authStore.user);
const currentMap = computed(() => gameStore.currentMap);

onMounted(async () => {
  await gameStore.fetchMaps();
});

const previousMap = () => {
  gameStore.previousMap();
};

const nextMap = () => {
  gameStore.nextMap();
};

const mapCharacterToImage: { [key: string]: string | undefined } = {
  'X': wallImage,
  'a': redBugImage,
  'b': blueBugImage, 
  'c': greenBugImage, 
  'd': yellowBugImage, 
  'f': foodImage,
  't': treasureImage,
  ' ': floorImage,
};

  const currentMapCells = computed(() => {
  if (!gameStore.currentMap || !gameStore.currentMap.serialization) return [];
  return gameStore.currentMap.serialization.split('\n').map((row, rowIndex) =>
    row.split('').map((char, colIndex) => ({
      x: colIndex,
      y: rowIndex,
      type: char,
      image: mapCharacterToImage[char] || undefined,
      direction: char === 'a' ? 'N' : char === 'b' ? 'E' : char === 'c' ? 'S' : 'W'
    }))
  );
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


// const assignScript = (bugId: number) => {
//   const selectedScriptIndex = bugId === 1 ? selectedScriptIndex1.value : selectedScriptIndex2.value;
//   const script = scripts.value[selectedScriptIndex];
//   gameStore.setScriptForBug(bugId, script.bytecode); // Assuming scripts have a bytecode property
// };

// Map
// const annotatedCells = computed(() => map.value.cells.map(row => 
//   row.map(cell => {
//     // Check if the cell is a Bug and then extract the scriptIndex...
//     const isBug = cell.type === 'Bug';
//     const scriptIndex = isBug ? (cell as Bug).scriptIndex : undefined;

//     return {
//       ...cell,
//       isBug,
//       // Use scriptIndex to get the script name, ensuring scriptIndex is not undefined...
//       scriptName: isBug && scriptIndex !== undefined ? scripts.value[scriptIndex].name : undefined,
//     };
//   })
// ));

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
  max-height: 100vh; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}

.game-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 60vh;
  margin: 0 auto;
  gap: 5px;
}

/* Game map styling */
.game-map {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
}

.row {
  display: flex;
  flex-wrap: nowrap;
}

.cell {
  flex-shrink: 0; /* Prevents cell from shrinking below its set size */
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: rgb(135,232,74);
}

/*Bug classes for rotation*/
.bug {
  transition: transform 0.5s;
}

.bug.north {
  transform: rotate(0deg);
}

.bug.east {
  transform: rotate(90deg);
}

.bug.south {
  transform: rotate(180deg);
}

.bug.west {
  transform: rotate(270deg);
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

.icon-button {
  border: none;
  background-color: transparent;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
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
