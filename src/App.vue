<template>
  <nav>
    <router-link to="/">Otsing</router-link>
    <router-link v-if="isLoggedIn" to="/home">Kodu</router-link>
    <router-link v-if="isLoggedIn" to="/products">Minu tooted</router-link>
    <router-link to="/help">Abi</router-link>
    <router-link v-if="!isLoggedIn" to="/login">Logi sisse</router-link>
    <router-link v-if="isLoggedIn" @click="handleLogout" to="/#">Logi välja</router-link>

  </nav>
  <router-view/>
</template>

<script>
import router from "@/router";

export default {

  data() {
    return{
      isLoggedIn: false
    }
  },

  methods:{
    updateNavBar() {
      this.isLoggedIn = sessionStorage.getItem('userId') !== null
    },

    handleLogout(){
      sessionStorage.clear()
      router.push({name:'search'})
    },

  },

  watch: {
    $route: "updateNavBar"
  },


}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: #eeeeee;
  text-decoration: none;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 15px;
}

nav a.router-link-exact-active {
  color: #bdbdbd;
}

</style>
