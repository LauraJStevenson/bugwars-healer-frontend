<template>
  <div class="game-lobby">
    <h1>Choose Your Bug</h1>
  </div>
  <div class="bug-card-collection">
    <div class="individual-bug-card">
      <img class="bug-card-photo" src="../../public/images/Blue-Bug.png" />
      <h1>Blue Bug</h1>
      <h3>Blue Bug Abilities</h3>
      <label for="option1">
        <input type="radio" id="option1" name="options" />
        Choose this bug!
      </label>
    </div>
    <div class="individual-bug-card">
      <img class="bug-card-photo" src="../../public/images/Green-Bug.png" />
      <h1>Green Bug</h1>
      <h3>Green Bug Abilities</h3>
      <label for="option2">
        <input type="radio" id="option2" name="options" />
        Choose this bug!
      </label>
    </div>
    <div class="individual-bug-card">
      <img class="bug-card-photo" src="../../public/images/Yellow-Bug.png" />
      <h1>Yellow Bug</h1>
      <h3>Yellow Bug Abilities</h3>
      <label for="option3">
        <input type="radio" id="option3" name="options" />
        Choose this bug!
      </label>
    </div>
    <div class="individual-bug-card">
      <img class="bug-card-photo" src="../../public/images/Red-Bug.png" />
      <h1>Red Bug</h1>
      <h3>Red Bug Abilities</h3>
      <label for="option4">
        <input type="radio" id="option4" name="options" />
        Choose this bug!
      </label>
    </div>
  </div>
  <div>
    <h1>Or Make Your Own</h1>
    <div class="individual-bug-card">
      <img class="bug-card-photo" src="../../public/images/QuestionMark.png" />
      <h1>Custom Bug</h1>
      <div>
        <RouterLink to="scripteditor">
          <button type="submit">Choose Your Abilities</button>
        </RouterLink>
      </div>
      <p>
        <label for="option1">
          <input type="radio" id="option5" name="options" />
          Choose this bug!
        </label>
      </p>
    </div>
  </div>
  <p class="gameplay-link"><RouterLink to="/gameplay">I'm Ready to Play!</RouterLink></p>
</template>

<script setup lang="ts"></script>

<style scoped>
.game-lobby {
  padding: 50px;
}
h1 {
  text-align: center;
}
.lobby-placeholder-logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
  height: auto;
  justify-content: center;
  align-items: center;
}
.gameplay-link {
  font-family: 'Space Mono', Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bug-card-photo {
  width: 200px;
  height: 200px;
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
  width: 345px;
  height: 530px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
button {
  text-transform: uppercase;
  background-color: rgb(247, 171, 101);
  cursor: pointer;
}
</style>
