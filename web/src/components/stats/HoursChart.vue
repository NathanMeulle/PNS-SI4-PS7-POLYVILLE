<template>
  <div>
    <div class="field is-grouped">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" :value="2" v-model="selectedYears">
          Afternoon
        </label>
      </div>
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" :value="1" v-model="selectedYears">
          Morning
        </label>
      </div>
    </div>

    <line-chart
      :width="500"
      :height="300"
      :labels="['Monday', 'Tuesday', 'Wednesday', 'Thursday ', 'Friday','Saturday','Sunday' ]"
      :datasets="displayedDatasets"
      :options="$options.options"
    ></line-chart>
  </div>
</template>

<script>
import numeral from 'numeral';
import LineChart from './LineChart';
const datasets = {
  2: {
    label: "Afternoon",
    borderColor: 'rgba(50, 115, 220, 0.5)',
    backgroundColor: 'rgba(0,255,0,0.4)',
    data: [[2,8], [3,8], [2,8],[2,8], [2,8]]
  },
  1: {
    label: 'Morning',
    borderColor: 'rgba(255, 56, 96, 0.5)',
    backgroundColor: 'rgba(0,255,0,0.4)',
    data: [[8.5,12], [9,12], [9,12],[9,12],[10,12]]
  },
  
};
const options = {
  scales: {
            xAxes: [{
              
                stacked: true
            }],
            yAxes: [{
               ticks: {
                    precision: 2,
                    suggestedMax: 24,
                    stepSize: 2,
                },
                stacked: true
            }]
        },
  tooltips: {
    mode: 'index',
    callbacks: {
      label(tooltipItem, data) {
        const label = data.datasets[tooltipItem.datasetIndex].label;
        const value = numeral(tooltipItem.yLabel).format('$0,0');
        return `${label}: ${value}`;
      }
    }
  }
};
export default {
  name: 'Hours-chart',
  datasets,
  options,
  components: {
    LineChart
  },
  data() {
    return {
      selectedYears: [1, 2]
    };
  },
  computed: {
    displayedDatasets() {
      return this.selectedYears.map(year => datasets[year]);
    }
  }
}
</script>