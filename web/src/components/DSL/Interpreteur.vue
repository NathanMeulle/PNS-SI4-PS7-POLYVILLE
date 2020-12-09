<template>
  <DSL v-on:launch="getData($event)"/>
  <h1>Interpreteur</h1>
  <text>{{result}}</text>
</template>

<script>
import DSL from "@/components/DSL/DSL";
export default {
  name: "Interpreteur",
  components: {DSL},

  data(){
    return{
      programme:{},
      result: 0,
    }
  },

  methods:{
    getData(listeCommandes){
      this.programme = listeCommandes
      console.log("mon programme : ",this.programme)
      this.useless()
    },
    useless(){
      let si = 0
      let alors = 0
      let pour = 0
      this.programme.forEach((item)=>{
        console.log(item)
        if(item.title === "Si") si=Number(item.input)
        if(item.title === "Alors") alors=Number(item.input)
        if(item.title === "Pour") pour=Number(item.input)
      })
      this.result = si + alors + pour
      console.log("res : ",this.result)
    }
  }
}
</script>

<style scoped>

</style>
