<template>
  <div class="split NW">
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
      <button v-on:click="showMap">Afficher la carte</button>
      <p>Les coordonnées de l'évenements sont : {{getPosition}}</p>
    </div>

    <div v-if="regle!==''">
      Regle : {{regle}}
    </div>
    <button v-on:click="validation">Validation</button>
    <div id="reussite" v-if="valid!==''">{{valid}}</div>
    <div id="error" v-else>{{error}}</div>
  </div>
  <div class="split NE">

    <h2>Aperçu de l'événement :</h2>
    <PrintEvent
            :NomPointInteret="NomPointInteret"
            :NomEvenement="NomEvenement"
            :Description="Description"
            :Logo="Logo"
    ></PrintEvent>

  </div>

  <div class="S">
    <InterpreteurEvent v-on:ajoutRegleEvenement="ajoutRegle($event)"/>

  </div>
  <PopUpMap v-if="displayPopUp" @close="displayPopUp = false"/>


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
        regle:"",
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
            if(this.NomEvenement === "") this.error = "Veuillez rentrer un nom pour votre événement"
            else if (this.getPosition[0] === undefined && this.NomPointInteret === "") this.error = "Veuillez rentrer une position ou un" +
                " point d'intérêt pour votre événement"
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

    .split {
        height: 45%;
        width: 50%;
        position: absolute;
        z-index: 1;
        top: 0;
        margin-left: 20px;
        overflow-x: hidden;
    }
    .NW {
        top: auto;
        left: 0;
    }

    /* Control the right side */
    .NE {
        right: 0;
        top: auto;

    }
    .S {
        border-top: 3px solid #0cb50b;
        position: absolute;
        height: 50%;
        width: 99%;
        top: 55%
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


</style>
