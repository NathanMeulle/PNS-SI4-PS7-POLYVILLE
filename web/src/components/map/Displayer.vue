<template>
{{display()}}
    <HoursChart></HoursChart>
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
