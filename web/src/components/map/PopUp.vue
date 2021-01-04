<template>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">

                        <div class="modal-header">
                            <slot name="header">
                                {{getNom()[2]}} <br>
                            </slot>
                        </div>
                        <div class="modal-type">
                            <slot name="header">
                                {{getType()}}
                            </slot>
                        </div>

                        <div class="modal-body">
                            <slot name="body">
                                <u class="proprio">
                                    Propriétaire <br>
                                </u>
                                  {{getNom()[0]}} <br>
                                   {{getNom()[1]}} <br>
                                 {{getAdress()}}
                            </slot>
                            <div class="chartAttendance">
                                <attendance-chart></attendance-chart>
                            </div>
                        </div>
                        <div class="modal-footer-wrapper" style="height: 40px; width: 100%">
                            <div class="modal-footer" style="width: 50%">
                                <slot name="footer">
                                    Ce point a été consulté
                                    {{displayfreq()}}
                                    {{nbrfreq}}
                                    fois

                                </slot>
                            </div>
                            <div class="modal-default-button" @click="$emit('close')">
                                Fermer
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </transition>
</template>

<script>
    import AttendanceChart from "../stats/AttendanceChart";
    export default {
        name: "PopUp",
        data() {
            return {
                nbrfreq:0,
                id : this.getId(),
                nom : "",
            }
        },
        components : {
            AttendanceChart,
        },
        computed : {
        },
        methods : {
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

            },
            getNom() {
                console.log('NOM : ', this.$store.getters.getNomCommerce(this.id));
                return this.$store.getters.getNomCommerce(this.id);
            },
            getType() {
                return this.$store.getters.getTypeCommerce(this.id);
            },
            getAdress() {
                return this.$store.getters.getAdressCommerce(this.id);
            }

        }
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
    .chartAttendance {
        margin: 10px 0;
    }

</style>
