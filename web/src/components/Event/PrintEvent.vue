<template>
  <div>
    <h2>
      <p>
        <em v-bind:class="Logo"></em>
        <em>Nom de l'événement : </em>
        <em  class="descriptionText">{{ NomEvenement }}</em>
      </p>
      <div v-if="nomPointInt !==''">
        <p>Événement à : </p>
        <p class="descriptionText">{{ NomPointInteret }}</p>
      </div>
      <p style="white-space: pre-line">Description de l'événement :</p>
      <p class="descriptionText">{{ Description }}</p>
      <div v-if="Regle !== ''">
        <p style="white-space: pre-line">Règle ajoutée :</p>
        <p class="descriptionText">{{ resultat }}</p>
      </div>
    </h2>
  </div>
</template>

<script>
export default {
  name: "PrintEvent",
  props: {
    NomPointInteret: String,
    NomEvenement: String,
    Description: String,
    Logo: String,
    Regle: Object
  },
  data() {
    return {
      regle: {},
      resultat: "",
      nomPointInt: "",
    };
  },

  updated() {
    this.nomPointInt = this.NomPointInteret
    this.regle = this.Regle
    if(this.regle.name === "affichage pour type de magasins"){
      this.resultat = "L'affichage de cet événement se fera sur tous/toutes les " + this.regle.magasin + " de la ville."
    }
    else if (this.regle.name === "condition affichage pour type de magasins"){
      this.resultat = "L'affichage de cet événement se fera sur tous/toutes les " + this.regle.magasin +
          " de la ville si le nombre de citoyen à proximité dépasse " + this.regle.citoyen + "."
    }
    else if (this.regle.name === "condition affichage"){
      this.resultat = "Cet événement s'affichera uniquement si le nombre de citoyens présents dans la " +
          this.regle.zone + " dépasse " + this.regle.nbCitize +"."
    }
  },

  methods: {},
};
</script>

<style scoped>
h2 {
  margin: 10px;
  background-color: rgba(50, 255, 70, 0.45);
  border-radius: 50px;
  border: 3px solid #0cb50b;
  justify-content: center;

}
p {
  margin-left: 5px;
}
.majorText {
  margin-right: 30%;
  color: #1f1e1f;
  justify-content: center;
}
.descriptionText {
  font-weight: 200;
  font-size: 80%;
  text-align: center;
  justify-content: center;
}
</style>
