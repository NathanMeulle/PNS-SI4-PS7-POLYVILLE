<template>
  <div>
    <button v-on:click="oui()">TEST 51 policiers zone A si citoyens > 50</button>
    <router-link active-class="active" to="/dsl/aide" id="help">
      <button>Aide</button>
    </router-link>
    <h1>Langage dédié</h1>
    <Interpreteur/>
  </div>
</template>

<script>

import Interpreteur from "../components/DSL/Interpreteur";

export default {
  name: "MyDsl",
  components: {Interpreteur},

  methods: {
    oui() {
      this.$store.dispatch('deplacerPoliciers', {
        citoyens: 50,
        cond: 'sup', zone1: "Zone A", policiers: 51, zone2: "Zone A"
      })
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #help{
    float : right;
  }

  h1 {
    font-size: 20px;
  }


</style>
