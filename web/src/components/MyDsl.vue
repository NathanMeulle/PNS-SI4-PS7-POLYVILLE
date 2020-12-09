<template>
  <div>
   Hello from DSL
    <DragDrop/>
  </div>
</template>

<script>

import DragDrop from "@/components/DSL/DSL";

export default {
    name:"MyDsl",
  components: {DragDrop},

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
