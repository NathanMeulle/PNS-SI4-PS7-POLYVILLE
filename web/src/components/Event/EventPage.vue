<template>
  <div> Nom du point d'intérêt où appliquer l'événement
      <input v-model="NomPointInteret" placeholder="modifiez-moi">
    <p>Le message est : {{ NomPointInteret }}</p>
  </div>
  <div> Nom de l'événement
      <input v-model="NomEvenement" placeholder="modifiez-moi">
    <p>Le message est : {{ NomEvenement }}</p>
  </div>

<span>Le message multiligne est :</span>
<textarea v-model="Description" placeholder="ajoutez plusieurs lignes"></textarea>
<br>

  <p style="white-space: pre-line;">{{ Description }}</p>

  <InterpreteurEvent/>

</template>

<script>



import InterpreteurEvent from "@/components/Event/InterpreteurEvent";

export default {
name: "EventPage",
  components: {InterpreteurEvent},
  data() {
    return {
        NomPointInteret: "",
        NomEvenement:"",
        Description:"",
    };
}
}
</script>

<style scoped>

</style>
