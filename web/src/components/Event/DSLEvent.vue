<template>
  <span id="error">{{error}}</span>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
  <div class="wrapper" style="height: 75%; width: 100%">
    <div class="gauche" style="height: 75%; width: 29%">
      <div class='drop-zone' @drop='onDrop($event, 1)' @dragover.prevent @dragenter.prevent id="data">
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
      <div class='drop-zone' @drop='onDrop($event, 2)' @dragover.prevent @dragenter.prevent id="cond">
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
      <div class='drop-zone' @drop='onDrop($event, 5)' @dragover.prevent @dragenter.prevent>
        Zones géographiques :
        <div v-for='item in listGeo' :key='item.title' class='drag-el' draggable="true"
             @dragstart='startDrag($event, item)'>
          {{ item.title }}
          <div class="logo">
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
    <button v-on:click="launch()" id="launch" style="height: 3vh; width: 40%" class="bouton">Ajouter ce programme à mon événement</button>
    <br/>
    <div class="droite" style="height: 75%; width: 35%">
      <div style="height: 60vh; width: 100%" @drop='onDrop($event, 6)' @dragover.prevent @dragenter.prevent>
        <div class='drop-zone' @dragover.prevent @dragenter.prevent id="programme">
          Mon programme :
          <div v-for='item in listProg' :key='item.title' class="drag-el">
            <div v-if="item.type !== 1">
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
  </div>
</template>

<script>
import DragDropMethods from "../DSL/DragDropMethods";
export default {
name: "DSLEvent",
extends: DragDropMethods,
  data () {
    return {
      /** Error : message d'erreur **/
      error:'',
      /** Items : liste des éléments pouvant former un programme avec notre DSL **/
      items: [
        {
          id: 1,
          title: 'Input',
          input: '',
          position: 0,
          type: 1,
          list: 1
        },
        {
          id: 2,
          title: 'Plus grand que',
          position: 0,
          type: 2,
          list: 2
        },
        {
          id: 3,
          title: 'Si',
          input: '',
          position: 1,
          type: 2,
          list: 2
        },
        {
          id: 4,
          title: 'Alors',
          position: 2,
          type: 2,
          list: 2
        },
        {
          id: 5,
          title: 'citoyens',
          position: 0,
          type: 3,
          list: 3
        },
        {
          id: 6,
          title: 'afficher',
          position: 0,
          type: 4,
          list: 4
        },
        {
          id: 7,
          title: 'Zone A',
          position: 0,
          type: 5,
          list: 5
        },
        {
          id: 8,
          title: 'Zone B',
          position: 1,
          type: 5,
          list: 5
        },
        {
          id: 9,
          title: 'Zone C',
          position: 2,
          type: 5,
          list: 5
        },
        {
          id: 10,
          title: 'Zone D',
          position: 3,
          type: 5,
          list: 5
        },
        {
          id: 11,
          title: 'événement',
          position: 1,
          type: 4,
          list: 4
        },
      ],
      message : {}
    }
  },
  computed: {
    listInput () {
      return this.sortItems(this.items.filter(item => item.list === 1))
    },
    listCond () {
      return this.sortItems(this.items.filter(item => item.list === 2))
    },
    listPers () {
      return this.sortItems(this.items.filter(item => item.list === 3))
    },
    listDivers () {
      return this.sortItems(this.items.filter(item => item.list === 4))
    },
    listGeo () {
      return this.sortItems(this.items.filter(item => item.list === 5))
    },
    listProg () {
      return this.sortItems(this.items.filter(item => item.list === 6))
    },
  },
  methods:{
    /** Gère le relachement des éléments du DSL (drop) **/
    onDrop (evt, list) {
      this.error = '';
      const itemID = evt.dataTransfer.getData('itemID');
      if(itemID!==""){
        const item = this.items.find(itemTmp => itemTmp.id === Number(itemID));
        if(item.list === 6 || list!== 6){
          item.list = item.type
        }
        else{
          this.duplication(item);
          item.list = list
        }
        console.log("ajout à la liste : ",item.list);
        if (list === 6){
          item.position=this.listProg.length+1
        }
      }
    },

    /** Envoie le programme donné à l'interpréteur **/
    launch() {
      console.log("envoi du programme suivant : ", this.listProg);
      this.$emit("launchEvent", this.listProg)
    },

    /** Ajout d'une case à mon programme sans drag and drop **/
    right(item){
      this.duplication(item);
      item.list = 6;
      console.log("ajout à la liste : ",item.list);
      item.position=this.listProg.length+1
    }
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

