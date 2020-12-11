<template>
    <div>
        <div v-if="iconType==='Parking'">
            <l-marker :lat-lng="position" :icon="icon" @moveend="log('moveend')" @click="sendId(id)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else-if="iconType==='MyPosition'">
            <l-marker :lat-lng="position" :icon="myPosition" @moveend="log('moveend')" @click="toDisplay(name)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else>
            <l-marker :lat-lng="position" @moveend="log('moveend')" @click="sendId(id)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
    </div>

</template>

<script>
    import {icon} from "leaflet";
    import {LMarker} from "@vue-leaflet/vue-leaflet";
    import MarkerPopup from "./MarkerPopup";
    import store from "../../store/store";
    export default {
        name: "Marker",
        data() {
            return {
                icon: icon({
                    iconUrl: require("../../assets/placeholder.png"),
                    iconSize: [32, 37],
                    iconAnchor: [16, 37]
                }),
                myPosition: icon({
                    iconUrl: require("../../assets/red-marker-icon.png"),
                    iconSize: [37, 37],
                    iconAnchor: [16, 37]
                }),
            }
        },
        props:{
            position: Array,
            msg : String,
            name : String,
            id : Number,
            iconType : String,

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
            },
            sendId(a) {
                store.commit( {
                    type : "sendId",
                    id : a,
                })
            },
        }
    }

//iconUrl: require('../../assets/placeholder.png'),



//const iconParking = new L.Marker();

//export { iconParking };
</script>

<style scoped>

</style>
