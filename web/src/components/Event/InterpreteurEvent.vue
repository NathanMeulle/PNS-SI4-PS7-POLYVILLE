<template>
  <div v-if="error!==''">
    <br/>
    <span id="error">{{error}}</span>
  </div>
  <div v-else>
    <br/>
    <span id="reussite">{{reussite}}</span>
  </div>
  <DSLEvent v-on:launchEvent="getProg($event)" />
</template>

<script>



import DSLEvent from "./DSLEvent";
import MethodesInterpreteur from "@/functions/MethodesInterpreteur";

export default {
  name: "InterpreteurEvent",
  components: {DSLEvent},
  extends: MethodesInterpreteur,
  data(){
    return{
      /** Error : message d'erreur **/
      error: "",
      /** Reussite : message notifiant de la réussite de l'application du programme **/
      reussite: "",
      programme: {},
      zones: {},
    }
  },
  methods:{
    getProg(programme){
      this.programme = programme
      if(this.programme.length===0) this.error="Programme vide";
      else {
        console.log("mon programme : ", this.programme)
        this.lancement()
      }
      if(this.error === "" && this.reussite === "") this.error = "Programme inconnu"
    }
  },
}
</script>

<style scoped>
#error{
  color: red;
}

#reussite{
  color: green;
}
</style>
