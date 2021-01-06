<template>
  <PopUp v-if="showModal" v-on:close="showModal = false" :value="type" @input="type = $event"/>
  <div v-if="error!==''">
    <br/>
      <p class="shake" id="error">{{error}}</p>
  </div>
  <div v-else>
    <br/>
    <span id="reussite">{{reussite}}</span>
  </div>
  <br/>
  <DSL v-on:launch="getData($event,false)" v-on:macro="getData($event,true)"/>
</template>

<script>

import DSL from "@/components/DSL/DSL";
import PopUp from "@/components/DSL/PopUpDSL.vue"
import MethodesInterpreteur from "@/functions/MethodesInterpreteur";

export default {
  name: "Interpreteur",
  components: {DSL,PopUp},
  extends: MethodesInterpreteur,
  data(){
    return{
      /** Programme : programme reçu par le DSL **/
      programme:{},
      zones: {},
      infOrSup: '',
      heure: -1,
      /** Error : message d'erreur **/
      error: "",
      /** Reussite : message notifiant de la réussite de l'application du programme **/
      reussite: "",
      /** Macro : boolean signifiant si l'on veut créer une macro ou non **/
      macro: false,
      /** ShowModal : gestion de l'apparition d'un pop up **/
      showModal: false,
      type: ""
    }
  },

  methods:{
    /** Récupération du programme et lancement de la vérification des erreurs **/
    getData(listeCommandes,macro){
      this.macro = macro;
      this.error = "";
      this.reussite = "";
      this.programme = listeCommandes;
      if(this.programme.length===0) this.error="Programme vide";
      else {
        this.lancement()
      }
      if(this.error === "" && this.reussite === "") this.error = "Programme inconnu"
    }
  }

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
