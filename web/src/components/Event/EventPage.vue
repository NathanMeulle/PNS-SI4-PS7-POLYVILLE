<template>
  <div>
    Nom du point d'intérêt où appliquer l'événement
    <input v-model="NomPointInteret" placeholder="Nom de votre établissement" />
  </div>
  <div>
    Nom de l'événement
    <input v-model="NomEvenement" placeholder="Titre de l'événement" />
  </div>
  <br />
  <span>Description</span>
  <textarea v-model="Description" placeholder="Description"></textarea>
  <div>
    Logo
    <input v-model="Logo" placeholder="logo par défaut" />
  </div>
  <br />


  <PrintEvent
    :NomPointInteret="NomPointInteret"
    :NomEvenement="NomEvenement"
    :Description="Description"
    :Logo="Logo"
  ></PrintEvent>
  <button v-on:click="validation()">Validation</button>
</template>

<script>
import PrintEvent from "./PrintEvent.vue";
export default {
  components: { PrintEvent },
  name: "EventPage",
  data() {
    return {
      NomPointInteret: "",
      NomEvenement: "",
      Description: "",
      Logo:"",
    };
  },
  methods: {
    validation() {

    },
  },
};
</script>

<style scoped>
</style>
