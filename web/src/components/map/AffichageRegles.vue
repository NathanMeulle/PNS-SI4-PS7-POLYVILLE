<template>
  <div v-for="regle in regles" :key="regle">
    <div v-if="regle.valeur !== -1">
      <input type="checkbox" id="{{regle.titre}}"  v-model="regle.checked" v-on:click="action(regle)">
      <label>{{regle.titre}}</label>
    </div>
  </div>
</template>

<script>
import store from "../../store/store";

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
        if(!regle.checked) this.$store.dispatch('setClosingHour',regle.valeur)
        else this.$store.dispatch('setClosingHour',-1)
      }
      if (regle.titre === "Presence policier"){
        if (regle.checked) {
          store.commit({
            type: "stopDisplayPolice"
          });
        }
        else {
          store.commit({
            type: "displayPolice"
          });

        }
      }
    }
  }

}
</script>

<style scoped>

</style>
