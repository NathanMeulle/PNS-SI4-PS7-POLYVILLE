<template>
  <span id="error">{{error}}</span>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" />
  <div class="wrapper" style="height: 75%; width: 100%">
    <div class="gauche" style="height: 75%; width: 59%">
      <div class='drop-zone' @drop='onDrop($event, 5)' @dragover.prevent @dragenter.prevent id="data">
        Données :
        <div v-for='item in listInput' :key='item.title' class='drag-el' draggable="true"
             @dragstart='startDrag($event, item)'>
          {{item.input}}
          <label>
            <input v-model="message[item.id]">
            <button v-on:click="validation(item.id)">OK</button>
          </label>
        </div>
      </div>
      <div class='drop-zone' @drop='onDrop($event, 1)' @dragover.prevent @dragenter.prevent id="cond">
        Conditions :
        <div v-for='item in listCond' :key='item.title' class='drag-el' draggable="true"
             @dragstart='startDrag($event, item)'>
          {{ item.title }}
        </div>
      </div>
      <div class='drop-zone' @drop='onDrop($event, 3)' @dragover.prevent @dragenter.prevent>
        Entités :
        <div v-for='item in listPers' :key='item.title' class='drag-el' draggable="true"
             @dragstart='startDrag($event, item)'>
          {{ item.title }}
        </div>
      </div>
      <div class='drop-zone' @drop='onDrop($event, 6)' @dragover.prevent @dragenter.prevent>
        Zones géographiques :
        <div v-for='item in listGeo' :key='item.title' class='drag-el' draggable="true"
             @dragstart='startDrag($event, item)'>
          {{ item.title }}
        </div>
      </div>
      <div class='drop-zone' @drop='onDrop($event, 4)' @dragover.prevent @dragenter.prevent>
        Divers :
        <div v-for='item in listDivers' :key='item.title' class='drag-el' draggable="true"
             @dragstart='startDrag($event, item)'>
          {{ item.title }}
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

export default {
  name: "DSL",
  emits: ["launch", "macro"],//indique les éléments envoyés (nécessaire pour les tests)
  data () {
    return {
      /** Error : message d'erreur **/
      error:'',
      /** Items : liste des éléments pouvant former un programme avec notre DSL **/
      items: [
        {
          id: 0,
          title: 'Pour tous',
          input: '',
          position: -1,
          type:1,
          list: 1
        },
        {
          id: 1,
          title: 'Si',
          input: '',
          position: -1,
          type:1,
          list: 1
        },
        {
          id: 2,
          title: 'Alors',
          position: -1,
          type:1,
          list: 1
        },
        {
          id: 3,
          title: 'policiers',
          position: -1,
          type:3,
          list: 3
        },
        {
          id: 4,
          title: 'citoyens',
          position: -1,
          type:3,
          list: 3
        },
        {
          id: 5,
          title: 'Zone A',
          position: -1,
          type:4,
          list: 6
        },
        {
          id: 6,
          title: 'Zone B',
          position: -1,
          type:4,
          list: 6
        },
        {
          id: 7,
          title: 'Input',
          input: '',
          position: -1,
          type:5,
          list: 5
        },
        {
          id: 8,
          title: 'Plus grand que',
          position: -1,
          type:1,
          list: 1
        },
        {
          id: 9,
          title: 'Plus petit que',
          position: -1,
          type:1,
          list: 1
        },
        {
          id: 10,
          title: 'Zone C',
          position: -1,
          type:4,
          list: 6
        },
        {
          id: 11,
          title: 'Zone D',
          position: -1,
          type:4,
          list: 6
        },
        {
          id: 12,
          title: 'heures',
          position: -1,
          type:4,
          list: 4
        },
        {
          id: 13,
          title: 'magasins',
          position: -1,
          type:3,
          list: 3
        },
        {
          id: 14,
          title: 'fermeture',
          position: -1,
          type:4,
          list: 4
        },
        {
          id: 15,
          title: 'réinitialiser',
          position: -1,
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
  },

  methods:{
    /** Renvoie une liste une liste triée en fonction de l'attribut position de ses éléments **/
    sortItems(liste){
      return liste.sort((a, b) => a.position - b.position)
    },

    /** Déplacement des éléments du DSL (drag) **/
    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    },

    /** Gère le relachement des éléments du DSL (drop) **/
    onDrop (evt, list) {
      this.error = ''
      const itemID = evt.dataTransfer.getData('itemID')
      if(itemID!==""){
        const item = this.items.find(itemTmp => itemTmp.id === Number(itemID))
        if(item.list === 2 || list!==2){
          item.list = item.type
        }
        else{
          this.duplication(item)
          item.list = list
        }
        console.log("ajout à la liste : ",item.list)
        if (list === 2){
          item.position=this.listProg.length+1
        }
    }
    },

    /** Duplique un item du DSL pour pouvoir utiliser plusieurs fois les mêmes cases dans le programme **/
    duplication(item){
      let len = this.items.length
      this.items[len] = {
        id: len,
        title: item.title,
        position: -1,
        type: item.type,
        list: item.list
      }
    },

    /** Vérifie que la valeur donnée en input est bien un nombre puis l'attribue **/
    validation(id){
      this.error = ''
      const item = this.items.find(itemTmp => itemTmp.id === id)
      if(!isNaN(this.message[item.id])) item.input = this.message[item.id]
      else this.error = 'Le champ est vide'
      this.message[item.id] = ""
    },

    /** Envoie le programme donné à l'interpréteur **/
    launch(){
      console.log("envoi du programme suivant : ",this.listProg)
      this.$emit("launch",this.listProg)
    },

    /** Envoie le programme donné à la gestion des macros **/
    macro(){
      console.log("envoi du programme suivant : ",this.listProg)
      this.$emit("macro",this.listProg)
    },

    /** Supprime une case du programme **/
    suppr(item){
      item.list = -1
    },

    /** Déplace une case d'un cran vers le haut du programme **/
    up(selected){
      let save = 0
      let check = this.listProg[0].id === selected.id
      console.log(check)
      this.listProg.forEach((item,index) =>{
        if(selected.id === item.id && !check){
          save = this.listProg[index-1].position
          this.listProg[index-1].position = selected.position
          selected.position = save
        }
      })
    },

    /** Déplace une case d'un cran vers le bas du programme **/
    down(selected){
      let save = 0
      let check = this.listProg[this.listProg.length-1].id === selected.id
      this.listProg.forEach((item,index) =>{
        if(selected.id === item.id && !check){
          save = this.listProg[index+1].position
          this.listProg[index+1].position = selected.position
          selected.position = save
        }
      })
    }
  }
}
</script>

<style scoped>
  .droite {
    float: right;
    position: relative;
    border: 1px solid black;
    margin-top: 3%;
    right: 3%;
  }
  .gauche {
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

#creationMacro{
  margin-top: 3%;
  margin-left: 1%;
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
