<template>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <slot name="header">
                            This is a Map <br>
                        </slot>
                    </div>

                    <div class="modal-default-button" @click="$emit('close')">
                        Fermer
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "PopUpMap",
    }
</script>

<style scoped>

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity 0.3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 500px;
        height: 600px;
        margin: 0 auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 10px;
        border: 3px solid #0cb50b;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header {
        margin-top: 0;
        color: #1f1e1f;
        font-family: "Sofia", sans-serif;
        font-size: 18px;
    }
    .modal-type {
        margin: 5px 0;
        color: #312f31;
        font-family: "Sofia", sans-serif;
        font-size: 15px;
    }

    .modal-body {
        margin: 20px 0;
        color: #312f31;
        font-family: "Sofia", sans-serif;
        font-size: 15px;
    }
    .modal-footer{
        margin: 20px 0;
        color: #312f31;
        font-family: "Sofia", sans-serif;
        font-size: 15px;
    }

    .modal-default-button {
        float: right;
        width: 30%;
        border-radius: 50px;
        margin: auto;
        text-align: center;
        color: #0cb50b;
        font-family: "Sofia", sans-serif;
        font-size: 18px;
        border: 3px solid #0cb50b;
        cursor: pointer;
        box-shadow: 4px 4px 2px 1px #266027;
    }
    .modal-default-button:hover {
        border: 5px solid #0cb50b;
        background-color : lightgrey;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }

</style>
