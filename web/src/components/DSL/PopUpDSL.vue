<template>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              {{type}}
              <br/>
            </slot>
          </div>
          <br/>
          <div class="modal-type">
            <slot name="header">
              {{texte}}
            </slot>
            <slot name="header" v-if="type==='Conflit concernant l\'heure de fermeture des magasins'">
              <br/>
                <button class="choix" v-on:click="changerHeureFermeture(choix.apres),$emit('close')" v-if="choix.apres!==-1">{{choix.apres}}h</button>
              <button class="choix" v-on:click="changerHeureFermeture(choix.apres),$emit('close')" v-else>Réinitialiser les horaires</button>
              <button class="choix" v-on:click="changerHeureFermeture(choix.avant),$emit('close')">{{choix.avant}}h</button>
            </slot>
            <slot name="header" v-if="type==='Conflit concernant le déplacement des policiers'">
              <br/>
              <button class="choix" v-on:click="changerPoliciers(choix.avant),$emit('close')">{{choix.avant}}</button>
              <button class="choix" v-on:click="changerPoliciers(choix.apres),$emit('close')">{{choix.apres}}</button>
            </slot>
          </div>
          <br/>
          <div class="modal-header">
            <div class="modal-default-button" @click="$emit('close')">
              fermer
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "PopUp",
  data(){
    return{
      type:"",
      programme: Array,
      texte: "",
      choix: {}
    }
  },
  props:{
    value : Object
  },
  computed : {
  },
  methods : {
    afficherConflit(){
      if(this.type === "Conflit concernant l'heure de fermeture des magasins") this.conflitHeureFermeture()
      else if (this.type === "Conflit concernant le déplacement des policiers") this.conflitPoliciers()
    },
    conflitPoliciers(){
      let tab = this.$store.getters.getReglePoliciers
      console.log(tab)
      this.texte = "Une règle (n°1) concernant le déplacement de policiers dans une zone est déjà en place : "+tab[2]+" policiers "+
          tab[3]+" pour "+tab[0]+" citoyens "+tab[1]+"." +
          "\nVous avez essayé d'appliquer la règle suivante (n°2) : "+this.programme[6].input+" policiers "+
          this.programme[8].title+" pour "+this.programme[4].input+" citoyens "+this.programme[2].title+"."+
          "\nQuelle règle voulez vous appliquer ?"
      this.choix = {avant: "Règle n°1", apres: "Règle n°2"}
    },
    conflitHeureFermeture(){
      let heure = this.$store.getters.getRegleHeureFermeture
      if(heure!== -1) {
        this.texte = "Une règle modifiant l'heure de fermeture est déjà en place pour : " + heure + "h." +
            "\nVous avez essayé d'appliquer une nouvelle règle pour : " + this.programme[3].input + "h." +
            "\nQuelle heure voulez vous choisir ?"
      }
        else{
          this.texte = "Une règle modifiant l'heure de fermeture est déjà en place pour : réinitialiser les horaires." +
            "\nVous avez essayé d'appliquer une nouvelle règle pour : " + this.programme[3].input + "h." +
            "\nQuelle heure voulez vous choisir ?"
        }
        this.choix = {avant: Number(this.programme[3].input), apres: heure}
        console.log(this.choix)
    },
    changerHeureFermeture(heure){
      this.$store.dispatch('setClosingHour',heure)
    },
    changerPoliciers(regle){
      if(regle === "Règle n°2"){
        if(this.programme[3].title === 'Plus grand que'){
          this.$store.dispatch('deplacerPoliciers', {
            citoyens: this.programme[4].input,
            cond: 'sup', zone1: this.programme[2].title, policiers: this.programme[6].input, zone2: this.programme[8].title})
        }
      }
    }

  },
  created() {
    console.log("creation",this.value)
    this.type = this.value.titre
    this.programme = this.value.programme
    console.log("type : ",this.type)
    console.log("prog : ",this.programme)
    this.afficherConflit()
  }
}
</script>

<style scoped>




.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  height: 220px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  border: 3px solid #0cb50b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  color: #1f1e1f;
  font-family: "Sofia", sans-serif;
  font-size: 18px;
}

.modal-default-button {
  float: right;
  width: 30%;
  float: right;
  border-radius: 50px;
  margin: auto;
  text-align: center;
  color: #0cb50b;
  font-family: "Sofia", sans-serif;
  font-size: 18px;
  border: 3px solid #0cb50b;
  cursor: pointer;
  box-shadow: 4px 4px 2px 1px #266027;
}
.modal-default-button:hover {
  border: 5px solid #0cb50b;
  background-color : lightgrey;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.choix{
  margin-top: 5%;
  margin-left: 5%;
}

</style>
