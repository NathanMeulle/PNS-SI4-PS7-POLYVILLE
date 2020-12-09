<template>
  <div>
    
   Hello from Stats
   <button v-on:click ="print">Afficher nombre de citoyens de la BDD (voir console)</button>
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
    methods:{
      print(){
          console.log(this.$store.getters.numberOfCitizens)
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
