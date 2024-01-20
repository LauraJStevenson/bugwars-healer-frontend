<template>
  <div class="script-editor">
    <div><h1>Script Editor Page</h1></div>
    <div class="wrapper">
      <div class="column1">
        <label for="multilineInput"><h3>Write Bug Code Here:</h3></label>
        <textarea class="multilineInput" rows="25" cols="35"></textarea><br />
        <button type="submit" class="button">Save Script</button>
        <RouterLink to="/gameplay">
          <button type="submit" class="button">Play!</button>
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
  </textarea
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
}
@media (max-width: 768px) {
  .wrapper {
    grid-template-columns: 1fr; /* Switch to a single column for smaller screens */
  }
}
</style>
