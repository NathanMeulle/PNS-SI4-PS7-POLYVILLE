<template>
  <h1>Mes raccourcis : </h1>
  <PopUp v-if="showModal" v-on:close="showModal = false" :value="type" @input="type = $event"/>
  <br/>
  <div id="reussite">{{reussite}}</div>
  <div v-for="macro in this.mesMacros" :key="macro">
    <div id="macro">
      <div>Raccourci : {{macro[macro.length-1]}}</div>
      <div v-for="item in macro" :key="item.title">
        <div v-if="item.title === 'Input'">
          <div>Entrer les données concernant ce programme :
            <label>
              {{item.input}}
              <input v-model="this.message[item.id]">
              <button v-on:click="validation(item.id,macro)">OK</button>
            </label>
          </div>
        </div>
      </div>
      <button v-on:click="use(macro,macro[macro.length-1])">Cliquer ici pour utiliser ce raccourci</button>
      <br/>
    </div>
  </div>
  <br/>
  <router-link active-class="active" to="/dsl">
    <button>Retour au langage dédié</button>
  </router-link>
</template>

<script>

import PopUp from "@/components/DSL/PopUpDSL";

export default {
name: "Macro",
  components:{PopUp},
  data(){
    return {
      mesMacros :{},
      message: {},
      reussite: "",
      showModal: false,
      type: ""
    }
  },
  created() {
    this.mesMacros = this.$store.getters.getMacros
    console.log("macros: ",this.mesMacros)
  },
  methods:{
    validation(id,macro){
      const item = macro.find(item => item.id === id)
      if(!isNaN(this.message[item.id])) item.input = this.message[item.id]
      else this.error = 'Le champ est vide'
      this.message[item.id] = ""
      console.log("changement input", this.mesMacros)
    },
    use(macro,type){
      if(type === "changement d'heure de fermeture des magasins") {
        this.reussite = "Changement d'heure de fermeture effectué"
        let regles = this.$store.getters.getRegles
        console.log('regles : ',regles)
        let existe = this.verifierExistence('Fermeture magasins',regles)
        console.log("aled : ",existe)
        if(!existe) this.$store.dispatch('setClosingHour',macro[3].input)
        else {
          this.type = {programme: macro,titre: "Conflit concernant l'heure de fermeture des magasins"}
          this.showModal=true
        }
      }
      else if(type === "réinitialisation des horaires de fermeture des magasins") this.$store.dispatch('setClosingHour',-1)
    },
    verifierExistence(titre,regles){
      let existence = false
      regles.forEach((item)=>{
        if(item.titre === titre){
          existence = true
        }
      })
      return existence
    }
  }
}
</script>

<style scoped>

#macro{
  border: 1px solid black;
}

#reussite{
  color: green;
}

</style>
