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
                  :lat-lng="ZoneA"
                  v-bind:radius="displayCircle(nbrCitizenZoneA)"
                  v-bind:color="createColor(nbrCitizenZoneA)"
                  :fill="true"
                  :fillOpacity="0.5"
                  :fillColor="createColor(nbrCitizenZoneA)"
                  @click="toDisplay('Zone A \n Nombre de citoyen présent : \n' + nbrCitizenZoneA+ '\nNombre de policier présent : ' + nbrPolicierZoneA)"
          />
          <MyCircle
                  :lat-lng="ZoneB"
                  v-bind:radius="displayCircle(nbrCitizenZoneB)"
                  v-bind:color="createColor(nbrCitizenZoneB)"
                  :fill="true"
                  :fillOpacity="0.5"
                  :fillColor="createColor(nbrCitizenZoneA)"
                  @click="toDisplay('Zone B \n Nombre de citoyen présent : \n' + nbrCitizenZoneB + '\nNombre de policier présent : ' + nbrPolicierZoneB)"
          />
          <MyCircle
                  :lat-lng="ZoneC"
                  :radius="displayCircle(nbrCitizenZoneC)"
                  v-bind:color="createColor(nbrCitizenZoneC)"
                  :fill="true"
                  :fillOpacity="0.5"
                  :fillColor="createColor(nbrCitizenZoneC)"
                  @click="toDisplay('Zone C \n Nombre de citoyen présent : \n' + nbrCitizenZoneC + '\nNombre de policier présent : ' + nbrPolicierZoneC)"
          />
          <MyCircle
                  :lat-lng="ZoneD"
                  :radius="displayCircle(nbrCitizenZoneD)"
                  v-bind:color="createColor(nbrCitizenZoneD)"
                  :fill="true"
                  :fillOpacity="0.5"
                  :fillColor="createColor(nbrCitizenZoneD)"
                  @click="toDisplay('Zone D \n Nombre de citoyen présent : \n' + nbrCitizenZoneD + '\nNombre de policier présent : ' + nbrPolicierZoneD)"
          />
        </div>
        <div v-if="filterOption.includes('Police')" class="police" >
          <Marker v-if="nbrPolicierZoneA>50" v-bind:position="ZoneA"
                  v-bind:msg="nbrPolicierZoneA + ' policiers'"
                  v-bind:iconType="'Policier'"
          />
          <Marker v-if="nbrPolicierZoneB>50" v-bind:position="ZoneB"
                  v-bind:msg="nbrPolicierZoneB + ' policiers'"
                  v-bind:iconType="'Policier'"
          />
          <Marker v-if="nbrPolicierZoneC>50" v-bind:position="ZoneC"
                  v-bind:msg="nbrPolicierZoneC + ' policiers'"
                  v-bind:iconType="'Policier'"
          />
          <Marker v-if="nbrPolicierZoneD>50" v-bind:position="ZoneD"
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
import { LMap, LTileLayer, LControlLayers } from "../../../node_modules_intern/@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import MyCircle from "./MyCircle";
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
    nbrCitizenZoneA() {
      console.log("citizen zone A", this.$store.getters.citizenZoneA);
      return this.$store.getters.citizenZoneA;
    },
    nbrCitizenZoneD() {
      console.log("citizen zone D", this.$store.getters.citizenZoneD);
      return this.$store.getters.citizenZoneD;
    },
    nbrCitizenZoneB() {
      console.log("citizen zone D", this.$store.getters.citizenZoneB);
      return this.$store.getters.citizenZoneB;
    },
    nbrCitizenZoneC() {
      console.log("citizen zone D", this.$store.getters.citizenZoneC);
      return this.$store.getters.citizenZoneC;
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
      ZoneA: [43.6204, 7.0789],
      ZoneB: [43.6204, 7.0619],
      ZoneC: [43.6104, 7.0789],
      ZoneD: [43.6104, 7.0619],
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
    log(a) {
      console.log(a);
    },
    toDisplay(a) {
      store.commit({
        type: "setInformation",
        circleinfo: a,
      });
    },
    displayCircle(a){
      if (a>400) {
        return 400
      }
      else {
        return a
      }
    },
    createColor(nb){
      if(nb<400){
        return "#13db20"
      }
      else {
        if (nb<1000) {
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
  border: 1px solid black;
}
.map {
  float: left;
}
.Affluence {
  white-space: pre;
}
</style>
