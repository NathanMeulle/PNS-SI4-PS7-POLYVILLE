<template>
  <h1>Aide</h1>
  <h2>Programmes disponibles pour créer votre événement : </h2>
  <br/>
  <div>Afficher votre événement en fonction du nombre de personnes présentes dans une zone :
    <br/>
    Si => citoyens => zone X => plus grand que => "entrer une valeur" => alors => afficher => événement
  </div>
  <router-link active-class="active" to="/eventPage">
    <div class="bouton">Retour à la création d'événement</div>
  </router-link>
</template>

<script>
export default {
name: "HelpEvent"
}
</script>

<style scoped>

.bouton{
  margin-top: 2%;
  width: 18%;
  border-radius: 50px;
  text-align: center;
  font-family: "Sofia", sans-serif;
  font-size: 18px;
  color: black;
  border: 3px solid #0cb50b;
  cursor: pointer;
  box-shadow: 4px 4px 2px 1px #266027;
}

</style>
