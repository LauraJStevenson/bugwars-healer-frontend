<template>
  <div class="process">
    <h1>Behind the Scenes</h1>
    
    <section class="text-body">
    <p>Upon launch of this project on December 9th, 2023, Team Healers was born! 
      We are a group of Tech Elevator graduates from varied backgrounds, 
      including education, case management, business administration, 
      tech support, customer service, and accounting. We are a women-led team 
      and have an open-door culture of accountability and positivity.</p>
    <p>Our first action was working together to learn how Continuous Integration / 
      Continuous Deployment works. We chose to use Render and Docker for this project. 
      Our Tech Stack is Spring Boot, PostgreSQL, and Vue3 with Typescript. 
      Laura took ownership of the CI/CD pipeline and configured our repositories and 
      images with test coverage.</p>
    <p>Once we had our pipeline running, we divided our resources and skills into 
      front-end and back-end teams. Yagmur and Kimlyn took ownership of the back-end 
      development, including user registration, login, database creation, authorization, 
      and authentication. Between the two of them, we have functioning authentication 
      on the back-end.</p>
    <p>Ashley and Viviana took ownership of the front-end, including art direction. 
      We utilized Figma to decide as a team on fonts, color schemes, and styling guides 
      for responsive design. Ashley built wireframes and our Vue app, including our Credits 
      & Settings pages as well as the Global Navigation Bar. </p>
    </section>
      <section class="blog-image-container">
        <a href="https://www.figma.com/file/H5yVnPoDudao2avuKk65ea/Style-Guide-%2F%2F-Crusader-Games?type=design&node-id=0-1&mode=design&t=bPRWfp59e0LXwGjn-0" target="_blank">
        <img class="blog-images" src="../../public/images/style-fonts-colors.png" />
        </a>
        <a href="https://www.figma.com/file/H5yVnPoDudao2avuKk65ea/Style-Guide-%2F%2F-Crusader-Games?type=design&node-id=0-1&mode=design&t=bPRWfp59e0LXwGjn-0" target="_blank">
        <img class="blog-images" src="../../public/images/responsive-web-design-figma.png" />
        </a>
        <a href="https://www.figma.com/file/H5yVnPoDudao2avuKk65ea/Style-Guide-%2F%2F-Crusader-Games?type=design&node-id=0-1&mode=design&t=bPRWfp59e0LXwGjn-0" target="_blank">
        <img class="blog-images" src="../../public/images/style-icons.png" />
        </a>
        <a href="https://www.figma.com/file/P8nqI6QG5EORnX5umH18jT/Bug-Wars-Wireframes?type=design&node-id=0%3A1&mode=design&t=KnCVgJtfghiPAYR0-1" target="_blank">
        <img class="blog-images" src="../../public/images/bug-wars-wireframes.png" />
        </a>
      
      </section>
    <section class="text-body">
      <p>Viviana utilized her skills as a pixel artist to draw and design bug sprites for us and built our logo using ideas from AI concepts to design our Logo. 
      She also built the Login and Registration pages. </p>
      </section>
    <section class="blog-image-container">
    <img class="bug-images" src="../../public/images/Red-Bug.png" />
    <img class="bug-images" src="../../public/images/Yellow-Bug.png" />
    <img class="bug-images" src="../../public/images/Green-Bug.png" />
    <img class="bug-images" src="../../public/images/Blue-Bug.png" />
    
    </section>
    <img class="bug-wars-logo" src="../../public/images/Logo.png" />

    <section class="text-body">
    <p>Rob has expressed that he would like to take ownership of testing, including 
      unit and integration tests. He has been doing diligent research on the process 
      of implementing these and will be adding his work to this sprint.</p>
    <p>Laura is our Tech Lead and built the How To Play page, the Play page, and the 
      Behind the Scenes Page you are reading. </p>
    <p>We will be updating this page as the project continues with a blog feature that 
      allows us to share our development process.</p>
    <p>Thank you for reading about us and following our journey through this project!</p>
    </section>
  </div>
</template>
  
  <style scoped>
.process {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

h1 {
  font-family: 'Press Start 2P', 'Space Mono', Arial, Helvetica, sans-serif;
}
.text-body{
  text-align: left;
  padding: 30px;
}
p{
  padding: 10px;
}
.blog-image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.blog-images {
  border: 2px solid black;
  border-radius: 4px;
  padding: 1px;
  width: 350px;
  padding: 15px;
  margin: 15px;
}
.bug-images {
  border-radius: 4px;
  padding: 1px;
  width: 220px;
}
.bug-wars-logo {
  border-radius: 4px;
  padding: 1px;
  width: 400px;
}
.blog-images:hover{
  box-shadow: 0 0 2px 1px rgba(238, 78, 5, 0.795);
}
</style>
  
  <script setup lang="ts">
</script>
  