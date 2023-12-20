<!-- RegistrationSuccess.vue -->
<template>
    <div>
      <h2>Registration Successful!</h2>
      <p>Welcome, {{ username }}! Your registration was successful.</p>
    </div>
  </template>
  
  <script>
  export default {
    props: ['username'],
  };
  </script>
  
  <style>
  /* Your component-specific styles here */
  </style>