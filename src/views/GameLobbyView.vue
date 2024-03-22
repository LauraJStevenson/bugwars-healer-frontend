<template>
  <div id="app" class="game-lobby">
    <div id="card-collection" class="bug-card-collection">
      <div id="card" class="individual-bug-card">
        <h1>Play With Our Scripts</h1>
        <img :src="randomImage" alt="Random Bug Image" class="bug-card-photo" />
        <p>
          <RouterLink to="/gameplay">
            <button type="submit">I'm Ready to Play!</button>
          </RouterLink>
        </p>
      </div>
      <div class="individual-bug-card">
        <h1>Write Your Own Script</h1>
        <img class="bug-card-photo" src="../../public/images/QuestionMark.png" />
        <div>
          <p>
            <RouterLink to="scripteditor">
              <button type="submit">Write Your Script</button>
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const images = ref([
  '../../public/images/Blue-Bug.png',
  '../../public/images/Red-Bug.png',
  '../../public/images/Green-Bug.png',
  '../../public/images/Yellow-Bug.png',
  // Add more image URLs as needed
]);

const randomIndex = ref<number | null>(null);

const randomImage = computed(() => {
  if (randomIndex.value !== null) {
    return images.value[randomIndex.value];
  } else {
    return '';
  }
});

randomIndex.value = Math.floor(Math.random() * images.value.length);
</script>

<style scoped>
h1 {
  text-align: center;
}
.bug-card-photo {
  width: 240px;
  height: 240px;
  flex-shrink: 0;
  border-radius: 5px;
  margin: 5px;
}
.bug-card-collection {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.individual-bug-card {
  border: 2px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 15px;
  width: 325px;
  height: 510px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
button {
  text-transform: uppercase;
  background-color: rgb(247, 171, 101);
  cursor: pointer;
  width: 200px;
  height: 30px;
}
</style>
