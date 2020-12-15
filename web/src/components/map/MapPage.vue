<template>
    <div class="MapPage">
        <div class="checkbox">
        <input type="checkbox" id="checkboxParking" value="Parking" v-model="loadCheckbox" v-on:input="doSelect('Parking')">
        <label for="checkboxParking">Parking</label>

        <input type="checkbox" id="checkboxCommerces" value="Commerces" v-model="loadCheckbox" v-on:input="doSelect('Commerces')">
        <label for="checkboxAffluence">Commerces</label>

        <input type="checkbox" id="checkboxAffluence" value="Affluence" v-model="loadCheckbox" v-on:input="doSelect('Affluence')">
        <label for="checkboxAffluence">Affluence</label>

        <input type="checkbox" id="checkboxPolice" value="Police" v-model="loadCheckbox" v-on:input="doSelect('Police')">
        <label for="checkboxPolice">Présence Policière</label>
        </div>

        <MapComponent class="map" v-bind:filterOption="loadCheckbox" ></MapComponent>
    </div>
</template>

<script>
    import MapComponent from "./MapComponent";
    import store from "../../store/store";

    export default {
        name: "MapPage",
        components: {
            MapComponent,
        },
        computed: {
            loadCheckbox() {
                console.log("loading checkbox...");
                return this.$store.getters.getCheckBox;
            },
        },
        methods:{
            doSelect(message) {
                store.commit( {
                    type: "setCheckbox",
                    CheckedBox : message,
                })
            },
        },
    };
</script>

<style scoped>
    .checkbox {
        border-radius: 10px;
        list-style-type: none;
        margin: 0;
        width: 100px;
        background-color: #b8b8b8d7;
        display: inline;
        color: #000;
        text-align: center;
        padding: 10px 10px 10px 10px;
        text-decoration: none;
    }
    .map {
        padding: 10px
    }
</style>
