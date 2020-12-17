<template>
  <h1>Aide</h1>
  <h2>Types de programmes disponible : </h2>
  <br/>
  <div>Changer l'horaire de fermeture des magasins de la ville :
    <br/>
    Pour tous => magasins => fermeture => "entrer une heure" => heures
  </div>
  <br/>
  <div>Réinitialiser les horaires de fermeture des magasins :
    <br/>
    Pours tous => magasins => réinitialiser => heurs => fermeture
  </div>
  <br/>
  <div>Attribuer des policiers à une zone en fonction du nombre de citoyens s'y trouvant :
    <br/>
        Si => citoyens => Zone X => Plus grand que ou Plus petit que => "entrer un nombre" => Alors => "entrer un nombre" => policiers => Zone X
  </div>
  <br/>
  <router-link active-class="active" to="/dsl">
    <button>Retour au langage dédié</button>
  </router-link>
</template>

<script>
export default {
name: "Help"
}
</script>

<style scoped>

</style>
