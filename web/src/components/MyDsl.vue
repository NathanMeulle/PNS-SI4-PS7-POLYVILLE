<template>
  <div id="mydsl">
    <router-link active-class="active" to="/dsl/aide">
      <div class="bouton" id="help">Aide</div>
    </router-link>
    <h1>Langage dédié</h1>
    <span>Glissez et déposez les cases dans la partie nommée "Mon programme" ou cliquez sur la flèche</span>
    <br/>
    <router-link active-class="active" to="/dsl/macro" id="macro">
      <button class="bouton">Accéder à mes raccourcis</button>
    </router-link>
    <Interpreteur/>
  </div>
</template>

<script>

import Interpreteur from "../components/DSL/Interpreteur";

export default {
  name: "MyDsl",
  components: {Interpreteur},

  methods:{
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bouton{
  border-radius: 50px;
  text-align: center;
  font-family: "Sofia", sans-serif;
  font-size: 18px;
  border: 3px solid #0cb50b;
  cursor: pointer;
  box-shadow: 4px 4px 2px 1px #266027;
}

  #help{
    float : right;
    width: 10%;
  }

  h1 {
    font-size: 20px;
  }

  #mydsl{
    margin-top: -1%;
  }


</style>
