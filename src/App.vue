<template>
  <div id="app">
    <!--<router-link to="/">[Home]</router-link>
    <router-link to="/restaurant">[Restaurant]</router-link>
    <router-link to="/hello">[HelloWorld]</router-link>
    <router-link to="/menu">[Menu]</router-link>-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app{
  font-family:Arial, Helvetica, sans-serif;
}
</style>
