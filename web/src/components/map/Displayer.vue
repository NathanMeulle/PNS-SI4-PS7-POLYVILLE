<template>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <div class="welcomeText">
        {{display()}}
    </div>
    <div v-if="hours===true">
        <HoursChart></HoursChart>
        <div class="freq">
            Ce point a été consulté
            {{displayfreq()}}
            {{nbrfreq}}
              fois
        </div>
    </div>
    <div class="welcomeText" v-else>
        Sélectionnez un commerce pour afficher ses informations
    </div>


</template>

<script>
    import HoursChart from "../stats/HoursChart";
    export default {
        name: "Displayer",
        data() {
          return {
              circleInfo :"test",
              nbrfreq:0,
          }
        },
        components: {
          HoursChart,
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
            getfreq() {
                console.log("FREQs: ", this.$store.getters.getfreqTab[0]);
                return this.$store.getters.getfreqTab;
            },
            displayfreq() {
                this.getfreq().forEach(map => {
                    if (map[0]=== this.getId()){
                        console.log('FREQ: ',map[1]);
                        this.nbrfreq=map[1];
                        return map[1];
                    }
                })

            }

        }

    }
</script>

<style scoped>
.freq {
    font-family: "Sofia", sans-serif;
    font-size: 18px;
    border-radius: 8px;
    border: 3px solid #0cb50b;
    padding: 20px;
    margin: 10px;
    box-shadow: 6px 6px 2px 1px rgba(42, 77, 44, 0.2);
}
.welcomeText {
    font-family: "Sofia", sans-serif;
    font-size: 25px;
    text-align: center;
    color: #0cb50b;
    margin: 10px;
    }


</style>
