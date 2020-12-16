<template>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <div class="welcomeText">
        {{display()}}
    </div>
    <div v-if="hours===true">
         <HoursChart></HoursChart>
        <div class="freq" @click="(showModal = true)">
                + d'infos ?
        </div>
        <PopUp v-if="showModal" @close="showModal = false"/>
    </div>
    <div v-else>
        Sélectionnez un commerce pour afficher ses informations
    </div>


</template>

<script>
    import HoursChart from "../stats/HoursChart";
    import PopUp from "./PopUp";
    export default {
        name: "Displayer",
        data() {
          return {
              circleInfo :"test",
              nbrfreq:0,
              showModal: false,
          }
        },
        components: {
          HoursChart,
            PopUp,

        },
        props : {
            data : String,
            hours : Boolean,
        },
        methods : {
            display() {
                return this.$store.getters.getInfos;
            },
            getId(){
                console.log("ID: ", this.$store.getters.getId);
                return this.$store.getters.getId;
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
