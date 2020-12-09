<template>
    <div>
    <l-marker :lat-lng="position" @moveend="log('moveend')" @click="toDisplay(name)">
        <MarkerPopup v-bind:msg="msg"/>
    </l-marker>
    </div>

</template>

<script>
    import {LMarker} from "@vue-leaflet/vue-leaflet";
    import MarkerPopup from "./MarkerPopup";
    import store from "../../store/store";
    export default {
        name: "Marker",
        props:{
            position: Array,
            msg : String,
            name : String
        },
        components : {
            LMarker,
            MarkerPopup,
        },
        methods : {
            toDisplay(a) {
                store.commit({
                    type: 'setInformation',
                    circleinfo: a
                })
            }
        }
    }
</script>

<style scoped>

</style>
