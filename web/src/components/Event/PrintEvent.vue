<template>
  <div>
    <h2>
      <p>
        <em v-bind:class="Logo"></em>
        <em>Nom de l'événement : </em>
        <em  class="descriptionText">{{ NomEvenement }}</em>
      </p>
      <p>Événement à : </p>
      <p class="majorText">{{ NomPointInteret }}</p>
      <p style="white-space: pre-line">Description de l'événement :</p>
      <p class="descriptionText">{{ Description }}</p>
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
  },
  data() {
    return {};
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
