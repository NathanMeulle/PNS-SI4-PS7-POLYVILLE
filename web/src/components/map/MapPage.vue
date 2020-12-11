<template>
    <div class="MapPage">
        <input type="checkbox" id="checkboxParking" value="Parking" v-model="checkedOptions">
        <label for="checkboxParking">Parking</label>

        <input type="checkbox" id="checkboxCommerces" value="Commerces" v-model="checkedOptions">
        <label for="checkboxAffluence">Commerces</label>

        <input type="checkbox" id="checkboxAffluence" value="Affluence" v-model="checkedOptions">
        <label for="checkboxAffluence">Affluence</label>

        <MapComponent v-bind:filterOption="checkedOptions" ></MapComponent>
    </div>
</template>

<script>
    import MapComponent from "./MapComponent";

    export default {
        name: "MapPage",
        components: {
            MapComponent,
        },
        data() {
            return {
                checkedOptions: []
            }
        }
    };
</script>

<style scoped>
</style>
