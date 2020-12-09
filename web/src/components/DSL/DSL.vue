<template>
  <div>
    <div class='drop-zone' @drop='onDrop($event, 1)' @dragover.prevent @dragenter.prevent>
      Conditions :
      <div v-for='item in listOne' :key='item.title' class='drag-el' draggable="true" @dragstart='startDrag($event, item)'>
        {{ item.title }}
        {{item.input}}
        <label>
          <input v-model="this.message[item.id]">
          <button v-on:click="validation(item.id)">OK</button>
        </label>
      </div>
    </div>
    <div class='drop-zone' @drop='onDrop($event, 3)' @dragover.prevent @dragenter.prevent>
      Personnes :
      <div v-for='item in listThree' :key='item.title' class='drag-el'  draggable="true" @dragstart='startDrag($event, item)'>
        {{ item.title }}
        {{item.input}}
      </div>
    </div>
    <div class='drop-zone' @drop='onDrop($event, 2)' @dragover.prevent @dragenter.prevent>
      Mon programme :
      <div v-for='item in listTwo' :key='item.title' class='drag-el'  draggable="true" @dragstart='startDrag($event, item)'>
        {{ item.title }}
        {{item.input}}
      </div>
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
      items: [
        {
          id: 0,
          title: 'Pour',
          input: '',
          position: -1,
          list: 1
        },
        {
          id: 1,
          title: 'Si',
          input: '',
          position: -1,
          list: 1
        },
        {
          id: 2,
          title: 'Alors',
          input: '',
          position: -1,
          list: 1
        },
        {
          id: 3,
          title: 'policiers',
          input: '',
          position: -1,
          list: 3
        },
        {
          id: 4,
          title: 'citoyens',
          input: '',
          position: -1,
          list: 3
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
    listOne () {
      return this.sortItems(this.items.filter(item => item.list === 1))
    },
    listTwo () {
      return this.sortItems(this.items.filter(item => item.list === 2))
    },
    listThree () {
      return this.sortItems(this.items.filter(item => item.list === 3))
    }
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
      const itemID = evt.dataTransfer.getData('itemID')
      const item = this.items.find(item => item.id === Number(itemID))
      item.list = list
      console.log("ajout à la liste : ",item.list)
      if(list === 1){
        item.position=this.listOne.length+1
      }
      else if (list === 2){
        item.position=this.listTwo.length+1
      }
    },
    validation(id){
      const item = this.items.find(item => item.id === id)
      item.input = this.message[item.id]
      this.message[item.id] = ""
    },
    launch(){
      console.log("envoi du programme suivant : ",this.listTwo)
      this.$emit("launch",this.listTwo)
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
</style>
