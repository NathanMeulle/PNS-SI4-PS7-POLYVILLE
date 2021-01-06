<template>
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h2>Aide</h2>
            <div v-if="init">
              <h3>Choisissez le programme que vous voulez connaître : </h3>
              <br/>
              <div class="bouton" id="b1" v-on:click="init = false;affichageNbCitoyens = true">
                Afficher l'événement en fonction du nombre de citoyens dans une zone donnée
              </div>
              <br/>
              <div class="bouton" id="b2" v-on:click="init = false;typeMagasins = true">
                Créer un événement pour tous les magasins d'un même type en fonction du nombre de citoyens proches
              </div>
            </div>
            <br/>
            <div v-if="affichageNbCitoyens">
              Afficher l'événement en fonction du nombre de citoyens dans une zone donnée :
              <br/>
              <br/>
            Si => citoyens => zone X => plus grand que => "entrer une valeur" => alors => afficher => événement
          </div>
            <br/>
            <div v-if="typeMagasins">
              Créer un événement pour tous les magasins d'un même type en fonction du nombre de citoyens proches :
              <br/>
              <br/>
              Pour tous => "type de magasin" => Si => citoyens => zone magasin => plus grand que => "entrer une valeur" => alors => afficher => événement
            </div>
            <br/>
            <div class="bouton"  v-if="init === false" v-on:click="init = true;affichageNbCitoyens = false;typeMagasins = false">
              Retour à l'aide
            </div>
            <br/>
            <div class="bouton" @click="$emit('close')">
              Fermer
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "HelpEvent",
  data(){
    return{
      init: true,
      affichageNbCitoyens: false,
      typeMagasins: false,
    }
  }
}
</script>

<style scoped>

.bouton{
  width: 15%;
  border-radius: 50px;
  text-align: center;
  font-family: "Sofia", sans-serif;
  font-size: 18px;
  border: 3px solid #0cb50b;
  cursor: pointer;
  box-shadow: 4px 4px 2px 1px #266027;
}

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
  width: 700px;
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


.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#b1{
  width: 70%;
}

#b2{
  width: 70%;
}


</style>
