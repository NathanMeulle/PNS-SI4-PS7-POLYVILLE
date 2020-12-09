<template>
  <div>
   Hello from Stats
   <MonthlySalesChart/>
  </div>
</template>

<script>
import MonthlySalesChart from './stats/MonthlySalesChart';
export default {
    name:"MyStats",
    components: {
      MonthlySalesChart,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
