<template>
{{display()}}
    <div v-if="hours===true">
        <HoursChart></HoursChart>
    </div>
    <div>
        Sélectionnez un commerce
    </div>



</template>

<script>
    import HoursChart from "../stats/HoursChart";
    export default {
        name: "Displayer",
        data() {
          return {
              circleInfo :"test",
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

        }

    }
</script>

<style scoped>

</style>
