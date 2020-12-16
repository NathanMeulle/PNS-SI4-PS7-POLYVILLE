<template>
  <PopUp>ICI</PopUp>
  <div v-if="error!==''">
    <span id="error">{{error}}</span>
  </div>
  <div v-else>
    <span id="reussite">{{reussite}}</span>
  </div>
  <br/>
  <DSL v-on:launch="getData($event,false)" v-on:check="getData($event,true)"/>
</template>

<script>

import DSL from "@/components/DSL/DSL";
import PopUp from "@/components/DSL/PopUp.vue"

export default {
  name: "Interpreteur",
  components: {DSL,PopUp},

  data(){
    return{
      programme:{},
      zones: {},
      infOrSup: '',
      heure: -1,
      error: "",
      reussite: "",
      check: false,
    }
  },

  methods:{
    getData(listeCommandes,check){
      this.check = check
      this.error = ""
      this.programme = listeCommandes
      if(this.programme.length===0) this.error="Programme vide"
      console.log("mon programme : ",this.programme)
      this.Pour()
      this.Si()
    },
    Si(){
      this.checkError()
      if(this.programme[0].title === 'Si'){
        if(this.programme[1].title === 'citoyens') this.SiCitoyens()
        else this.error = 'Programme inconnu'
      }
    },
    SiCitoyens(){
      let nbCitoyens = 0;
      if(this.programme[2].title.substring(0,4) === 'Zone'){
        this.zones[0] = this.programme[2].title
        if(this.programme[3].title === 'Plus grand que'){
          this.infOrSup = 'sup'
          if(this.programme[4].title === 'Input'){
            nbCitoyens = Number(this.programme[4].input)
            if(this.programme[5].title === 'Alors'){
              this.alorsCitoyens(nbCitoyens)
            }
            else this.error = 'Programme inconnu'
          }
          else this.error = "Il faut donner un nombre après la case 'citoyens'"
        }
        else this.error = 'Programme inconnu'
      }
    },
    alorsCitoyens(nbCitoyens){
      let nbPoliciers = 0
      if(this.programme[6].title === 'Input'){
        if(this.programme[7].title === 'policiers') {
          nbPoliciers = Number(this.programme[6].input)
          if (this.programme[8].title.substring(0, 4) === 'Zone') {
            this.zones[1] = this.programme[8].title
            console.log(nbCitoyens,this.infOrSup,this.zones[0],nbPoliciers,this.zones[1])
            this.reussite ="Déplacement de policiers effectué"
            this.$store.dispatch('deplacerPoliciers',{citoyens : nbCitoyens,
              cond : this.infOrSup,zone1 : this.zones[0],policiers : nbPoliciers,zone2: this.zones[1]})
          }
          else this.error = 'Programme inconnu'
        }
        else this.error = 'Programme inconnu'
      }
      else this.error = 'Programme inconnu'
    },
    checkError(){
      let valid = this.checkIfThen()
      if(valid === 1) this.error = 'Il est nécessaire de mettre une case "Alors" si vous avez utilisé une cas "Si" et inversement'
      if(valid === 2) this.error = 'Il est nécessaire de mettre la case "Si" avant la case "Alors"'
    },
    checkIfThen(){
      let posIf = -1
      let posThen = -1
      let presence = false
      this.programme.forEach((item,index)=>{
        if(item.title === "Si") {
          posIf = index
          presence = true
        }
        else if (item.title === "Alors"){
          posThen = index
          presence = true
        }
      })
      if(!presence) return 0
      if(posIf === -1 || posThen === -1) return 1
      if (posIf > posThen) return 2
      return 0
    },
    getHeure(){
      this.programme.forEach((item,index)=>{
        if(item.title === "heures"){
          if(index === 0 || this.programme[index-1].title!== 'Input') this.error = "Il est nécessaire d'écrire une heure"
          else{
            this.heure = Number(this.programme[index-1].input)
          }
        }
      })
    },
    Pour(){
      if(this.programme[0].title === 'Pour tous'){
        if(this.programme[1].title==='magasins') this.forMagasin()
        else this.error = 'Programme inconnu'
      }
    },
    forMagasin(){
      if(this.programme[2].title === "fermeture"){
        this.getHeure()
        if(this.heure === -1) this.error = 'Il faut donner une heure de fermeture'

        else{
          if(!this.check){
            this.reussite = "Changement d'heure de fermeture effectué"
            let regles = this.$store.getters.getRegles
            let existe = this.verifierExistence('Fermeture magasins',regles)
            console.log("existence : ",existe)
            this.$store.dispatch('setClosingHour',this.heure)
          }
          else {
            this.programme[this.programme.length] = "changement d'heure de fermeture des magasins"
            console.log(this.programme)
            this.$store.commit('addMacro', this.programme)
            this.reussite = "Raccourci créé"
          }
        }

      }
      else this.error = 'Programme inconnu'
    },
    verifierExistence(titre,regles){
      let existence = false
      regles.forEach((item)=>{
        console.log("test : ",item.titre,titre)
        if(item.titre === titre){
          console.log("ici")
          existence = true
        }
      })
      return existence
    }
  }
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
