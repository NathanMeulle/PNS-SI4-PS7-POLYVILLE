<template>
  <div>
    <h1>Bienvenue à Polyville !</h1>
    <router-view></router-view>
    <Menu></Menu>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
export default {
    components: {
      Menu
    }
  };
</script>

<style>
body {
  background-color: #eeeeee;
  font-family: "Montserrat", sans-serif;
  display: grid;
  grid-template-rows: auto;
}
</style>
