<template>
  <nav>
    <router-link to="/"></router-link>
    <router-link to="/login">Logi sisse</router-link> |
    <router-link to="/login">Logi välja</router-link> |
    <router-link to="/home">Kodu</router-link>
  </nav>
  <router-view/>
</template>

<script>
export default {




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
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
