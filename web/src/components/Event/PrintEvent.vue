<template>
  <div>
    
    <h2>
    <p>Evénement à <font class = "majorText">{{ NomPointInteret }}</font></p>
    <p>Titre de l'événement:</p>
        <p align="center" class = "descriptionText">{{ NomEvenement }} </p>
    <p style="white-space: pre-line;">Description de l'événement:</p>
        <p align="center" class = "descriptionText">{{ Description }}</p>
    </h2>
  </div>

</template>

<script>
 
export default {
name: "PrintEvent",
props: {
        NomPointInteret: Object,
        NomEvenement:Object,
        Description:Object,
        logo: Object,
},
methods: {
    getIcon(){
        console.log(this.logo);
    }
}
}
</script>

<style scoped>
h2 {
  margin-left: 30%;
  margin-right: 30%;
  border-width:2px;
  background-color:yellow;
}
.majorText {
  margin-right: 30%;
  color: red;
}
.descriptionText {
  font-weight: 200;
  font-size: 80%;
}
.logo{
  float: right;
}
</style>
