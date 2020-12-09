<template>
    <div>
    <l-marker :lat-lng="position" @moveend="log('moveend')">
        <MarkerPopup v-bind:msg="msg"/>
    </l-marker>
    </div>

</template>

<script>
    import {LMarker} from "@vue-leaflet/vue-leaflet";
    import MarkerPopup from "./MarkerPopup";
    export default {
        name: "Marker",
        data() {
            return {
                position :  [43.6154, 7.0719],
                msg : "Store information"
            };
        },
        components : {
            LMarker,
            MarkerPopup,
        }
    }
</script>

<style scoped>

</style>
