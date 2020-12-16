<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">

    <div class="MapPage">
        <div class="navbar">
        <div class="checkbox">
        <input type="checkbox" id="checkboxParking" value="Parking" v-model="checkedOptions">
        <label for="checkboxParking">Parking</label>

        <input type="checkbox" id="checkboxCommerces" value="Commerces" checked="true" v-model="checkedOptions">
        <label for="checkboxAffluence">Commerces</label>

        <input type="checkbox" id="checkboxAffluence" value="Affluence" v-model="checkedOptions">
        <label for="checkboxAffluence">Affluence</label>

        <input type="checkbox" id="checkboxPolice" value="Police" v-model="checkedOptions">
        <label for="checkboxPolice">Présence Policière</label>

        </div>
            <div class="dropdown">
                <button class="dropbtn">
                    {{storeToDisplay}}
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a href="#" @click="storeToDisplay = 'Bar',log('TEST : ' + storeToDisplay)">Bar</a>
                    <a href="#" @click="storeToDisplay='Restaurant'">Restaurants</a>
                    <a href="#" @click="storeToDisplay='Boulangerie'">Boulangerie</a>
                    <a href="#" @click="storeToDisplay='Pharmacie'">Pharmacie</a>
                    <a href="#" @click="storeToDisplay='SuperMarché'">Epiceries & Supermarchés</a>
                    <a href="#" @click="storeToDisplay='Tout'">Tout</a>

                </div>
            </div>
        </div>
        <MapComponent class="map" v-bind:filterOption="checkedOptions" v-bind:filterStore="storeToDisplay"></MapComponent>

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
                checkedOptions: ["Commerces"],
                storeToDisplay : "Tout"
            }
        },
        methods : {
            log(a) {
                console.log(a);
            },
        }
    };
</script>

<style scoped>
    .checkbox {
        float: left;
        width: 59%;
        font-family: "Sofia", sans-serif;
        font-size: 16px;
        color: black;
        padding: 14px 16px;
        background-color: inherit;

    }
    .map {
        padding: 10px;
        z-index: -1;
    }
    .navbar {
        overflow: hidden;
        font-family: Arial;
        border: 3px solid #0cb50b;
        border-radius: 10px;
        box-shadow: 4px 4px 2px 1px #266027;
        height: 100%;
        width: 100%;
        margin: 4px;
    }

    /* Links inside the navbar */
    .navbar a {
        float: right;
        font-size: 16px;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }
    /* The dropdown container */
    .dropdown {
        overflow: hidden;
    }

    /* Dropdown button */
    .dropdown .dropbtn {
        font-family: "Sofia", sans-serif;
        font-size: 16px;
        padding: 14px 16px;
        background-color: inherit;
    }

    /* Add a red background color to navbar links on hover */
    .navbar a:hover .dropdown:hover .dropbtn {
        border: 5px solid #0cb50b;
        background-color : lightgrey;
    }
    .dropdown:hover .dropbtn {
    }


    /* Dropdown content (hidden by default) */
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdown-content a {
        float: none;
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
    }

    /* Add a grey background color to dropdown links on hover */
    .dropdown-content a:hover {
        background-color: #ddd;
    }

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {
        display: block;
    }

</style>
