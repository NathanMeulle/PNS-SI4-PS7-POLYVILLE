<template>
  <div>
    
   Hello from Stats
   <button v-on:click ="print">Afficher nombre de citoyens de la BDD (voir console)</button>
   <HoursChart name="Chez Barreau"/>
  </div>
</template>

<script>
import HoursChart from './stats/HoursChart';
export default {
    name:"MyStats",
    components: {
      HoursChart,
    },
    methods:{
      print(){
          console.log(this.$store.getters.hoursTable(0))
      }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
