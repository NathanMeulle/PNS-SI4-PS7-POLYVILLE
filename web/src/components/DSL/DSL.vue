<template>
  <span id="error">{{error}}</span>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
  <div class="wrapper" style="height: 75%; width: 100%">
    <div class="gauche" style="height: 75%; width: 29%">
      <div class='drop-zone' @drop='onDrop($event, 5)' @dragover.prevent @dragenter.prevent id="data">
        Données :
        <div v-for='item in listInput' :key='item.title' class='drag-el' draggable="true"
             @dragstart='startDrag($event, item)'>
          {{item.input}}
          <label>
            <input v-model="message[item.id]">
            <button v-on:click="validation(item.id)">OK</button>
          </label>
          <div class="logo">
            <em class="fas fa-arrow-right" v-on:click="right(item)">&emsp;&emsp;</em>
          </div>
        </div>
      </div>
      <div class='drop-zone' @drop='onDrop($event, 1)' @dragover.prevent @dragenter.prevent id="cond">
        Conditions :
        <div v-for='item in listCond' :key='item.title' class='drag-el' draggable="true"
             @dragstart='startDrag($event, item)'>
          {{ item.title }}
          <div class="logo">
            <em class="fas fa-arrow-right" v-on:click="right(item)">&emsp;&emsp;</em>
          </div>
        </div>
      </div>
      <div class='drop-zone' @drop='onDrop($event, 3)' @dragover.prevent @dragenter.prevent>
        Entités :
        <div v-for='item in listPers' :key='item.title' class='drag-el' draggable="true"
             @dragstart='startDrag($event, item)'>
          {{ item.title }}
          <div class="logo">
            <em class="fas fa-arrow-right" v-on:click="right(item)">&emsp;&emsp;</em>
          </div>
        </div>
      </div>
    </div>
    <div class="milieu" style="height: 75%; width: 29%">
      <div class='drop-zone' @drop='onDrop($event, 6)' @dragover.prevent @dragenter.prevent>
        Zones géographiques :
        <div v-for='item in listGeo' :key='item.title' v-bind:class="{zoneSelectionnable: !isZoneSelectionnable}" class='drag-el' :draggable='isZoneSelectionnable'
             @dragstart='startDrag($event, item)'>
          {{ item.title }}
          <div v-if="isZoneSelectionnable" class="logo">
            <em class="fas fa-arrow-right" v-on:click="right(item)">&emsp;&emsp;</em>
          </div>
        </div>
      </div>
      <div class='drop-zone' @drop='onDrop($event, 4)' @dragover.prevent @dragenter.prevent>
        Divers :
        <div v-for='item in listDivers' :key='item.title' class='drag-el' draggable="true"
             @dragstart='startDrag($event, item)'>
          {{ item.title }}
          <div class="logo">
            <em class="fas fa-arrow-right" v-on:click="right(item)">&emsp;&emsp;</em>
          </div>
        </div>
      </div>
    </div>
    <button v-on:click="launch()" id="launch" style="height: 3vh; width: 40%" class="bouton">Lancer mon programme</button>
    <br/>
    <div class="droite" style="height: 75%; width: 35%">
      <div style="height: 60vh; width: 100%" @drop='onDrop($event, 2)' @dragover.prevent @dragenter.prevent>
        <div class='drop-zone' @dragover.prevent @dragenter.prevent id="programme">
          Mon programme :
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
      </div>
    </div>
    <button v-on:click="macro()" id="creationMacro" style="height: 3vh; width: 40%" class="bouton">Créer un raccourci pour ce programme</button>
  </div>
