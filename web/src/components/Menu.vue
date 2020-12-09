<template>
  <div class="Menu">
    <ul >
      <li>
        <router-link  active-class="active" to="/map">
          <span>Carte</span>
        </router-link>
      </li>
      <li>
        <router-link  active-class="active"  to="/stats">
          Stats
        </router-link>
      </li>
      <li>
        <router-link  active-class="active" to="/dsl">
          DSL
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    //Attribut du composant
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Menu {
  position: absolute;
  right: 10px;
  top: 5px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 100px;
  background-color: #f1f1f1;
}

li a {
  display: block;
  color: #000;
  padding: 16px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #555;
  color: white;
}

.active {
   background-color: #a8faaa;
   cursor: pointer;
 }

</style>
