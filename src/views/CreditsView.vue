<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue';
</script>

<template>
  <div class="credits">
    <!-- Font imports -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
      rel="stylesheet"
    />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
      rel="stylesheet"
    />

    <h1>Credits</h1>

    <p>Summary of who our team is.</p>

    <div class="card-collection">
      <div class="individual-card">
        <img class="card-photo" src="../../public/images/img-placeholder.svg" />
        <h2>Name Name</h2>
        <h3>Software Developer</h3>
        <p>Contributions to the this project will go here.</p>
        <ul>
          <li><a href="https://www.github.com">Name's LinkedIn</a></li>
          <li><a href="https://www.linkedin.com">Name's Github</a></li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/img-placeholder.svg" />
        <h2>Name Name</h2>
        <h3>Software Developer</h3>
        <p>Contributions to the this project will go here.</p>
        <ul>
          <li><a href="https://www.github.com">Name's LinkedIn</a></li>
          <li><a href="https://www.linkedin.com">Name's Github</a></li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/img-placeholder.svg" />
        <h2>Name Name</h2>
        <h3>Software Developer</h3>
        <p>Contributions to the this project will go here.</p>
        <ul>
          <li><a href="https://www.github.com">Name's LinkedIn</a></li>
          <li><a href="https://www.linkedin.com">Name's Github</a></li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/img-placeholder.svg" />
        <h2>Name Name</h2>
        <h3>Software Developer</h3>
        <p>Contributions to the this project will go here.</p>
        <ul>
          <li><a href="https://www.github.com">Name's LinkedIn</a></li>
          <li><a href="https://www.linkedin.com">Name's Github</a></li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/img-placeholder.svg" />
        <h2>Name Name</h2>
        <h3>Software Developer</h3>
        <p>Contributions to the this project will go here.</p>
        <ul>
          <li><a href="https://www.github.com">Name's LinkedIn</a></li>
          <li><a href="https://www.linkedin.com">Name's Github</a></li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/img-placeholder.svg" />
        <h2>Name Name</h2>
        <h3>Software Developer</h3>
        <p>Contributions to the this project will go here.</p>
        <ul>
          <li><a href="https://www.github.com">Name's LinkedIn</a></li>
          <li><a href="https://www.linkedin.com">Name's Github</a></li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/img-placeholder.svg" />
        <h2>Name Name</h2>
        <h3>Software Developer</h3>
        <p>Contributions to the this project will go here.</p>
        <ul>
          <li><a href="https://www.github.com">Name's LinkedIn</a></li>
          <li><a href="https://www.linkedin.com">Name's Github</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.credits {
  font-family: 'Space Mono', Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-family: 'Press Start 2P', 'Space Mono', cursive;
}

.card-collection {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.individual-card {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 15px;
  width: 300px;
  height: 400px;
}

.card-photo {
  width: 25%;
  height: 25%;
}

ul {
  list-style: none;
  display: flex;
}

li {
  text-decoration: none;
  margin: 10px;
}
</style>
  