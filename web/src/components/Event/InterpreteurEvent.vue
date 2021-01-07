<template>
  <div v-if="error!==''">
    <br/>
    <span class="shake" id="error">{{error}}</span>
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
        this.Si()
        this.Pour()
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
  .shake {
    animation: .8s shake ease alternate;
    animation-name: shake;
  }
  #reussite{
    color: green;
  }
  #reussite{
    color: green;
  }
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
      transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
      transform: translate3d(4px, 0, 0);
    }
  }
</style>
