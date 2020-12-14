<template>
  <div>
    <router-link active-class="active" to="/dsl/aide" id="help">
      <button>Aide</button>
    </router-link>
    <h1>Langage dédié</h1>
    <Interpreteur/>
  </div>
</template>

<script>

import Interpreteur from "@/components/DSL/Interpreteur";

export default {
    name:"MyDsl",
  components: {Interpreteur},

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
