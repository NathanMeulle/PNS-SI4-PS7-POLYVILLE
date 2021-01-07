<template>
  <div id="mydsl">
    <Help v-if="modal" v-on:close="modal = false"/>
    <div class="bouton" id="help" v-on:click="modal = true">Aide</div>
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
import Help from "@/components/DSL/Help";

export default {
  name: "MyDsl",
  components: {Interpreteur,Help},
  data(){
    return{
      modal:false,
    }
  },

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
