<template>
  <div>
    Graphique des horaires du magasin
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

    <bar-chart
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
    ></bar-chart>
  </div>
</template>

<script>
//import numeral from "numeral";
import BarChart from "./BarChart";
import store from '../../store/store';
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
  responsive: true,
  legend: {
    position: "top",
    labels: {
      filter: function (item) {
        if (!document.getElementById("AfternoonBox").checked) {
          return item.text.includes(" "); //fait apparaître les légendes de l'après-midi
        } else {
          return !item.text.includes(" "); //fait disparaître les légendes de l'après-midi
        }
      },
    },
    onClick: function (e, legendItem) {
      
      // permet de lier les après-midis aux matinées dans la légende
      // afin d'avec 1 clic masquer/afficher les horaires de la semaines
      var index = legendItem.datasetIndex;
      var ci = this.chart;
      var alreadyHidden =
        ci.getDatasetMeta(index).hidden === null
          ? false
          : ci.getDatasetMeta(index).hidden;

      ci.data.datasets.forEach(function (e, i) {
        var meta = ci.getDatasetMeta(i);
        let indexForAfternoonLegend = index + store.getters.getWeeksNumber; //sert à s'adapter au nombre de semaines
        if (i !== index && i !== indexForAfternoonLegend) {
          if (!alreadyHidden) {
            meta.hidden = meta.hidden === null ? !meta.hidden : null;
          } else if (meta.hidden === null) {
            meta.hidden = true;
          }
        } else {
          meta.hidden = null;
        }
      });

      ci.update();
    },
  },
  tooltips: {
    mode: "index",
    // permet l'affichage des données quand on passe la souris sur le graph
    /*callbacks: {
      label(tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label;
        const value = numeral(tooltipItem.yLabel).format("$0,0");
        return `${label}: ${value}`;
      },
    },*/
  },
};
export default {
  /**
   * Composant d'affichage du graphique des horaires et des Checkbox
   */
  name: "Hours-chart",
  options,
  components: {
    BarChart,
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
    /**
     * Renvoie tous les blocks de données (datacollection) à afficher selon les checkbox activées
     */
    checkSelectedTimeOfTheDay() {
      var res = [];
      if (this.selectedTimeOfTheDay.includes("Afternoon")) {
        for (let i = 0; i < this.getHours().length; i++) {
          res.push("Afternoon" + i);
        }
      }
      if (this.selectedTimeOfTheDay.includes("Morning")) {
        for (let i = 0; i < this.getHours().length; i++) {
          res.push("Morning" + i);
        }
      }
      return res;
    },
    updateData() {
      this.datacollection = this.fillData();
    },
    getId() {
      return this.$store.getters.getId;
    },
    /**
     * Récupère les horaires selon l'id du composant
     */
    getHours() {
      let hours = this.$store.getters.hoursTable(this.getId());
      return hours;
    },
    /**
     * Créé les données du graphique
     */
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
      for (let j = 0; j < this.getHours().length; j++) {
        semaine = this.getHours()[j].semaine;
        i = 0;
        let AfternoonData = new Array(7);
        let MorningData = new Array(7);
        if (semaine.Lundi[1] !== undefined) {
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(semaine)) {
            // mise des valeurs de l'après midi
            if (value[1].heureFermeture === 0) {
              //cas où le commerce est fermé l'après-midi
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

          }
        } else {
          //si on a un parking par exemple
          i = 0;
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(semaine)) {
            if (value[0].heureFermeture === 0) {
              //cas où le parking est fermé ce jour
              MorningData[i] = [null, null];
            } else {
              MorningData[i] = [
                value[0].heureOuverture,
                value[0].heureFermeture,
              ];
            }
            i++;
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
        let week = j + 1;
        datacollection["Afternoon" + j] = {
          label: "semaine" + week,
          borderColor: "rgba(50, 115, 220, 0.5)",
          backgroundColor: colors[j % 6],
          data: AfternoonData,
          stack: j,
        };
        datacollection["Morning" + j] = {
          label: "semaine" + week + " ",
          borderColor: "rgba(255, 56, 96, 0.5)",
          backgroundColor: colors[j % 6],
          data: MorningData,
          stack: j,
        };
      }
      return datacollection;
    },
  },
};
</script>
