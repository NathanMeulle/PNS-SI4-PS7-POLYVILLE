<template>
  <div class="wrapper" style="height: 70vh; width: 100%">
    <div class="map" style="height: 70vh; width: 59%;">
      <l-map
              v-model="zoom"
              v-model:zoom="zoom"
              :center="[43.6154, 7.0719]"
              v-model:maxZoom="maxZoom"
              v-model:minZoom="minZoom"
              v-model:maxBounds="maxBounds"
              @move="log('move'+zoom)"
      >
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" style="z-index: -5"/>
        <l-control-layers style="z-index: -5"/>
        <div v-if="filterOption.includes('Commerces')" class="commerces">
          <div v-if="filterStore == 'Tout'">
            {{log(filterStore)}}
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
            v-bind:iconType="currentMarker.categorie"
            @displayhours="displayHours=true"
            @click="toDisplay('Bienvenue ' + id)"
            />
          </div>
          <div v-if="filterStore !='all'">
            {{log(filterStore)}}
            <Marker
                    v-for="currentMarker in storeToDisplay"
                    :key="currentMarker.id"
                    :commerce="currentMarker"
                    v-bind:position="[
            currentMarker.position.x,
            currentMarker.position.y,
            ]"
                    v-bind:msg="currentMarker.categorie"
                    v-bind:name="currentMarker.nom"
                    v-bind:id="currentMarker.id"
                    v-bind:iconType="currentMarker.categorie"
                    @displayhours="displayHours=true"
                    @click="toDisplay('Bienvenue' + id)"
            />
          </div>

        </div>

        <div v-if="filterOption.includes('Parking')" class="parkings">c
          <Marker
                v-for="currentParking in parkingStore"
                :key="currentParking.id"
                :parking="currentParking"
                v-bind:position="
                             [
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
            @click="toDisplay(  currentCircle.id + ':  Nombre de citoyen présent : ' + nbrCitizenZone(currentCircle.id)+ ' Nombre de policier présent : ' + nbrPolicierZone(currentCircle.id))"

          />

        </div>
        <div v-if="filterOption.includes('Police')" class="police" >
          <Marker v-if="nbrPolicierZone('Zone A')>=50" v-bind:position="zoneA"
                  v-bind:msg="nbrPolicierZone('Zone A') + ' policiers'"
                  v-bind:iconType="'police'"
          />
          <Marker v-if="nbrPolicierZone('Zone B')>=50" v-bind:position="zoneB"
                  v-bind:msg="nbrPolicierZone('Zone B') + ' policiers'"
                  v-bind:iconType="'police'"
          />
          <Marker v-if="nbrPolicierZone('Zone C')>=50" v-bind:position="zoneC"
                  v-bind:msg="nbrPolicierZone('Zone C') + ' policiers'"
                  v-bind:iconType="'police'"
          />
          <Marker v-if="nbrPolicierZone('Zone D')>=50" v-bind:position="zoneD"
                  v-bind:msg="nbrPolicierZone('Zone D') + ' policiers'"
                  v-bind:iconType="'police'"
          />


        </div>
      </l-map>
    </div>
    <div class="displayer" style="width: 38%">
      <Displayer v-bind:hours="displayHours"/>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LControlLayers } from "../../../node_modules_intern/@vue-leaflet/vue-leaflet";
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
    storeToDisplay() {
      let storeTmp = [];
      this.$store.getters.loadCommerces.forEach(theStore => {
        if (theStore.categorie === this.filterStore) {
          storeTmp.push(theStore);
        }
      })
      console.log(storeTmp);
      return storeTmp;
    }

  },
  data() {
    return {
      Zones : store.getters.getZones,
      Citizens : store.getters.loadCitizens,
      circleRedPosition: [43.6194, 7.0669],
      zoom: 14,
      maxZoom: 18,
      minZoom: 13,
      maxBounds: [
        [43.6054, 7.0569],
        [43.6254, 7.085],
      ],
      iconWidth: 25,
      iconHeight: 40,
      displayHours : false,
      zoneA : [43.6254,7.0839],
      zoneB :[43.6254,7.0569],
      zoneC :[ 43.6054,7.0839],
      zoneD : [ 43.6054,7.0569],
      filter : "",

    };
  },
  props: {
    filterOption: {
      type: Array,
      required: true
    },
    filterStore : {
      type: String,
      required : true
    }
  },
  methods: {
    nbrCitizenZone(a) {
      return this.$store.getters.getCitizen(a);
    },
    nbrPolicierZone(a) {
      return this.$store.getters.getPoliciers(a);
    },
    getPositionZone(a) {
      return this.$store.getters.getPositionZone(a);
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
    },

  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.displayer {
  min-height: 70vh;
  float: right;
  position: relative;
  margin-right: 10px;
  border-radius: 10px;
  border: 3px solid #0cb50b;
  background-color: rgba(237, 237, 237, 0.84);

}
.map {
  float: left;
  z-index: -1;
}
.Affluence {
  white-space: pre;
}


</style>
