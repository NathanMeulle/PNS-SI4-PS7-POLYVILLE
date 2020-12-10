<template>
    <div>
    <l-marker :lat-lng="position" @moveend="log('moveend')" @click="toDisplay(name)">
        <MarkerPopup v-bind:msg="msg"/>
    </l-marker>
    </div>

</template>

<script>
    //import L from 'leaflet';
    import {LMarker} from "@vue-leaflet/vue-leaflet";
    import MarkerPopup from "./MarkerPopup";
    import store from "../../store/store";
    export default {
        name: "Marker",
        props:{
            position: Array,
            msg : String,
            name : String,
            //icon : String,
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

//iconUrl: require('../../assets/placeholder.png'),


//const iconParking = new L.Marker();

//export { iconParking };
</script>

<style scoped>

</style>
