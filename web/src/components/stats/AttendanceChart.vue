<template>
  <div>
      Graphique de l'affluence moyenne du magasin
    {{ updateData() }}
    <div class="field is-grouped">
      <div class="control">
        <label class="checkbox">
          <input
            id="MorningBox"
            type="checkbox"
            value="Morning"
            v-model="selectedTimeOfTheDay"
          />
          Matin
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input
            id="AfternoonBox"
            type="checkbox"
            value="Afternoon"
            v-model="selectedTimeOfTheDay"
          />
          Après-midi
        </label>
      </div>
    </div>

    <line-chart
      :width="500"
      :height="300"
      :labels="[
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi ',
        'Vendredi',
        'Samedi',
        'Dimanche',
      ]"
      :datasets="displayedDatasets"
      :options="$options.options"
    ></line-chart>
  </div>
</template>

<script>
//import numeral from "numeral";
import LineChart from "./LineChart";
import numeral from "numeral";
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
          suggestedMax: 500,
        },
        scaleLabel: {
          display: true,
          labelString: "Clients",
        },
        stacked: true,
      },
    ],
  },
  responsive: true,
  legend: {
    display: false
  },
  tooltips: {
    mode: "index",
    // permet l'affichage des données quand on passe la souris sur le graph
    callbacks: {
      label(tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label;
        const value = numeral(tooltipItem.yLabel).format("0");
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
      return this.checkSelectedTimeOfTheDay().map(
        (time) => this.datacollection[time]
      );
    },
  },
  methods: {
    checkSelectedTimeOfTheDay() {
      //renvoie tous les datasets à afficher selon les checkbox activées
      var res = [];
      if (this.selectedTimeOfTheDay.includes("Afternoon") && !this.selectedTimeOfTheDay.includes("Morning")) {
        //box après-midi cochée
        res.push("Afternoon");
      }
      else if (this.selectedTimeOfTheDay.includes("Morning")&& !this.selectedTimeOfTheDay.includes("Afternoon")) {
        //box matin cochée
        res.push("Morning");

      }
      else if (this.selectedTimeOfTheDay.includes("Morning")&& this.selectedTimeOfTheDay.includes("Afternoon")){
        //box matin et après-midi cochées
        res.push("Total");
      }
      return res;
    },
    updateData() {
      this.datacollection = this.fillData();
    },
    getId() {
      return this.$store.getters.getId;
    },
    getSchedule() {
      let hours = this.$store.getters.hoursTable(this.getId());
      return hours;
    },
    fillData() {
      var colors = [
        "rgba(255, 99, 132, 0.4)",
        "rgba(54, 162, 235, 0.4)",
        "rgba(255, 206, 86, 0.4)",
        "rgba(75, 192, 192, 0.4)",
        "rgba(153, 102, 255, 0.4)",
        "rgba(255, 159, 64, 0.4)",
      ];
      var i = 0;
      var semaine = null;
      var datacollection = {};
      var AfternoonData = new Array(0,0,0,0,0,0,0);
      var MorningData = new Array(0,0,0,0,0,0,0);
      var DayData = new Array(0,0,0,0,0,0,0);
      var weeksCount = this.getSchedule().length;
      for (let j = 0; j < weeksCount; j++) {
        semaine = this.getSchedule()[j].semaine;
        i = 0;
        
        if (semaine.Lundi[1] !== undefined) {
          for (const [key, value] of Object.entries(semaine)) {
            // mise des valeur
            
              AfternoonData[i] += value[1].affluence;
              MorningData[i] += value[0].affluence;
              DayData[i] += AfternoonData[i] + MorningData[i];
            i++;
            key;
          }
        } else {
          //si on a un parking par exemple
          i = 0;
          for (const [key, value] of Object.entries(semaine)) {
              MorningData[i] += value[0].affluence;
              DayData[i] += MorningData[i];
            i++;
            key;
            }
          
          AfternoonData = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
          ];
            }
        }
        
        for (let j=0; j < 7;j++ ){
            MorningData[j] = MorningData[j]/weeksCount;
            if(AfternoonData[j] !== null){
                AfternoonData[j] = AfternoonData[j]/weeksCount;
                DayData[j] = MorningData[j] + AfternoonData[j];
            }
            else{
                 DayData[j] = MorningData[j]
            }
        }

        datacollection["Afternoon"] = {
          label: "Après-midi",
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: colors[1],
          data: AfternoonData,
          steppedLine: 'middle',
        };
        datacollection["Morning"] = {
          label: "Matin" + " ",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: colors[0],
          data: MorningData,
          steppedLine: 'middle',
        };
        datacollection["Total"] = {
          label: "Total",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: colors[2],
          data: DayData,
          steppedLine: 'middle',
        };
        
      return datacollection;
    },
  },
};
</script>
