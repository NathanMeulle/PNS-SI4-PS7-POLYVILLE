<template>
  <div style="height: 75vh; width: 50vw;">
    <l-map
            v-model="zoom"
            v-model:zoom="zoom"
            :center="[43.6238, 7.0996]"
            v-model:maxZoom="maxZoom"
            v-model:minZoom="minZoom"
            v-model:maxBounds="maxBounds"
            @move="log('move')"
            @center="log(this.getCenter())"
    >
      <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <l-control-layers />
    </l-map>
  </div>
</template>

<script>
  import {
    LMap,
    LTileLayer,
    LControlLayers,
  } from "@vue-leaflet/vue-leaflet";
  import "leaflet/dist/leaflet.css";


export default {
  name: "MyMap",
  components: {
          LMap,
          LTileLayer,
          LControlLayers,
  },
  data() {
    return {
      zoom: 15,
      maxZoom: 18,
      minZoom:13,
      maxBounds:[[43.6200,7.0950],[43.6300,7.1000]],
      iconWidth: 25,
      iconHeight: 40,
    };
  },
  methods: {
    log(a) {
      console.log(a);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
