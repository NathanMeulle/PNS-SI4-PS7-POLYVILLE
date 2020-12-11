<template>
  <span id="error">{{error}}</span>
  <div class='drop-zone' @drop='onDrop($event, 5)' @dragover.prevent @dragenter.prevent id="data">
    Données :
    <div v-for='item in listInput' :key='item.title' class='drag-el' draggable="true" @dragstart='startDrag($event, item)'>
      {{item.input}}
      <label>
        <input v-model="this.message[item.id]">
        <button v-on:click="validation(item.id)">OK</button>
      </label>
    </div>
  </div>
  <div class='drop-zone' @drop='onDrop($event, 1)' @dragover.prevent @dragenter.prevent id="cond">
    Conditions :
    <div v-for='item in listCond' :key='item.title' class='drag-el'  draggable="true" @dragstart='startDrag($event, item)'>
      {{ item.title }}
    </div>
  </div>
  <div class='drop-zone' @drop='onDrop($event, 3)' @dragover.prevent @dragenter.prevent>
    Personnes :
    <div v-for='item in listPers' :key='item.title' class='drag-el'  draggable="true" @dragstart='startDrag($event, item)'>
      {{ item.title }}
    </div>
  </div>
  <div class='drop-zone' @drop='onDrop($event, 4)' @dragover.prevent @dragenter.prevent>
    Quartiers :
    <div v-for='item in listQuartiers' :key='item.title' class='drag-el'  draggable="true" @dragstart='startDrag($event, item)'>
      {{ item.title }}
    </div>
  </div>
  <div class='drop-zone' @drop='onDrop($event, 2)' @dragover.prevent @dragenter.prevent>
    Mon programme :
    <div v-for='item in listProg' :key='item.title' class='drag-el'  draggable="true" @dragstart='startDrag($event, item)'>
      <div v-if="item.type !== 5">{{ item.title }}</div>
      {{item.input}}
    </div>
  </div>
  <br/>
  <button v-on:click="launch()">Lancer mon programme</button>
</template>

<script>

export default {
  name: "DSL",
  data () {
    return {
      error:'',
      items: [
        {
          id: 0,
          title: 'Pour',
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
          list: 4
        },
        {
          id: 6,
          title: 'Zone B',
          position: -1,
          type:4,
          list: 4
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
          title: 'Input',
          input: '',
          position: -1,
          type:5,
          list: 5
        },
        {
          id: 9,
          title: 'Plus grand que',
          position: -1,
          type:1,
          list: 1
        },
        {
          id: 10,
          title: 'Plus petit que',
          position: -1,
          type:1,
          list: 1
        },
      ],
      message : {
        "0" : "",
        "1" : "",
        "2" : ""
      }
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
    listQuartiers () {
      return this.sortItems(this.items.filter(item => item.list === 4))
    },
    listInput () {
      return this.sortItems(this.items.filter(item => item.list === 5))
    },
  },

  methods:{
    sortItems(liste){
      return liste.sort((a, b) => a.position - b.position)
    },

    startDrag: (evt, item) => {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    },
    onDrop (evt, list) {
      this.error = ''
      const itemID = evt.dataTransfer.getData('itemID')
      const item = this.items.find(item => item.id === Number(itemID))
      if(item.list === 2 || list!==2){
        this.error = "Déplacement impossible"
        item.list = item.type
      }
      else item.list = list
      console.log("ajout à la liste : ",item.list)
      if (list === 2){
        item.position=this.listProg.length+1
      }
    },
    validation(id){
      const item = this.items.find(item => item.id === id)
      item.input = this.message[item.id]
      this.message[item.id] = ""
    },
    launch(){
      console.log("envoi du programme suivant : ",this.listProg)
      this.$emit("launch",this.listProg)
    }
  }
}
</script>

<style scoped>
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
  color: red;
}

#cond{
  margin-top: 10px;
}
</style>
