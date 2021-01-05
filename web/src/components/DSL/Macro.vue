<template>
  <h1>Mes raccourcis : </h1>
  <PopUp v-if="showModal" v-on:close="showModal = false" :value="type" @input="type = $event"/>
  <br/>
  <div id="reussite">{{reussite}}</div>
  <div v-for="macro in mesMacros" :key="macro">
    <div id="macro">
      <div>Raccourci : {{macro[macro.length-1]}}</div>
      <div v-for="item in macro" :key="item.title">
        <div v-if="item.title === 'Input'">
          <div>Entrez les données concernant ce programme :
            {{item.input}}
            <label>
              <input v-model="message[item.id]">
              <button v-on:click="validation(item.id,macro)">OK</button>
            </label>
          </div>
        </div>
      </div>
      <button v-on:click="use(macro,macro[macro.length-1])">Cliquez ici pour utiliser ce raccourci</button>
      <br/>
    </div>
  </div>
  <br/>
  <router-link active-class="active" to="/dsl">
    <div class="bouton">Retour au langage dédié</div>
  </router-link>
</template>

<script>

import PopUp from "@/components/DSL/PopUpDSL";

export default {
name: "Macro",
  components:{PopUp},
  data(){
    return {
      /** MesMacros : liste des macros créées par l'utilisateur **/
      mesMacros :{},
      message: {},
      /** Reussite : message notifiant de la réussite de l'utilisation d'une macro **/
      reussite: "",
      /** ShowModal : gestion de l'affichage d'un pop up **/
      showModal: false,
      type: ""
    }
  },

  /** Initialise les macros existantes **/
  created() {
    this.mesMacros = this.$store.getters.getMacros;
    console.log("macros: ",this.mesMacros)
  },
  methods:{
    /** Vérifie que la valeur donnée en input est bien un nombre **/
    validation(id,macro){
      const item = macro.find(item => item.id === id);
      if(!isNaN(this.message[item.id])) item.input = this.message[item.id];
      else this.error = 'Le champ est vide';
      this.message[item.id] = "";
      console.log("changement input", this.mesMacros)
    },

    /** Utilisation d'une macro **/
    use(macro,type){
      if(type === "changement d'heure de fermeture des magasins") {
        this.macroChangementHeureFermeture(macro)
      }
      else if(type.substring(0,24)==="déplacement de policiers"){
        this.macroDeplacementPoliciers(macro)
      }
      else if(type === "réinitialisation des horaires de fermeture des magasins") {
        this.reussite = "Horaires réinitialisées";
        this.$store.dispatch('setClosingHour',-1)
      }
    },

    /** Déplacement de policiers en fonction des citoyens via la macro, envoie la requête au store **/
    macroDeplacementPoliciers(macro) {
      let nbCitoyens = Number(macro[4].input);
      let nbPoliciers = Number(macro[6].input);
      let zones = {};
      zones[0] = macro[2].title;
      zones[1] = macro[8].title;
      let infOrSup = "";
      if (macro[3].title === 'Plus grand que') {
        infOrSup = 'sup'
      }
      let regles = this.$store.getters.getRegles;
      let existe = this.verifierExistence('Presence policier',regles);
      console.log("existe :",existe);
      this.reussite ="Déplacement de policiers effectué";
      if(!existe) this.$store.dispatch('deplacerPoliciers', {citoyens: nbCitoyens,
        cond: infOrSup, zone1: zones[0], policiers: nbPoliciers, zone2: zones[1]});
      else {
        this.type = {programme: macro,titre: "Conflit concernant le déplacement des policiers"};
        this.showModal=true
      }
    },

    /** Changement d'horaires des magasins via une macro, envoie une requête au store **/
    macroChangementHeureFermeture(macro){
      this.reussite = "Changement d'heure de fermeture effectué";
      let regles = this.$store.getters.getRegles;
      console.log('regles : ',regles);
      let existe = this.verifierExistence('Fermeture magasins',regles);
      console.log("aled : ",existe);
      if(!existe) this.$store.dispatch('setClosingHour',macro[3].input);
      else {
        this.type = {programme: macro,titre: "Conflit concernant l'heure de fermeture des magasins"};
        this.showModal=true
      }
    },

    /** Vérifie si une règle existe déjà pour éviter les conflits **/
    verifierExistence(titre,regles){
      let existence = false;
      regles.forEach((item)=>{
        console.log(item);
        if(item.titre === titre){
          existence = true
        }
      });
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

.bouton{
  width: 15%;
  border-radius: 50px;
  text-align: center;
  font-family: "Sofia", sans-serif;
  font-size: 18px;
  border: 3px solid #0cb50b;
  cursor: pointer;
  box-shadow: 4px 4px 2px 1px #266027;
}

</style>
