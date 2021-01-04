<template>
<div class='drop-zone' @dragover.prevent @dragenter.prevent id="programme">
    Mon programme : {{listProg}}
    <div v-for='item in listProg' :key='item.title' class="drag-el">
        <div v-if="item.type !== 5">
            {{ item.title }}
            <div class="logo">
                <em class="fas fa-times" v-on:click="suppr(item)">&emsp;&emsp;</em>
                <em class="fas fa-arrow-up" v-on:click="up(item)">&emsp;&emsp;</em>
                <em class="fas fa-arrow-down" v-on:click="down(item)">&emsp;&emsp;</em>
            </div>
        </div>
        <div v-else>
            {{item.input}}
            <label>
                <input v-model="message[item.id]">
                <button v-on:click="validation(item.id)">OK</button>
            </label>
            <div class="logo">
                <em class="fas fa-times" v-on:click="suppr(item)">&emsp;&emsp;</em>
                <em class="fas fa-arrow-up" v-on:click="up(item)">&emsp;&emsp;</em>
                <em class="fas fa-arrow-down" v-on:click="down(item)">&emsp;&emsp;</em>
            </div>
        </div>
    </div>
</div>
</template>

<script>

    export default {
        name: "DropZone",
        props: {
            listProg : Array
        },
        methods: {
            /** Supprime une case du programme **/
            suppr(item){
               console.log("suppr ", item)
                this.$emit("suppr", item);
            },
            /** Déplace une case d'un cran vers le haut du programme **/
            up(selected){
                console.log("up ", selected)
                this.$emit("up", selected);
            },

            /** Déplace une case d'un cran vers le bas du programme **/
            down(selected){
                console.log("down", selected)
                this.$emit("down", selected);
            },
        }
    }
</script>


