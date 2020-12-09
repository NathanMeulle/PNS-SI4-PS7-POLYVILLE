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
      this.programme.forEach((item)=>{
        let si = 0
        let alors = 0
        let pour = 0
        if(item.title === "Si") si=item.input
        if(item.title === "Alors") alors=item.input
        if(item.title === "Pour") pour=item.input
        this.result = si + alors + pour
      })
    }
  }
}
</script>

<style scoped>

</style>
