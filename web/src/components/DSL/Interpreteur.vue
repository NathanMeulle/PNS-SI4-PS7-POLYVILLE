<template>
  <DSL v-on:launch="getData($event)"/>
  <h1>Interpreteur</h1>
  <span id="error">{{error}}</span>
</template>

<script>
import DSL from "@/components/DSL/DSL";
export default {
  name: "Interpreteur",
  components: {DSL},

  data(){
    return{
      programme:{},
      posZone: {},
      error: "",
    }
  },

  methods:{
    getData(listeCommandes){
      this.error = ""
      this.programme = listeCommandes
      console.log("mon programme : ",this.programme)
      this.checkError()
      this.getZone()
    },
    checkError(){
      let valid = this.checkIfThen()
      if(valid === 1) this.error = 'Il est nécessaire de mettre une case "Alors" si vous avez utilisé une cas "Si" et inversement'
      if(valid === 2) this.error = 'Il est nécessaire de mettre la case "Si" avant la case "Alors"'
    },
    checkIfThen(){
      let posIf = -1
      let posThen = -1
      let presence = false
      this.programme.forEach((item,index)=>{
        if(item.title === "Si") {
          posIf = index
          presence = true
        }
        else if (item.title === "Alors"){
          posThen = index
          presence = true
        }
      })
      if(!presence) return 0
      if(posIf === -1 || posThen === -1) return 1
      if (posIf > posThen) return 2
      return 0
    },
    getZone(){
      this.programme.forEach((item)=>{
        if(item.title === "Zone A"){
          this.posZone[0] = 43.6204
          this.posZone[1] = 7.0719
        }
        else if(item.title === "Zone B"){
          this.posZone[0] = 43.6204
          this.posZone[1] = 7.0619
        }
      })
      console.log("Zone : ",this.posZone)
    }
  }
}
</script>

<style scoped>
#error{
  color: red;
}


</style>
