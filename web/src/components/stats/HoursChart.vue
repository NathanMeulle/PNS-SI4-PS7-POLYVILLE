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
          //suggestedMax: 24,
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
        var AfternoonData = new Array(7);
        var MorningData = new Array(7);
        if (this.getHours().Lundi[1] !== undefined) {
          var i=0;
           for (const [key, value] of Object.entries(this.getHours())) {
             
             // mise des valeur de l'après midi
             if (value[1].heureFermeture === 0){ //cas où le commerce est fermée l'après-midi
                AfternoonData[i] = [null,null];
             }
             else{
                AfternoonData[i] = [value[1].heureOuverture, value[1].heureFermeture];
             }

             // mise des valeur du matin
             if (value[0].heureFermeture === 0){ //cas où le commerce est fermée le matin
                MorningData[i] = [null,null];
             }
             else{
                MorningData[i] = [value[0].heureOuverture, value[0].heureFermeture];
             }
             i++;
             console.log(AfternoonData);
             key;
           }
          } else { //si on a un parking par exemple
            AfternoonData = [
              [null, null],
              [null, null],
              [null, null],
              [null, null],
              [null, null],
              [null, null],
              [null, null],
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
              data: MorningData,
            },
          }
      return datacollection;
    },
  },
};
</script>