<script setup lang="ts">
</script>

<template>
  <div class="credits">
    <p class="title">
      We are Team Healer of
      <a class="cg-link" href="https://www.crusadergames.net/about">Crusader Games </a>
    </p>
    <p>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 0H8V4H12V0H14V4H16V7H18V9H16V11H20V13H16V15H18V17H16V20H4V17H2V15H4V13H0V11H4V9H2V7H4V4H6V0ZM14 6H6V9H14V6ZM9 11H6V18H9V11ZM11 18H14V11H11V18Z"
          fill="black"
        />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 7H0V5H2V7Z" fill="black" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 17V19H0V17H2Z" fill="black" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18 17H20V19H18V17Z" fill="black" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18 7V5H20V7H18Z" fill="black" />
      </svg>
    </p>

    <div class="card-collection">
      <div class="individual-card">
        <img class="card-photo" src="../../public/images/laura-img.jpg" />
        <h1>Laura Stevenson</h1>
        <h3>Tech Lead / Full Stack Developer</h3>
        <p class="contribution">Contributions:</p>
        <ul>
          <li>
            <a class="contact-link" href="https://www.linkedin.com/in/laurajstevenson/">LinkedIn</a>
          </li>
          <li>
            <a class="contact-link" href="https://github.com/LauraJStevenson">GitHub</a>
          </li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/ashley-img.jpg" />
        <h1>Ashley Mical</h1>
        <h3>Full Stack Developer</h3>
        <p class="contribution">Contributions:</p>
        <ul>
          <li>
            <a class="contact-link" href="https://www.linkedin.com/in/ashleymical/">LinkedIn</a>
          </li>
          <li><a class="contact-link" href="https://github.com/micamash">GitHub</a></li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/yagmur-img.jpg" />
        <h1>Yagmur Muslu</h1>
        <h3>Full Stack Developer</h3>
        <p class="contribution">Contributions:</p>
        <ul>
          <li>
            <a class="contact-link" href="https://www.linkedin.com/in/yagmurmuslu/">LinkedIn</a>
          </li>
          <li><a class="contact-link" href="https://github.com/yagmurmuslu">GitHub</a></li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/kimlyn-img.jpg" />
        <h1>Kimlyn De Lara</h1>
        <h3>Full Stack Developer</h3>
        <p class="contribution">Contributions:</p>
        <ul>
          <li>
            <a class="contact-link" href="https://www.linkedin.com/in/kimlyn-de-lara/">LinkedIn</a>
          </li>
          <li>
            <a class="contact-link" href="https://github.com/klyndelara">GitHub</a>
          </li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/viv-img.jpg" />
        <h1>Viviana Valentin</h1>
        <h3>Full Stack Developer</h3>
        <p class="contribution">Contributions:</p>
        <ul>
          <li>
            <a class="contact-link" href="https://www.linkedin.com/in/viviana-valentin/"
              >LinkedIn</a
            >
          </li>
          <li><a class="contact-link" href="https://github.com/Viv-Valentin">GitHub</a></li>
        </ul>
      </div>

      <div class="individual-card">
        <img class="card-photo" src="../../public/images/rob-img.jpg" />
        <h1>Robert Harris</h1>
        <h3>Full Stack Developer</h3>
        <p class="contribution">Contributions:</p>
        <ul>
          <li>
            <a class="contact-link" href="https://www.linkedin.com/in/robjamesharris/">LinkedIn</a>
          </li>
          <li><a class="contact-link" href="https://github.com/RHarris2014">GitHub</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.credits {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

.title {
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;
  font-size: 1.5em;
  text-align: center;
}
.title > a {
  font-size: 1em;
}

h1 {
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;
  font-size: 19px;
}

h2 {
  text-align: center;
}

h3 {
  text-align: center;
  font-size: 15px;
}

svg {
  margin: 5px;
}

.card-collection {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.individual-card {
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

.card-photo {
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  margin: 5px;
}

.contribution {
  text-align: center;
}

ul {
  list-style: none;
  display: flex;
  padding: 0;
}

li {
  margin: 10px;
  background-color: #182328;
  padding: 10px;
  border-radius: 5px;
}

.contact-link {
  background-color: #182328;
}

.contact-link,
.cg-link {
  text-decoration: none;
  color: #d62828;
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;
  font-size: 15px;
}

.contact-link:hover {
  color: #f77f00;
}
</style>
  