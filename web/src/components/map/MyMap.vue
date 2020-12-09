<template>
  <div class="wrapper" style="height: 75vh; width: 150vh;">
  <div class="map" style="height: 75vh; width: 100vh;">
    <l-map
            v-model="zoom"
            v-model:zoom="zoom"
            :center="[43.6238, 7.0996]"
            v-model:maxZoom="maxZoom"
            v-model:minZoom="minZoom"
            v-model:maxBounds="maxBounds"
            @move="log('move')"
    >
      <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <l-control-layers />
      <div >
        <Marker v-for="currentMarker in commerceStore" :key="currentMarker.id" :commerce="currentMarker" v-bind:position="[43.6154+(currentMarker.position.x-10)/1000, 7.0719+(currentMarker.position.y-10)/1000]" v-bind:msg="currentMarker.categorie"/>
      </div>
      <Marker v-bind:position="[43.6154, 7.0719]" v-bind:msg="'hello'"/>
      <MyCircle :lat-lng="circlePosition"
                :radius="200"
                color="#41b782"
                :fill="true"
                :fillOpacity="0.5"
                fillColor="#41b782"
                @click="toDisplay('Hello from green circle')"/>
      <MyCircle :lat-lng="circleRedPosition"
                :radius="150"
                color="#D91818"
                :fill="true"
                :fillOpacity="0.5"
                fillColor="#D91818"
                @click="toDisplay('Hello from red circle')"/>

      </l-map>
    </div>
    <div class="displayer" style="height: 75vh; width: 36vh;" >
      <Displayer/>
    </div>
  </div>

</template>

<script>
  import {
    LMap,
    LTileLayer,
    LControlLayers,
  } from "@vue-leaflet/vue-leaflet";
  import "leaflet/dist/leaflet.css";
  import MyCircle from "./MyCircle";
  import Marker from "./Marker";
  import Displayer from "./Displayer";
  import store from "../../store/store";


export default {
  name : "map",
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
      console.log("commerces", this.$store.getters.loadVille);
      return this.$store.getters.loadVille;

    },
  },
  data() {
    return {
      circlePosition :[43.6154, 7.0719],
      circleRedPosition : [43.6194, 7.0669],
      zoom: 15,
      maxZoom: 18,
      minZoom:13,
      maxBounds:[[43.6054,7.0569],[43.6254,7.0869]],
      iconWidth: 25,
      iconHeight: 40,
    };
  },
  methods: {
    log(a) {
      console.log(a);
    },
    toDisplay(a) {
      store.commit({
        type: 'setInformation',
        circleinfo: a
      })
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
