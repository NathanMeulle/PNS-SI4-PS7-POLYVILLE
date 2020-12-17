<template>
    <div>
        <div class="parking" v-if="iconType==='Parking'">
            <l-marker :lat-lng="position" :icon="parking" @moveend="log('moveend')" @click="sendId(id),toDisplay('Parking')">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else-if="iconType==='MyPosition'">
            <l-marker :lat-lng="position" :icon="myPosition" @moveend="log('moveend')" @click="toDisplay(name)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else-if="iconType==='police'" >
            <l-marker :lat-lng="position" :icon="police" @moveend="log('moveend')">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else-if="iconType==='Pharmacie'" >
            <l-marker :lat-lng="position" :icon="Pharmacie" @moveend="log('moveend')" @click="sendId(id), toDisplay('Bienvenue ' + name)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else-if="iconType==='Boulangerie'" >
            <l-marker :lat-lng="position" :icon="Boulangerie" @moveend="log('moveend')" @click="sendId(id), toDisplay('Bienvenue ' + name)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else-if="iconType==='Fleuriste'" >
            <l-marker :lat-lng="position" :icon="Fleuriste" @moveend="log('moveend')" @click="sendId(id), toDisplay('Bienvenue ' + name)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else-if="iconType==='Bar'" >
            <l-marker :lat-lng="position" :icon="Bar" @moveend="log('moveend')" @click="sendId(id), toDisplay('Bienvenue ' + name)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else-if="iconType==='SuperMarché'" >
            <l-marker :lat-lng="position" :icon="SuperMarche" @moveend="log('moveend')" @click="sendId(id), toDisplay('Bienvenue ' + name)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else-if="iconType==='Restaurant'" >
            <l-marker :lat-lng="position" :icon="Restaurant" @moveend="log('moveend')" @click="sendId(id), toDisplay('Bienvenue ' + name)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
        <div v-else>
            <l-marker :lat-lng="position" @moveend="log('moveend')" @click="sendId(id), toDisplay('Bienvenue ' + name)">
                <MarkerPopup v-bind:msg="msg"/>
            </l-marker>
        </div>
    </div>

</template>

<script>
    import {icon} from "leaflet";
    import {LMarker} from "../../../node_modules_intern/@vue-leaflet/vue-leaflet";
    import MarkerPopup from "./MarkerPopup";
    import store from "../../store/store";
    export default {
        name: "Marker",
        data() {
            return {
                parking: icon({
                    iconUrl: require("../../assets/placeholder.png"),
                    iconSize: [32, 37],
                    iconAnchor: [16, 37]
                }),
                myPosition: icon({
                    iconUrl: require("../../assets/red-marker-icon.png"),
                    iconSize: [37, 37],
                    iconAnchor: [16, 37]
                }),
                police: icon({
                    iconUrl: require("../../assets/police-hat.png"),
                    iconSize: [37, 37],
                    iconAnchor: [16, 37]
                }),
                Pharmacie: icon({
                    iconUrl: require("../../assets/pharmacy.png"),
                    iconSize: [37, 37],
                    iconAnchor: [16, 37]
                }),
                Boulangerie: icon({
                    iconUrl: require("../../assets/boulangerie.png"),
                    iconSize: [37, 37],
                    iconAnchor: [16, 37]
                }),
                Fleuriste: icon({
                    iconUrl: require("../../assets/fleuriste.png"),
                    iconSize: [37, 37],
                    iconAnchor: [16, 37]
                }),
                Bar: icon({
                    iconUrl: require("../../assets/bar.png"),
                    iconSize: [37, 37],
                    iconAnchor: [16, 37]
                }),
                SuperMarche: icon({
                    iconUrl: require("../../assets/supermarché.png"),
                    iconSize: [37, 37],
                    iconAnchor: [16, 37]
                }),
                Restaurant: icon({
                    iconUrl: require("../../assets/restaurant.png"),
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
                this.$emit('displayhours',true);
                store.commit( {
                    type : "sendId",
                    id : a,
                })
                store.commit( {
                    type: "addfreq",
                    id : a,
                })
            },
        }
    }

</script>

<style scoped>


</style>
