<template>
  <div>
    Nom de l'événement :
    <input v-model="NomEvenement" placeholder="Titre de l'événement" />
  </div>
  <br />
  <div>
    Nom du point d'intérêt où appliquer l'événement :
    <input v-model="NomPointInteret" placeholder="Nom de votre établissement" />
  </div>
  <br />
  <span>Description : </span>
  <textarea v-model="Description" placeholder="Description"></textarea><br />
  <br />
 
  <div>
    Logo : 
    <em class="fas fa-exclamation-circle" v-on:click="Logo = 'fas fa-exclamation-circle'">&emsp;</em>
    <em class="fas fa-clock" v-on:click="Logo = 'fas fa-clock'">&emsp;</em>
    <em class="fas fa-beer" v-on:click="Logo = 'fas fa-beer'">&emsp;</em>
    <em class="fas fa-gift" v-on:click="Logo = 'fas fa-gift'">&emsp;</em>
    <em class="fas fa-music" v-on:click="Logo = 'fas fa-music'">&emsp;</em>
    <em class="fas fa-ad" v-on:click="Logo = 'fas fa-ad'">&emsp;</em>
  </div>
  <br />
  <div> Coordonnées :
        <p>Les coordonnées de l'évenements sont : {{coord}}</p>
  </div>

  <div v-if="regle!==''">
    Regle : {{regle}}
  </div>
    <button v-on:click="validation">Validation</button>
  <div>{{valid}}</div>

  <PrintEvent
    :NomPointInteret="NomPointInteret"
    :NomEvenement="NomEvenement"
    :Description="Description"
    :Logo="Logo"
  ></PrintEvent>

  <p style="white-space: pre-line;">{{ Description }}</p>


  <InterpreteurEvent v-on:ajoutRegleEvenement="ajoutRegle($event)"/>
    <div class="map" style="height: 65vh; width: 59%;">
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
            <Marker
                    v-bind:position="
                             [
                             getPosition[0],
                             getPosition[1],
                             ]"
                    v-bind:msg="'Mon événement'"
            />
        </l-map>
    </div>

</template>

<script>




import InterpreteurEvent from "./InterpreteurEvent";
import store from "../../store/store";
import {LControlLayers, LMap, LTileLayer} from "../../../node_modules_intern/@vue-leaflet/vue-leaflet";
import Marker from "../map/Marker";
import PrintEvent from "./PrintEvent.vue";

export default {
name: "EventPage",
  components: {
    InterpreteurEvent,
    LMap,
    LTileLayer,
    LControlLayers,
    Marker,
    PrintEvent,
  },
  data() {
    return {
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
            console.log(this.$store.getters.getPosition);
            return this.$store.getters.getPosition;
        },
    },
    methods : {
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
        sendLatLng(event){
            console.log(event.latlng);
            this.coord = [event.latlng.lat, event.latlng.lng]
            store.commit({
                type: "addPosition",
                lat: event.latlng.lat,
                lng : event.latlng.lng,
            });
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

    .map {
        float: left;
        z-index: -1;
    }
</style>
