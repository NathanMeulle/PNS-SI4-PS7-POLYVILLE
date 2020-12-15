<template>
  <div class="wrapper" style="height: 75vh; width: 100%">
    <div class="map" style="height: 75vh; width: 59%">
      <l-map
              v-model="zoom"
              v-model:zoom="zoom"
              :center="[43.6154, 7.0719]"
              v-model:maxZoom="maxZoom"
              v-model:minZoom="minZoom"
              v-model:maxBounds="maxBounds"
              @move="log('move'+zoom)"
      >
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <l-control-layers/>
        <div v-if="filterOption.includes('Commerces')" class="commerces">
          <Marker
                  v-for="currentMarker in commerceStore"
                  :key="currentMarker.id"
                  :commerce="currentMarker"
                  v-bind:position="[
              currentMarker.position.x,
              currentMarker.position.y,
            ]"
            v-bind:msg="currentMarker.categorie"
            v-bind:name="currentMarker.nom"
            v-bind:id="currentMarker.id"
            @displayhours="displayHours=true"
            @click="toDisplay('Bienvenue ' + id)"
          />
        </div>

        <div v-if="filterOption.includes('Parking')" class="parkings">
          <Marker
                  v-for="currentParking in parkingStore"
                  :key="currentParking.id"
                  :parking="currentParking"
                  v-bind:position="[
              currentParking.position.x,
              currentParking.position.y,
            ]"
                  v-bind:msg="'Parking : ' + currentParking.nbPlaces + ' places'"
                  v-bind:iconType="'Parking'"
                  v-bind:id="currentParking.id"
                  @displayhours="displayHours=true"
          />
        </div>

        <Marker v-bind:position="[43.6154, 7.0719]"
                v-bind:msg="'Ma Position'"
                v-bind:iconType="'MyPosition'"
        />

        <div v-if="filterOption.includes('Affluence')" class="Affluence">
          <MyCircle
            v-for="currentCircle in Zones"
            :key="currentCircle.id"
            :lat-lng="[currentCircle.position.x,currentCircle.position.y]"
            v-bind:radius="displayCircle(currentCircle.id)"
            v-bind:color="createColor(currentCircle.id)"
            :fill="true"
            :fillOpacity="0.5"
            :fillColor="createColor(currentCircle.id)"
            @click="toDisplay('Zone :' + currentCircle.id + '\n Nombre de citoyen présent : \n' + nbrCitizenZone(currentCircle.id)+ '\nNombre de policier présent : ' + nbrPolicierZone(currentCircle.id))"

          />
        </div>
        <div v-if="filterOption.includes('Police')" class="police" >
          <Marker v-if="nbrPolicierZoneA>=50" v-bind:position="ZoneA"
                  v-bind:msg="nbrPolicierZoneA + ' policiers'"
                  v-bind:iconType="'Policier'"
          />
          <Marker v-if="nbrPolicierZoneB>=50" v-bind:position="ZoneB"
                  v-bind:msg="nbrPolicierZoneB + ' policiers'"
                  v-bind:iconType="'Policier'"
          />
          <Marker v-if="nbrPolicierZoneC>=50" v-bind:position="ZoneC"
                  v-bind:msg="nbrPolicierZoneC + ' policiers'"
                  v-bind:iconType="'Policier'"
          />
          <Marker v-if="nbrPolicierZoneD>=50" v-bind:position="ZoneD"
                  v-bind:msg="nbrPolicierZoneD + ' policiers'"
                  v-bind:iconType="'Policier'"
          />


        </div>
      </l-map>
    </div>
    <div class="displayer" style="height: 75vh; width: 38%">
      <Displayer v-bind:hours="displayHours"/>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlLayers } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import MyCircle from "../tools/MyCircle";
import Marker from "./Marker";
import Displayer from "./Displayer";
import store from "../../store/store";

export default {
  name: "mapComponent",
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    MyCircle,
    Marker,
    Displayer,
  },
  computed: {
    commerceStore() {
      console.log("loading commerces...");
      return this.$store.getters.loadCommerces;
    },
    parkingStore() {
      console.log("loading parking...");
      return this.$store.getters.loadParkings;
    },
    citizen() {
      console.log("citizens", this.$store.getters.loadCitizens());
      return this.$store.getters.loadCitizens;
    },
    nbrPolicierZoneA() {
      console.log("policier zone A", this.$store.getters.policierZoneA);
      return this.$store.getters.policierZoneA;
    },
    nbrPolicierZoneD() {
      console.log("policier zone D", this.$store.getters.policierZoneD);
      return this.$store.getters.policierZoneD;
    },
    nbrPolicierZoneB() {
      console.log("policier zone D", this.$store.getters.policierZoneB);
      return this.$store.getters.policierZoneB;
    },
    nbrPolicierZoneC() {
      console.log("policier zone D", this.$store.getters.policierZoneC);
      return this.$store.getters.policierZoneC;
    },
  },
  data() {
    return {
      Zones : store.getters.getZones,
      Citizens : store.getters.loadCitizens,
      circleRedPosition: [43.6194, 7.0669],
      zoom: 15,
      maxZoom: 18,
      minZoom: 13,
      maxBounds: [
        [43.6054, 7.0569],
        [43.6254, 7.085],
      ],
      iconWidth: 25,
      iconHeight: 40,
      displayHours : false,
    };
  },
  props: {
    filterOption: {
      type: Array,
      required: true
    },
  },
  methods: {
    nbrCitizenZone(a) {
      console.log("citizen zone", this.$store.getters.citizenZoneA);
      return this.$store.getters.getCitizen(a);
    },
    nbrPolicierZone(a) {
      return this.$store.getters.getPoliciers(a);
    },
    log(a) {
      console.log(a);
    },
    toDisplay(a) {
      this.displayHours=false;
      store.commit({
        type: "setInformation",
        circleinfo: a,
      });
    },
    displayCircle(a){
      let nbrCitizen = this.nbrCitizenZone(a);
      if (nbrCitizen>400) {
        return 400
      }
      else {
        return nbrCitizen
      }
    },
    createColor(a){
      let nbrCitizen = this.nbrCitizenZone(a);
      if(nbrCitizen<400){
        return "#13db20"
      }
      else {
        if (nbrCitizen<1000) {
          return "#db8611"
        }
        else {
          return "#db1106"
        }
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.displayer {
  float: right;
  position: relative;
  margin-right: 10px;
  border-radius: 10px;
  border: 3px solid #0cb50b;
  background-color: rgba(237, 237, 237, 0.84);

}
.map {
  float: left;
}
.Affluence {
  white-space: pre;
}
</style>
