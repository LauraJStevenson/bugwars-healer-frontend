<script setup lang="ts">
</script>

<template>
  <div class="settings">
    <h2>Settings</h2>

    <div class="current-username">
      <span>Username: CurrentUser123</span>
    </div>
    <div class="current-email">
      <span>Email: BugWarsUser@Email.com</span>
    </div>

    <p><br /></p>

    <!--Needs format validation-->
    <div class="form-group">
      <label for="change-username">Change Username:</label>
      <input type="text" id="change-username" placeholder="Enter new username" />
    </div>

    <!--Needs format validation-->
    <div class="form-group">
      <label for="change-password">Change Password:</label>
      <input type="password" id="change-password" placeholder="Enter new password" />
    </div>

    <!--Needs format validation-->
    <div class="form-group">
      <label for="change-email">Change Email:</label>
      <input type="email" id="change-email" placeholder="Enter new email" />
    </div>

    <!--Will need updated once we implement the game functionality-->
    <div class="form-group toggle">
      <label for="music-toggle">Music:</label>
      <input type="checkbox" id="music-toggle" checked />
    </div>

    <p><br /></p>

    <!--The following form will need to be updated with an API request for a users saved bug scripts once we get everything connected -->
    <div class="form-group">
      <h3>Saved Bug Scripts:</h3>
      <ul id="bug-scripts">
        <li class="bug-script">
          <span>Sample Script 1</span>
          <!--<span class="delete-script" onclick="deleteScript(1)">Delete</span>-->
          <span class="delete-script">Delete</span>
        </li>
        <li class="bug-script">
          <span>Sample Script 2</span>
          <!--<span class="delete-script" onclick="deleteScript(1)">Delete</span>-->

          <span class="delete-script">Delete</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>
.settings {
  border: 2px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 50px;
  width: 450px;
  height: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

h2,
h3 {
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;
}

h3 {
  font-size: 0.9em;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
  
}

/*this is to try and make the input fields the same as the reg and login views, but it messes with the checkbox*/ 
/* input{
  height: 2.5em;
    width: 15em;
    border-radius: 5px;
    background-color: rgb(255, 255, 255);
} */

.toggle {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.toggle label {
  margin-right: 10px;
}



ul {
  list-style: none;
  padding: 0;
}

.bug-script {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.delete-script {
  color: #f00;
  cursor: pointer;
}
</style>

<script>
// These will need updated when we have the API ready for saving user bug scripts and pulling user information.

// Logic for pulling username, email...

// function deleteScript(scriptId) {
//   const scriptElement = document.querySelector(`#bug-scripts li[data-script-id="${scriptId}"]`);
//   if (scriptElement) {
//     scriptElement.remove();
//   }
// }
</script>