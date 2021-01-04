<template>
  <h1>Aide</h1>
  <h2>Types de programmes disponibles : </h2>
  <br/>
  <div>Changer l'horaire de fermeture des magasins de la ville :
    <br/>
    Pour tous => magasins => fermeture => "entrer une heure" => heures
  </div>
  <br/>
  <div>Réinitialiser les horaires de fermeture des magasins :
    <br/>
    Pour tous => magasins => réinitialiser => heures => fermeture
  </div>
  <br/>
  <div>Attribuer des policiers à une zone en fonction du nombre de citoyens s'y trouvant :
    <br/>
        Si => citoyens => Zone X => Plus grand que ou Plus petit que => "entrer un nombre" => Alors => "entrer un nombre" => policiers => Zone X
  </div>
  <br/>
  <router-link active-class="active" to="/dsl">
    <div class="bouton">Retour au langage dédié</div>
  </router-link>
</template>

<script>
export default {
name: "Help"
}
</script>

<style scoped>

.bouton{
  width: 15%;
  border-radius: 50px;
  text-align: center;
  font-family: "Sofia", sans-serif;
  font-size: 18px;
  border: 3px solid #0cb50b;
  cursor: pointer;
  box-shadow: 4px 4px 2px 1px #266027;
}

</style>
