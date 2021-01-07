<template>
  <div>
    <h2>
      <p>
        <em v-bind:class="Logo"></em> Événement à
        <em class="majorText">{{ NomPointInteret }}</em>
      </p>
      <p>Titre de l'événement:</p>
      <p  class="descriptionText">{{ NomEvenement }}</p>
      <p style="white-space: pre-line">Description de l'événement:</p>
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
  background-color: #28ff3a;
  border-radius: 50px;
  border: 3px solid #0cb50b;
  justify-content: center;

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
