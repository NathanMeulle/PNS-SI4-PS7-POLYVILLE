<template>
    <div class="split NW">
  <div>
    Nom de l'événement :
    <input v-model="NomEvenement" placeholder="Titre de l'événement" maxlength="24"/>
  </div>
  <br />
  <div>
    Nom du point d'intérêt où appliquer l'événement :
    <input v-model="NomPointInteret" placeholder="Nom de votre établissement" maxlength="24"/>
  </div>
  <br />
  <span>Description : </span>
  <textarea v-model="Description" placeholder="Description"></textarea><br />
  <br />
 
  <div>
    Logo : 
    <em id="icon0" class="fas fa-exclamation-circle" v-on:click="[Logo = 'fas fa-exclamation-circle', checkColorIcons('icon0')]">&emsp;</em>
    <em id="icon1" class="fas fa-clock" v-on:click="[Logo = 'fas fa-clock', checkColorIcons('icon1')]" >&emsp;</em>
    <em id="icon2" class="fas fa-beer" v-on:click="[Logo = 'fas fa-beer', checkColorIcons('icon2')]">&emsp;</em>
    <em id="icon3" class="fas fa-gift" v-on:click="[Logo = 'fas fa-gift', checkColorIcons('icon3')]">&emsp;</em>
    <em id="icon4" class="fas fa-music" v-on:click="[Logo = 'fas fa-music', checkColorIcons('icon4')]">&emsp;</em>
    <em id="icon5" class="fas fa-ad" v-on:click="[Logo = 'fas fa-ad', checkColorIcons('icon5')]">&emsp;</em>
  </div>
  <br />
  <div> Coordonnées :
      <button v-on:click="showMap">Afficher la carte</button>
      <p>Les coordonnées de l'évenements sont : {{coord}}</p>
  </div>

  <div v-if="regle!==''">
    Regle : {{regle}}
  </div>
    <button v-on:click="validation">Validation</button>
  <div>{{valid}}</div>
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
    <div class="map" style="height: 50vh; width: 30%;">
        <l-map
                v-model="zoom"
                v-model:zoom="zoom"
                :center="[43.6154, 7.0719]"
                v-model:maxZoom="maxZoom"
                v-model:minZoom="minZoom"
                v-model:maxBounds="maxBounds"
                v-on:click="sendLatLng"
        >
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" style="z-index: -5"/>
            <l-control-layers style="z-index: -5" />
            <div v-if="markerCreated">
                <Marker v-bind:position="getPosition"
                        v-bind:msg="'Position Événement'"
                />
            </div>
        </l-map>
    </div>
    </div>
    <PopUpMap v-if="displayPopUp" @close="displayPopUp = false"/>


</template>

<script>




import InterpreteurEvent from "./InterpreteurEvent";
import store from "../../store/store";
import {LControlLayers, LMap, LTileLayer} from "../../../node_modules_intern/@vue-leaflet/vue-leaflet";
import Marker from "../map/Marker";
import PrintEvent from "./PrintEvent.vue";
import PopUpMap from "./PopUpMap";

export default {
name: "EventPage",
  components: {
    PopUpMap,
    InterpreteurEvent,
    LMap,
    LTileLayer,
    LControlLayers,
    Marker,
    PrintEvent,
  },
  data() {
    return {
      markerCreated: false,
      displayPopUp: false,
      valid: "",
      NomPointInteret: "",
      NomEvenement: "",
      Description: "",
      Logo:"fas fa-exclamation-circle",
        coord : [],
        zoom: 14,
        maxZoom: 18,
        minZoom: 13,
        maxBounds: [
            [43.5904, 7.0419],
            [43.6404, 7.100],
        ],
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
            console.log(this.coord[0])
            if(this.NomEvenement === "") this.valid = "Veuillez rentrer un nom pour votre événement"
            else if (this.coord[0] === undefined && this.NomPointInteret === "") this.valid = "Veuillez rentrer une position ou un" +
                " point d'intérêt pour votre événement"
            else this.valid = "Evénement enregistré"
            store.commit({
                type: "addEvent",
                name: this.NomEvenement,
                description: this.Description,
                coordonate: this.coord,
                regle: this.regle,
            })
        },
        showMap(){
            this.displayPopUp=true;
        },
        sendLatLng(event){
            if(event.latlng != null) {
                this.markerCreated = true

                console.log("sent2 : ", event.latlng);
                this.coord = [event.latlng.lat, event.latlng.lng]
                store.commit({
                    type: "addPosition",
                    lat: event.latlng.lat,
                    lng: event.latlng.lng,
                });
            }
            else { this.markerCreated = false}
        },
      ajoutRegle(regle){
          if(regle[0] === "condition affichage"){
            this.regle = "Affichage si le nombre de citoyen en " + regle[2] + " supérieur à " + regle[1]
          }
      }
    },
}
</script>

<style scoped>
    .split {
        height: 30%;
        width: 50%;
        position: fixed;
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
        position: fixed;
        height: 50%;
        width: 99%;
        top:45%;
    }
    .map {
        float: left;
        z-index: -1;
    }
</style>
