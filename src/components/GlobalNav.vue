<template>

  <header>
    <nav>
      <div class="branding">
        <span class="logo"><RouterLink active-class="active" to="/"><img src="/public/images/Logo.png" /></RouterLink></span>
      </div>
        
      <ul v-show="!mobile" class="navigation">  

        <li><RouterLink active-class="active" class="link" to="/">Home</RouterLink></li>


        <li v-if="isAuthenticated">
          <RouterLink active-class="active" class="link" to="/gamelobby">Play</RouterLink>
        </li>


        <li><RouterLink active-class="active" class="link" to="/howtoplay">How to Play</RouterLink></li>


        <li><RouterLink active-class="active" class="link" to="/credits">Credits</RouterLink></li>


        <li>
          <RouterLink active-class="active" class="link" to="/behindthescenes">Behind the Scenes</RouterLink>
        </li>


        <li v-if="isAuthenticated">
          <RouterLink active-class="active" class="link" to="/settings">Settings</RouterLink>
        </li>


        <li v-if="!isAuthenticated" title="Log In">
          <RouterLink active-class="active" class="link" to="/login"><font-awesome-icon icon="arrow-right-to-bracket" /></RouterLink>
        </li>


        <li v-if="!isAuthenticated" title="Register">
          <RouterLink v-if="!isAuthenticated" active-class="active" class="link" to="/register"
            ><font-awesome-icon icon="user-plus" /></RouterLink>
        </li>


        <li v-if="isAuthenticated" title="Log Out">
          <RouterLink @click="handleLogout" class="link" to="/"><font-awesome-icon icon="arrow-right-from-bracket" /></RouterLink>
        </li>
      </ul>
       
      <div>
        <font-awesome-icon icon="bars" @click="toggleMobileNav" v-show="mobile" class="fa-icon" :class="{'icon-active' : mobileNav }" />
      </div>

      <transition name="slide">
        <ul v-show="mobileNav" class="dropdown-nav" @click="closeMobileNav">
            
            <li><RouterLink active-class="active" class="link" to="/">Home</RouterLink></li>

            <li v-if="isAuthenticated">
              <RouterLink active-class="active" class="link" to="/gamelobby">Play</RouterLink>
            </li>

            <li><RouterLink active-class="active" class="link" to="/howtoplay">How to Play</RouterLink></li>

            <li><RouterLink active-class="active" class="link" to="/credits">Credits</RouterLink></li>

            <li>
              <RouterLink active-class="active" class="link" to="/behindthescenes">Behind the Scenes</RouterLink>
            </li>

            <li v-if="isAuthenticated">
              <RouterLink active-class="active" class="link" to="/settings">Settings</RouterLink>
            </li>

            <li v-if="!isAuthenticated">
              <RouterLink active-class="active" class="link" to="/login">Login</RouterLink>
            </li>

            <li v-if="!isAuthenticated">
              <RouterLink v-if="!isAuthenticated" active-class="active" class="link" to="/register"
                >Register</RouterLink
              >
            </li>

            <li v-if="isAuthenticated">
              <RouterLink @click="handleLogout" class="link" to="/">Logout</RouterLink>
            </li>
        </ul>
      </transition>
      
    </nav>
  </header>
</template>


<script lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: "NavigationNav",
  setup() {
    const authStore = useAuthStore();
    const router = useRouter(); 
    
    const mobileNav = ref(false);
    const mobile = ref(true);
    const windowWidth = ref<number | null>(null);

    const toggleMobileNav = () => {
      mobileNav.value = !mobileNav.value;
    };

    const checkScreen = () => {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value && windowWidth.value <= 750) {
        mobile.value = true;
        mobileNav.value = false; // Makes sure to set mobileNav to false when not in use
      } else {
        mobile.value = false;
      }
    };
    
    const handleLogout = () => {
      authStore.logout(router);
    };

    const closeMobileNav = () => {
    mobileNav.value = false;
  };

      // Call checkScreen on component mount
  onMounted(() => {
    checkScreen();
    window.addEventListener('resize', checkScreen);
  });

  // Cleanup on component unmount
  onUnmounted(() => {
    window.removeEventListener('resize', checkScreen);
  });

    return {
      authStore,
      handleLogout,
      scrollPosition: null,
      mobile,
      mobileNav,
      toggleMobileNav,
      closeMobileNav
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
  },
};
</script>


<style scoped>

/* Slide transitions */
  .slide-enter-active, .slide-leave-active {
    transition: .5s ease all;
   }

   .slide-enter-from, .slide-leave-to {
    transform: translateX(-250px);
   }

   .slide-enter-to {
    transform: translateX(0);
}

header {
background-color: #003049;
z-index: 99;
width: 100%;
height: 70px;
position: fixed;
transition: .5s ease all;
color: white;

nav {
  position: relative;
  display: flex;
  flex-direction: row;
  transition: .5s ease all;
  width: 100%;
  margin: 0;
  margin-right: 0;
  height: 70px;
}

ul, .link {

  font-weight: 500;
  color: white;
  list-style-type: none;
  text-decoration: none;
}

li {
  padding: 16px;
  margin-left: 16px;
}

.link {
  font-size: 1em;
  transition: .5s ease all;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
}

.link:hover {
  color: #f77f00;
  border-color: #f77f00;
}

.branding{
  display: flex;

  img {
    width: 70px;
  }
}

.navigation {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  padding-right: 40px;
}

.fa-icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 30%;
  right: 24px;
  height: 40%;
  cursor: pointer;
}

.icon-active {

  transform: rotate(180);
}

.dropdown-nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  max-width: 250px;
  height: 100%;
  background-color: #003049;
  top: 0;
  left: 0;
  margin: 0;
  box-shadow: #f77f00;

  li {
    margin-left: 0;
    margin-top: 1em;
    padding-left: 0;
    
    .link {
      font-size: 17px;
      transition: .5s ease all;
      padding-bottom: 4px;
      border-bottom: 1px solid transparent;
    }
  
    .link:hover {
    color: #f77f00;
    border-color: #f77f00;
   }
  }
}

@media (max-width: 950px){
  .link {
    font-size: .75em;
  }
} 
}

li [title] {
  background-color: #003049;
  border-radius: 5px;
}

</style>
