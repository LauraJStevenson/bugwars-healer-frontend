

<template>
  <div v-if="currentMapCells" class="game-play">
    <div class="score-tracker">
      <div class="team-one-score">Bug Team 1 Score: {{ gameStore.scores.team1 }}</div>
      <div class="team-two-score">Bug Team 2 Score: {{ gameStore.scores.team2 }}</div>
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

    <p>Select your competitors:</p>

    <div class="script-selections">
      <div class="script-selector" v-for="index in scriptCount" :key="index">
        <select v-model="selectedScripts[index]" :id="'selectedScriptIndex' + index">
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
const selectedScripts = ref([]);


onMounted(async () => {
  await gameStore.fetchMaps();
  if (authStore.user && authStore.user.id) {
    await scriptStore.fetchScriptsByUserId(authStore.user.id);
  }
});


// Map
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

const scriptCount = computed(() => {
  if (!gameStore.currentMap || !gameStore.currentMap.name) return 0;

  switch (gameStore.currentMap.name) {
    case 'basic':
    case 'arena':
      return 4;
    case 'original':
      return 2;
    case 'maze':
      return 1;
    default:
      return 0;
  }
});


// Slider

const updateCurrentTick = () => {
  gameStore.setCurrentTick(currentTick.value);
};


// Scripts
const scripts = computed(() => scriptStore.scripts);

/* Need to assign scripts */


// Battle Game Play

const startBattle = () => {
  gameStore.startBattle();
};


</script>


<style scoped>

.game-play {
  width: 80vw;
  max-height: 100%; 
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
  max-height: 70%;
  margin: 0 auto;
  gap: 5px;
  /* border: 4px solid black; */
}

/* Game map styling */
.game-map {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  /* border: 4px solid black; */
}

.row {
  display: flex;
  flex-wrap: nowrap;
}

.cell {
  /* flex-shrink: 0; Prevents cell from shrinking below its set size */
  width: 4%;
  height: 4%;
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
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin-top: 10px;
  }

.script-selector {
  margin-bottom: 10px;
}

/* Score Tracker Styling */
.score-tracker {
  margin: 10px;
  font-size: 1.2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: medium;
}

.team-one-score {
  margin-right: 80px;
}

.team-one-score, .team-two-score {
      text-align: center;
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


  @media only screen and (max-width: 600px) {

    .game-play {
      height: 100vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin: 20px;
    }

    .game-box {
      width: 300px;
    }

    .game-map {
      max-width: 150px;
    }

    .score-tracker {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .team-one-score, .team-two-score {
      text-align: center;
    }

    .script-selections {
      max-width: 100%; /* Allow full width on smaller screens */
      padding: 0 10px; /* Add padding to avoid edge-to-edge layout */
      justify-content: center;
      align-items: center;
    }

    .script-selector {
      flex-basis: calc(50% - 20px); /* Two selectors per row, with some spacing */
      text-align: center;

    }
  }

</style>
