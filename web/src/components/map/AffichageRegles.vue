<template>
  <div class="checkbox">
  <div v-for="regle in regles" :key="regle.titre">
    <label class="container" v-bind:for="regle.titre">
    <div v-if="regle.valeur !== -1">
      <input type="checkbox" :checked="true" v-bind:id="regle.titre"  v-model="regle.checked" v-on:click="action(regle)">
        <span class="checkmark">
         {{regle.titre}}
        </span>
    </div>
    </label>
  </div>
  </div>
</template>

<script>
import store from "../../store/store";

export default {
name: "AffichageRegles",
  data(){
    return{
      regles: this.$store.getters.getRegles,
      checked: false,
    }
  },
  methods:{
    action(regle){
      if(regle.titre === "Fermeture magasins"){

        if(!regle.checked) {
          regle.checked = true;
          this.$store.dispatch('setClosingHour',regle.valeur);
        }
        else {
          regle.checked = false;
          this.$store.dispatch('setClosingHour',-1)
        }
      }
      if (regle.titre === "Presence policier"){
        if (regle.checked) {
          regle.checked = false;
          store.commit({
            type: "stopDisplayPolice"
          });
        }
        else {
          regle.checked = true;
          store.commit({
            type: "displayPolice"
          });

        }
      }
    }
  }

}
</script>

<style scoped>

  .checkbox {
    font-family: "Sofia", sans-serif;
    font-size: 16px;
    color: black;
    background-color: inherit;
  }
  /* The container */
  .container {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    left: 0;
    float: left;
    padding: 14px 15px;
    position: relative;
    background-color: white ;
    border: 2px solid #b61000;
    box-shadow: 4px 4px 2px 1px #5d0800;
    border-radius: 25px;
    margin: 2px;
    z-index: 2;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: #cbcbcb;
    border: 5px solid #b61000;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: #b61000;
    box-shadow: 4px 4px 2px 1px #5d0800;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

</style>
