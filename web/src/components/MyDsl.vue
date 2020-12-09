<template>
  <div>
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
</style>
