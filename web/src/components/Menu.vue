<template>
  <div class ="Menu">
      <h1>Menu</h1>
      <router-link to='/map'>
        map
        <i class="fas fa-user-friends"/>
      </router-link>

      <router-link to='/stats'>
        stats
        <i class="far fa-comment-alt"/>
      </router-link>

        <router-link to='/dsl'>
        dsl
        <i class="far fa-comment-alt"/>
      </router-link>

  </div>
</template>

<script>
export default {
  name: "Menu",
  props: { //Attribut du composant
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
    border: 1px solid gray;

}
</style>
