<template>
  <div>
    {{ updateData() }}
    <div class="field is-grouped">
      <div class="control">
        <label class="checkbox">
          <input
            type="checkbox"
            value="Afternoon"
            v-model="selectedTimeOfTheDay"
          />
          Afternoon
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input
            type="checkbox"
            value="Morning"
            v-model="selectedTimeOfTheDay"
          />
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
          beginAtZero: false,
          precision: 2,
          stepSize: 2,
          reverse: true,
          //suggestedMax: 24,
        },
        scaleLabel: {
          display: true,
          labelString: "Hour",
        },
        stacked: false,
        afterTickToLabelConversion: function (q) {
          for (var tick in q.ticks) {
            q.ticks[tick] += "h";
          }
        },
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
      selectedTimeOfTheDay: ["Afternoon", "Morning"],
      idCommerce: this.getId(),
    };
  },
  computed: {
    displayedDatasets() {
      return this.checkSelectedTimeOfTheDay().map((time) => this.datacollection[time]);
    },
  },
  methods: {
    checkSelectedTimeOfTheDay(){ //renvoie tous les datasets à afficher selon les checkbox activées
      var res = [];
      if(this.selectedTimeOfTheDay.includes("Afternoon")){
        res.push("Afternoon0","Afternoon1","Afternoon2","Afternoon3");
      }
      if(this.selectedTimeOfTheDay.includes("Morning")){
        res.push("Morning0","Morning1","Morning2","Morning3");
      }
      return res;
    },
    updateData() {
      this.datacollection = this.fillData();
    },
    getId() {
      return this.$store.getters.getId;
    },
    getHours() {
      let hours = this.$store.getters.hoursTable(this.getId());
      return hours;
    },
    fillData() {
      var colors= ['rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)']
      var i = 0;
      var semaine = null;
      var datacollection = {} ;
      for (let j = 0; j < this.getHours().length; j++) {
        semaine = this.getHours()[j].semaine;
        i = 0;
        let AfternoonData = new Array(7);
        let MorningData = new Array(7);
        if (semaine.Lundi[1] !== undefined) {
          for (const [key, value] of Object.entries(semaine)) {
            // mise des valeur de l'après midi
            if (value[1].heureFermeture === 0) {
              //cas où le commerce est fermée l'après-midi
              AfternoonData[i] = [null, null];
            } else {
              AfternoonData[i] = [
                value[1].heureOuverture,
                value[1].heureFermeture,
              ];
            }

            // mise des valeur du matin
            if (value[0].heureFermeture === 0) {
              //cas où le commerce est fermée le matin
              MorningData[i] = [null, null];
            } else {
              MorningData[i] = [
                value[0].heureOuverture,
                value[0].heureFermeture,
              ];
            }
            i++;
            
            key;
          }
        } else {
          //si on a un parking par exemple
          i = 0;
          for (const [key, value] of Object.entries(semaine)) {
            if (value[0].heureFermeture === 0) {
              //cas où le parking est fermée ce jour
              MorningData[i] = [null, null];
            } else {
              MorningData[i] = [
                value[0].heureOuverture,
                value[0].heureFermeture,
              ];
            }
            i++;
            key;
          }
          AfternoonData = [
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
          [null, null],
        ];
        
        }
        let week = j+1;
        datacollection['Afternoon' + j] = {
          label: "week"+week,
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: colors[j%6],
          data: AfternoonData,
          stack: j,
        };
        datacollection['Morning' + j] = {
          label: "week"+week,
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: colors[j%6],
          data: MorningData,
          stack: j,
        };
        
   
          
        
      }
      
      

      /*var datacollection = {
        Afternoon: {
          label: "Afternoon",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(0,255,0,0.4)",
          data: AfternoonData,
          stack: 1,
        },
        Morning: {
          label: "Morning",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: "rgba(0,255,0,0.4)",
          data: MorningData,
          stack: 1,
        },
        3: {
          label: "haha",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: "rgba(0,255,255,0.4)",
          data: AfternoonData,
          stack: 2,
        },
      };
      datacollection;*/
      return datacollection;
    },
  },
};
</script>
