<template>
  <div class="putInLine">
  <div >
    <div>
      Nom de l'événement :
      <input v-model="NomEvenement" placeholder="Titre de l'événement" maxlength="24"/>
    </div>
    <br/>
    <div>
      Nom du point d'intérêt où appliquer l'événement :
      <input id="Nom" v-model="NomPointInteret" placeholder="Nom de votre établissement" maxlength="18"/>
    </div>
    <br/>
    <span>Description : </span>
    <textarea v-model="Description" placeholder="Description"></textarea><br/>
    <br/>

    <div>
      Logo :
      <em id="icon0" class="fas fa-exclamation-circle"
          v-on:click="[Logo = 'fas fa-exclamation-circle', checkColorIcons('icon0')]">&emsp;</em>
      <em id="icon1" class="fas fa-clock" v-on:click="[Logo = 'fas fa-clock', checkColorIcons('icon1')]">&emsp;</em>
      <em id="icon2" class="fas fa-beer" v-on:click="[Logo = 'fas fa-beer', checkColorIcons('icon2')]">&emsp;</em>
      <em id="icon3" class="fas fa-gift" v-on:click="[Logo = 'fas fa-gift', checkColorIcons('icon3')]">&emsp;</em>
      <em id="icon4" class="fas fa-music" v-on:click="[Logo = 'fas fa-music', checkColorIcons('icon4')]">&emsp;</em>
      <em id="icon5" class="fas fa-ad" v-on:click="[Logo = 'fas fa-ad', checkColorIcons('icon5')]">&emsp;</em>
    </div>
    <br/>
    <div> Coordonnées :
      <button v-on:click="showMap" id="popupMap"  class="bouton">Afficher la carte</button>
    </div>

    <div id="reussite" v-if="valid!==''">{{valid}}</div>
    <div id="error" v-else>{{error}}</div>
  </div>
  <div class = "shiftRight">
    <h2>Aperçu de l'événement :</h2>
    <PrintEvent
            :NomPointInteret="NomPointInteret"
            :NomEvenement="NomEvenement"
            :Description="Description"
            :Logo="Logo"
            :Regle="regle"
    ></PrintEvent>
</div>

  </div>
  <div class= "centerDiv">
    <button id ="bouton1" class="bouton" v-on:click="showDSL">Ajouter une règle</button>
  </div>
  <div id="DSL" style = "display: none">

  <div>
    <InterpreteurEvent v-on:ajoutRegleEvenement="ajoutRegle($event)"/>
  </div>
  </div>
  <PopUpMap v-if="displayPopUp" @close="displayPopUp = false"/>
  <button id ="bouton2" class="bouton" v-on:click="validation">Créer l'événement</button>
  <i class="fas fa-sort-down"></i>


</template>

<script>




import InterpreteurEvent from "./InterpreteurEvent";
import store from "../../store/store";
import PrintEvent from "./PrintEvent.vue";
import PopUpMap from "./PopUpMap";

export default {
name: "EventPage",
  components: {
    PopUpMap,
    InterpreteurEvent,
    PrintEvent,
  },
  data() {
    return {
      markerCreated: false,
      displayPopUp: false,
      valid: "",
      error: "",
      NomPointInteret: "",
      NomEvenement: "",
      Description: "",
      Logo:"fas fa-exclamation-circle",
      onClick : false,
      regle: "",
    };
  },
    computed : {
      getPosition() {
        console.log("loading events...");
        console.log("getPos ", this.$store.getters.getPosition);
        return this.$store.getters.getPosition;
      },

    },
    methods : {


        checkColorIcons(id){
            let i = 0;
            while(i <= 5){
                let a = "icon"+i;
                if(a === id){
                    document.getElementById(id).style.color='blue';
                }
                else{
                    document.getElementById(a).style.color='black';
                }
                i++;
            }

        },
        validation() {
            console.log(this.getPosition[0])
            store.commit({
              type : "addLocation",
              location : this.NomPointInteret,
            })
            if(this.NomEvenement === "") this.error = "Veuillez rentrer un nom pour votre événement"
            else if (this.getPosition[0] === undefined && this.NomPointInteret === "" && this.regle==="") this.error = "Veuillez rentrer une position ou un" +
                " point d'intérêt pour votre événement"
            else if (this.$store.getters.getStoreNotFound.interestPoint && !this.$store.getters.getStoreNotFound.storeFounded ) this.error = "Point d'interêt non existant"
            else this.valid = "Evénement enregistré"
            let pos = [this.getPosition[0],this.getPosition[1]]
            store.commit({
                type: "addEvent",
                name: this.NomEvenement,
                logo : this.Logo,
                location : this.NomPointInteret,
                description: this.Description,
                coordonate: pos,
                regle: this.regle,
            })
        },
        showDSL(){
          document.getElementById("DSL").style.display = "block";
          document.getElementById("bouton1").style.display = "none";
        },
        showMap(){
            this.displayPopUp=true;
        },

      ajoutRegle(regle){
          this.regle = regle
      }
    },
}
</script>

<style scoped>
    .putInLine {
      display: flex;
      flex-direction: row;

    }

    .shiftRight{
        width: 50%;
        margin-left: 10%;
    }

    textarea {
      width:90%;
      max-width:90%;
      min-width: 90%;
      max-height:30%;
      min-height:10%;

    }
    #Nom {
      width: 200px;
    }

    #error{
      color: red;
    }
    #reussite{
      color: green;
    }

    .centerDiv{
      margin-top: 50px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
    }

.bouton{
  border-radius: 40px;
  text-align: center;
  font-family: "Sofia", sans-serif;
  font-size: 18px;
  border: 3px solid rgb(13, 88, 57);
  cursor: pointer;
  background-color: rgb(187, 238, 195);
  font-weight: bold;
  width:200px;
  height: 50px;
  box-shadow: 4px 4px 2px 1px #266027;
}

#bouton2{
  margin-top: 5%;
}


</style>