</template>
<script>
import DragDropMethods from "@/functions/DragDropMethods";
export default {
  name: "DSL",
  extends: DragDropMethods,
  emits: ["launch", "macro"],//indique les éléments envoyés (nécessaire pour les tests)
  data () {
    return {
      modal: false,
      /** Error : message d'erreur **/
      error:'',
      /** Items : liste des éléments pouvant former un programme avec notre DSL **/
      items: [
        {
          id: 0,
          title: 'Pour tous',
          input: '',
          position: 0,
          type:1,
          list: 1
        },
        {
          id: 1,
          title: 'Si',
          input: '',
          position: 1,
          type:1,
          list: 1
        },
        {
          id: 2,
          title: 'Alors',
          position: 2,
          type:1,
          list: 1
        },
        {
          id: 3,
          title: 'policiers',
          position: 0,
          type:3,
          list: 3
        },
        {
          id: 4,
          title: 'citoyens',
          position: 1,
          type:3,
          list: 3
        },
        {
          id: 5,
          title: 'Zone A',
          position: 0,
          type: 6,
          list: 6
        },
        {
          id: 6,
          title: 'Zone B',
          position: 1,
          type: 6,
          list: 6
        },
        {
          id: 7,
          title: 'Input',
          input: '',
          position: 0,
          type:5,
          list: 5
        },
        {
          id: 8,
          title: 'Plus grand que',
          position: 3,
          type:1,
          list: 1
        },
        {
          id: 9,
          title: 'Plus petit que',
          position: 4,
          type:1,
          list: 1
        },
        {
          id: 10,
          title: 'Zone C',
          position: 2,
          type:6,
          list: 6
        },
        {
          id: 11,
          title: 'Zone D',
          position: 3,
          type:6,
          list: 6
        },
        {
          id: 12,
          title: 'heures',
          position: 0,
          type:4,
          list: 4
        },
        {
          id: 13,
          title: 'magasins',
          position: 2,
          type:3,
          list: 3
        },
        {
          id: 14,
          title: 'fermeture',
          position: 1,
          type:4,
          list: 4
        },
        {
          id: 15,
          title: 'réinitialiser',
          position: 2,
          type:4,
          list: 4
        },
      ],
      message : {}
    }
  },
  computed: {
    listCond () {
      return this.sortItems(this.items.filter(item => item.list === 1))
    },
    listProg () {
      return this.sortItems(this.items.filter(item => item.list === 2))
    },
    listPers () {
      return this.sortItems(this.items.filter(item => item.list === 3))
    },
    listDivers () {
      return this.sortItems(this.items.filter(item => item.list === 4))
    },
    listInput () {
      return this.sortItems(this.items.filter(item => item.list === 5))
    },
    listGeo () {
      return this.sortItems(this.items.filter(item => item.list === 6))
    },
    isZoneSelectionnable () {
      //On peut mettre une zone par entité
      return this.listProg.filter(prog => prog.type===3).length > this.listProg.filter(prog => prog.type===6).length;//s'il y a plus d'entités que de zones
    }
  },
  methods:{
    /** Envoie le programme donné à la gestion des macros **/
    macro() {
      console.log("envoi du programme suivant : ", this.listProg);
      this.$emit("macro", this.listProg)
    },
    /** Envoie le programme donné à l'interpréteur **/
    launch() {
      console.log("envoi du programme suivant : ", this.listProg);
      this.$emit("launch", this.listProg)
    },
  }
}
</script>
<style scoped>
  .droite {
    float: right;
    position: relative;
    border: 1px solid black;
    margin-top: 1%;
    right: 3%;
  }
  .gauche {
    float: left;
  }
  .milieu{
    float: left;
  }
.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
.zoneSelectionnable {
  background-color: #dddddd;
  color: #999999;
}
#error{
  position: relative;
  color: red;
  margin-top: 5%;
}
#cond{
  margin-top: 10px;
}
.logo{
  float: right;
}
#creationMacro{
  margin-top: 2%;
  margin-left: 60%;
}
#programme{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
#launch{
  float: right;
  position: relative;
}
  .bouton{
    border-radius: 50px;
    text-align: center;
    font-family: "Sofia", sans-serif;
    font-size: 18px;
    border: 3px solid #0cb50b;
    cursor: pointer;
    box-shadow: 4px 4px 2px 1px #266027;
  }
</style>