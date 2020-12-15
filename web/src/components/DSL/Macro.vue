<template>
  <h1>Mes raccourcis : </h1>
  <br/>
  <div id="reussite">{{reussite}}</div>
  <div v-for="macro in this.mesMacros" :key="macro">
    <div id="macro">
      <div>Raccourci : {{macro[macro.length-1]}}</div>
      <div v-for="item in macro" :key="item.title">
        <div v-if="item.title === 'Input'">
          <div>Entrer les données concernant ce programme :
            <label>
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

export default {
name: "Macro",
  data(){
    return {
      mesMacros :{},
      newMacro:{},
      message: {},
      reussite: ""
    }
  },
  created() {
    this.newMacro = this.$store.getters.getNewMacro
    console.log("nouvelle macro : ",this.newMacro)
    if(this.newMacro !== undefined) this.mesMacros[this.newMacro.length] = this.newMacro
    console.log(this.mesMacros)
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
      console.log("use: ",macro,type)
      console.log(Number(macro[3].input))
      if(type === "changement d'heure de fermeture des magasins" ) {
        this.$store.dispatch('setClosingHour',Number(macro[3].input))
        this.reussite = "Changement d'heure de fermeture des magasins réussie"
      }
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
