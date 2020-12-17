<template>
    <MyCircle></MyCircle>
</template>

<script>
    import MyCircle from "../tools/MyCircle";
    export default {
        name: "Circle",
        props: {
            position: [],
            radius:Number

        },
        components : {
            MyCircle
        },
    }
</script>

<style scoped>

</style>
