<template>
  <div class="wrapper" style="height: 75vh; width: 150vh">
    <div class="map" style="height: 75vh; width: 100vh">
      <l-map
              v-model="zoom"
              v-model:zoom="zoom"
              :center="[43.6154, 7.0669]"
              v-model:maxZoom="maxZoom"
              v-model:minZoom="minZoom"
              v-model:maxBounds="maxBounds"
              @move="log('move')"
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
                  color="#2655E9"
                  :fill="true"
                  :fillOpacity="0.5"
                  fillColor="#2655E9"
                  @click="toDisplay('Zone A \n Nombre de citoyen présent : \n' + nbrCitizenZoneA)"
          />
          <MyCircle
                  :lat-lng="ZoneB"
                  v-bind:radius="displayCircle(nbrCitizenZoneB)"
                  color="#2655E9"
                  :fill="true"
                  :fillOpacity="0.5"
                  fillColor="#2655E9"
                  @click="toDisplay('Zone B \n Nombre de citoyen présent : \n' + nbrCitizenZoneB)"
          />
          <MyCircle
                  :lat-lng="ZoneC"
                  :radius="displayCircle(nbrCitizenZoneC)"
                  color="#2655E9"
                  :fill="true"
                  :fillOpacity="0.5"
                  fillColor="#2655E9"
                  @click="toDisplay('Zone C \n Nombre de citoyen présent : \n' + nbrCitizenZoneC)"
          />
          <MyCircle
                  :lat-lng="ZoneD"
                  :radius="displayCircle(nbrCitizenZoneD)"
                  color="#2655E9"
                  :fill="true"
                  :fillOpacity="0.5"
                  fillColor="#2655E9"
                  @click="toDisplay('Zone D \n Nombre de citoyen présent : \n' + nbrCitizenZoneD)"
          />
        </div>
      </l-map>
    </div>
    <div class="displayer" style="height: 75vh; width: 36vh">
      <Displayer/>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlLayers } from "@vue-leaflet/vue-leaflet";
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
  },
  data() {
    return {
      ZoneA: [43.6204, 7.0719],
      ZoneB: [43.6204, 7.0619],
      ZoneC: [43.6104, 7.0719],
      ZoneD: [43.6104, 7.0619],
      circleRedPosition: [43.6194, 7.0669],
      zoom: 15,
      maxZoom: 18,
      minZoom: 13,
      maxBounds: [
        [43.6054, 7.0569],
        [43.6254, 7.0769],
      ],
      iconWidth: 25,
      iconHeight: 40,
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
      if (a>200) {
        return 400
      }
      else {
        return a
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
  border: 1px solid black;
}
.map {
  float: left;
}
</style>
