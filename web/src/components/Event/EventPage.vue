<template>
  <div> Nom du point d'intérêt où appliquer l'événement
      <input v-model="NomPointInteret" placeholder="modifiez-moi">
    <p>Le message est : {{ NomPointInteret }}</p>
  </div>
  <div> Nom de l'événement
      <input v-model="NomEvenement" placeholder="modifiez-moi">
    <p>Le message est : {{ NomEvenement }}</p>
  </div>
  <div> Coordonnées
        <p>Les coordonnées de l'évenements sont : {{coord}}</p>
  </div>

<span>Le message multiligne est :</span>
<textarea v-model="Description" placeholder="ajoutez plusieurs lignes"></textarea>
<br>

  <p style="white-space: pre-line;">{{ Description }}</p>

  <InterpreteurEvent/>
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
                             eventToDisplay[eventToDisplay.length-1][1],
                             eventToDisplay[eventToDisplay.length-1][2],
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

export default {
name: "EventPage",
  components: {
    InterpreteurEvent,
    LMap,
    LTileLayer,
    LControlLayers,
    Marker,
  },
  data() {
    return {
        NomPointInteret: "",
        NomEvenement:"",
        Description:"",
        coord : [],
        zoom: 14,
        maxZoom: 18,
        minZoom: 13,
        maxBounds: [
            [43.5904, 7.0419],
            [43.6404, 7.100],
        ],
        };
    },
    computed : {
        eventToDisplay() {
            console.log("loading events...");
            return this.$store.getters.getEvents;
        },
    },
    methods : {
        sendLatLng(event){
            console.log(event.latlng);
            this.coord = [event.latlng.lat, event.latlng.lng]
            store.commit({
                type: "addEvent",
                lat: event.latlng.lat,
                lng : event.latlng.lng,
            });
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
