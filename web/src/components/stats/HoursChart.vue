<template>
  <div>
    {{updateData()}}
    <div class="field is-grouped">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" :value="2" v-model="selectedTimeOfTheDay" />
          Afternoon
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" :value="1" v-model="selectedTimeOfTheDay" />
          Morning
        </label>
      </div>
    </div>

    <line-chart
      :width="500"
      :height="300"
      :labels="[
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday ',
        'Friday',
        'Saturday',
        'Sunday',
      ]"
      :datasets="displayedDatasets"
      :options="$options.options"
    ></line-chart>
  </div>
</template>

<script>
import numeral from "numeral";
import LineChart from "./LineChart";
const options = {
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero:false,
          precision: 2,
          stepSize: 2,
          reverse: true,
          suggestedMax: 24,
        },
        scaleLabel: {
        display: true,
        labelString: 'Hour'
        },
        stacked: false,
        afterTickToLabelConversion : function(q){
        for(var tick in q.ticks){
            q.ticks[tick] += 'h';
        }
    }
      },
    ],
  },
  tooltips: {
    mode: "index",
    callbacks: {
      label(tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label;
        const value = numeral(tooltipItem.yLabel).format("$0,0");
        return `${label}: ${value}`;
      },
    },
  },
};
export default {
  name: "Hours-chart",
  options,
  components: {
    LineChart,
  },
  props: {
    id: Number,
  },
  data() {
    return {
      datacollection: this.fillData(),
      selectedTimeOfTheDay: [1, 2],
      idCommerce : this.getId(),
    };
  },
  computed: {
    displayedDatasets() {
      return this.selectedTimeOfTheDay.map((time) => this.datacollection[time]);
    },
  },
  methods: {
    updateData() {
      this.datacollection = this.fillData();
    },
    getId(){
        console.log("ID: ", this.$store.getters.getId);
        return this.$store.getters.getId;
    },
    getHours() {
      let hours = this.$store.getters.hoursTable(this.getId());
      return hours;
    },
    fillData() {
        console.log(this.getHours().Lundi[0]);
        var AfternoonData;
        if (this.getHours().Lundi[1] !== undefined) {
            AfternoonData =
                    [
                      [this.getHours().Lundi[1].heureOuverture, this.getHours().Lundi[1].heureFermeture],
                      [this.getHours().Mardi[1].heureOuverture, this.getHours().Mardi[1].heureFermeture],
                      [this.getHours().Mercredi[1].heureOuverture, this.getHours().Mercredi[1].heureFermeture],
                      [this.getHours().Jeudi[1].heureOuverture, this.getHours().Jeudi[1].heureFermeture],
                      [this.getHours().Vendredi[1].heureOuverture, this.getHours().Vendredi[1].heureFermeture],
                      [this.getHours().Samedi[1].heureOuverture, this.getHours().Samedi[1].heureFermeture],
                      [this.getHours().Dimanche[1].heureOuverture, this.getHours().Dimanche[1].heureFermeture],
                    ]
          } else { //si on a un parking par exemple
            AfternoonData = [
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
            ]
          }
          var datacollection = {
            2: {
              label: "Afternoon",
              borderColor: "rgba(50, 115, 220, 0.5)",
              backgroundColor: "rgba(0,255,0,0.4)",
              data: AfternoonData,
            },
            1: {
              label: "Morning",
              borderColor: "rgba(255, 56, 96, 0.5)",
              backgroundColor: "rgba(0,255,0,0.4)",
              data: [
                [this.getHours().Lundi[0].heureOuverture, this.getHours().Lundi[0].heureFermeture],
                [this.getHours().Mardi[0].heureOuverture, this.getHours().Mardi[0].heureFermeture],
                [this.getHours().Mercredi[0].heureOuverture, this.getHours().Mercredi[0].heureFermeture],
                [this.getHours().Jeudi[0].heureOuverture, this.getHours().Jeudi[0].heureFermeture],
                [this.getHours().Vendredi[0].heureOuverture, this.getHours().Vendredi[0].heureFermeture],
                [this.getHours().Samedi[0].heureOuverture, this.getHours().Samedi[0].heureFermeture],
                [this.getHours().Dimanche[0].heureOuverture, this.getHours().Dimanche[0].heureFermeture],
              ],
            },
          }
      return datacollection;
    },
  },
};
</script>