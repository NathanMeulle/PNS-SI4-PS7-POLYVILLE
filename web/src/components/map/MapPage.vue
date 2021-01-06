<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">

    <div class="MapPage">
        <div class="navbar">
        <div class="checkbox">
        <label  class="container" for="checkboxParking">
            <input type="checkbox" id="checkboxParking" value="Parking" v-model="loadCheckbox" v-on:input="doSelect('Parking')">
            <span class="checkmark">
                Parking
            </span>
        </label>
        <label class="container" for="checkboxCommerces">
            <input type="checkbox" id="checkboxCommerces" value="Commerces" v-model="loadCheckbox" v-on:input="doSelect('Commerces')">
            <span class="checkmark">
                Commerces
            </span>
        </label>
        <label class="container" for="checkboxAffluence">
            <input type="checkbox" id="checkboxAffluence" value="Affluence" v-model="loadCheckbox" v-on:input="doSelect('Affluence')">
            <span class="checkmark">
                Affluence
            </span>
        </label>
        <label class="container" for="checkboxPolice">
            <input type="checkbox" id="checkboxPolice" value="Police" v-model="loadCheckbox" v-on:input="doSelect('Police')">
            <span class="checkmark">
                Présence Policière
            </span>
        </label>

        </div>
            <div class="dropdown">
                <button class="dropbtn">
                    {{storeToDisplay}}
                    <em class="fa fa-caret-down"></em>
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
        <MapComponent class="map" v-bind:filterOption="loadCheckbox" v-bind:filterStore="storeToDisplay" ></MapComponent>
        <button id="MoveButton" v-on:click="moveCitizens">Simuler Déplacement Citoyens</button>
      <AffichageRegles/>

    </div>
</template>

<script>
    import MapComponent from "./MapComponent";
    import AffichageRegles from "@/components/map/AffichageRegles";
    import store from "../../store/store";

    export default {
        name: "MapPage",
        components: {
            MapComponent,
          AffichageRegles,
        },
        data() {
            return {
                checkedOptions: ["Commerces"],
                storeToDisplay : "Tout",
                moveCounter : 0
            }
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
            log(a) {
                console.log(a);
            },
            moveCitizens(){
                this.moveCounter +=1;
                this.$store.dispatch('deplacerCitoyens', {
                    count: this.moveCounter
                });
                console.log("move Citizens", this.moveCounter % 4)
            }
        },

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
        margin: 5px;

    }
    .map {
        padding: 10px;
        z-index: -1;
    }
    .navbar {
        overflow: hidden;
        font-family: Arial, Verdana, Tahoma, sans-serif;
        border: 2px solid #cbcbcb;
        border-radius: 3px;
        background-color: #cbcbcb;
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
        padding: 14px 50px;
        background-color: white ;
        border: 2px solid #0cb50b;
        border-radius: 25px;
        margin: 2px;
    }

    .dropdown:hover .dropbtn {
        background-color : lightgrey;
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
    /* The container */
    .container {
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        padding: 14px 15px;
        position: relative;
        background-color: white ;
        border: 2px solid #0cb50b;
        box-shadow: 4px 4px 2px 1px #266027;
        border-radius: 25px;
        margin: 2px;
        z-index: 2;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #cbcbcb;
        border: 5px solid #0cb50b;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #0cb50b;
        box-shadow: 4px 4px 2px 1px #266027;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }


</style>
