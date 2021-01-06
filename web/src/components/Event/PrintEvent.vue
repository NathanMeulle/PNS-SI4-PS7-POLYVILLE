<template>
  <div>
    <h2>
      <p>
        <em v-bind:class="Logo"></em> Evénement à
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
  margin-left: 30%;
  margin-right: 30%;
  border-width: 2px;
  background-color: yellow;
}
.majorText {
  margin-right: 30%;
  color: red;
}
.descriptionText {
  font-weight: 200;
  font-size: 80%;
  text-align: center;
}
</style>
