<template>
  <div v-for="regle in regles" :key="regle">
    <div v-if="regle.valeur !== -1">
      <input type="checkbox" id="checkbox" v-model="checked" v-on:click="action(regle)">
      <label>{{regle.titre}}</label>
    </div>
  </div>
</template>

<script>
export default {
name: "AffichageRegles",
  data(){
    return{
      regles: this.$store.getters.getRegles,
      checked: false,
    }
  },
  methods:{
    action(regle){
      if(regle.titre === "Fermeture magasins"){
        if(!this.checked) this.$store.dispatch('setClosingHour',regle.valeur)
        else this.$store.dispatch('setClosingHour',-1)
      }
    }
  }

}
</script>

<style scoped>

</style>
