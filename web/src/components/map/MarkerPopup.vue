<template>
    <l-popup>
        {{storeInformation}}
    </l-popup>

</template>

<script>
import {
        LPopup,
} from "../../../node_modules_intern/@vue-leaflet/vue-leaflet";
    export default {
        name: "MarkerPopup",
        data() {
            return {
                storeInformation: this.msg,
            };
        },
        props : {
            msg : String,
        },
        components : {
            LPopup,
        }

    }
</script>

<style scoped>

</style>
