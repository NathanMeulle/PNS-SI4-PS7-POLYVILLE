<template>
    <h1>Welcome to Polyville !</h1>
  <router-view></router-view>
  <Menu></Menu>
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

</style>
