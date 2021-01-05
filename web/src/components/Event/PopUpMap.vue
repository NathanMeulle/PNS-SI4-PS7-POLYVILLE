<template>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                            <div class="map" style="height: 500px; width: 100%;">
                                <l-map
                                        v-model="zoom"
                                        v-model:zoom="zoom"
                                        :center="[43.6154, 7.0719]"
                                        v-model:maxZoom="maxZoom"
                                        v-model:minZoom="minZoom"
                                        v-model:maxBounds="maxBounds"
                                        v-on:click="sendLatLng"
                                >
                                    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" style="z-index: -5"/>
                                    <l-control-layers style="z-index: -5" />
                                    <div v-if="markerCreated">
                                        <Marker v-bind:position="getPosition"
                                                v-bind:msg="'Position Événement'"
                                        />

                                    </div>
                                </l-map>
                            </div>
                    </div>

                    <div class="modal-default-button" @click="$emit('close')">
                        Fermer
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {LControlLayers, LMap, LTileLayer} from "../../../node_modules_intern/@vue-leaflet/vue-leaflet";
    import Marker from "../map/Marker";
    import store from "../../store/store";

    export default {
        name: "PopUpMap",
        components : {
            LMap,
            LTileLayer,
            LControlLayers,
            Marker,
        },
        data() {
            return {
                markerCreated: false,
                zoom: 14,
                maxZoom: 18,
                minZoom: 13,
                maxBounds: [
                    [43.5904, 7.0419],
                    [43.6404, 7.100],
                ],
            }
        },
        methods : {
            sendLatLng(event){
                if(event.latlng != null) {
                    this.markerCreated = true

                    console.log("sent2 : ", event.latlng);
                    this.coord = [event.latlng.lat, event.latlng.lng]
                    store.commit({
                        type: "addPosition",
                        lat: event.latlng.lat,
                        lng: event.latlng.lng,
                    });
                }
                else { this.markerCreated = false}
            },
        },
        computed : {
            getPosition() {
                console.log("loading events...");
                console.log("getPos ", this.$store.getters.getPosition);
                return this.$store.getters.getPosition;
            },
        }
    }
</script>

<style scoped>

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 500px;
        height: 600px;
        margin: 0 auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 10px;
        border: 3px solid #0cb50b;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header {
        margin-top: 0;
        color: #1f1e1f;
        font-family: "Sofia", sans-serif;
        font-size: 18px;
    }
    .modal-type {
        margin: 5px 0;
        color: #312f31;
        font-family: "Sofia", sans-serif;
        font-size: 15px;
    }

    .modal-body {
        margin: 20px 0;
        color: #312f31;
        font-family: "Sofia", sans-serif;
        font-size: 15px;
    }
    .modal-footer{
        margin: 20px 0;
        color: #312f31;
        font-family: "Sofia", sans-serif;
        font-size: 15px;
    }

    .modal-default-button {
        float: right;
        width: 30%;
        border-radius: 50px;
        margin: 50px;
        text-align: center;
        color: #0cb50b;
        font-family: "Sofia", sans-serif;
        font-size: 18px;
        border: 3px solid #0cb50b;
        cursor: pointer;
        box-shadow: 4px 4px 2px 1px #266027;
    }
    .modal-default-button:hover {
        border: 5px solid #0cb50b;
        background-color : lightgrey;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    .map {
        float: left;
        z-index: -1;
    }

</style>
