<template>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <div class="welcomeText">
        <div v-html="display()"></div>
    </div>
    <div v-if="hours===true">
        <HoursChart></HoursChart>
        <button id="Freq" class="freq" @click="(showModal2 = true)">
                + d'infos ?
        </button>
        <PopUp v-if="showModal2" @close="showModal2 = false"/>
    </div>
    <div v-if="myEvent===true">
        <PrintEvent
                v-bind:NomEvenement="getInfoEvent.name"
                v-bind:Description="getInfoEvent.description"
                v-bind:Logo="getInfoEvent.logo"
                v-bind:NomPointInteret="getInfoEvent.location"/>
    </div>
    <div v-else>
        Sélectionnez un commerce pour afficher ses informations
    </div>


</template>

<script>
    import HoursChart from "../stats/HoursChart";
    import PopUp from "./PopUp";
    import PrintEvent from "../Event/PrintEvent";
    export default {
        name: "Displayer",
        data() {
          return {
              circleInfo :"test",
              nbrfreq:0,
              showModal2: false,
              eventID : 0,
          }
        },
        components: {
            PrintEvent,
          HoursChart,
          PopUp,
        },
        props : {
            data : String,
            hours : Boolean,
            myEvent : Boolean,
        },
        methods : {
            display() {
                return this.$store.getters.getInfos;
            },
            getId(){
                console.log("ID: ", this.$store.getters.getId);
                return this.$store.getters.getId;
            },


        },
        computed : {
            getEventId() {
                return this.$store.getters.getEventId;
            },
            getInfoEvent() {
                return this.$store.getters.getEvent;
            },
        }
    }
</script>

<style scoped>
.freq {
    font-family: "Sofia", sans-serif;
    font-size: 18px;
    border-radius: 50px;
    border: 3px solid #0cb50b;
    padding: 20px;
    margin: 10px;
    cursor: pointer;
    box-shadow: 4px 4px 2px 1px #266027;
}
.freq:hover {
    border: 5px solid #0cb50b;
    background-color : lightgrey;

}

.welcomeText {
    font-family: "Sofia", sans-serif;
    font-size: 25px;
    text-align: center;
    color: #0cb50b;
    margin: 10px;
    }

</style>
