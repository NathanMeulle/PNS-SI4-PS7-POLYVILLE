<template>
{{display()}}
</template>

<script>
    export default {
        name: "Displayer",
        data() {
          return {
              circleInfo :"test",
          }
        },
        props : {
            data : String,
        },
        methods : {
            display() {
                return this.$store.getters.getInfos;
            }
        }

    }
</script>

<style scoped>

</style>
