<template>
  <div>
    <div v-if="loading" class="loader">
      <pulse-loader :loading="loading">Loading</pulse-loader>
    </div>
    <b-container v-else>
      <h1>{{consumer_data[0].consumer.name}}</h1>
      <b-row class="options-row">
        <b-col md="6" class="my-1">
          <b-form-group horizontal label="Filter by year" class="mb-0">
            <b-input-group>
              <b-form-select v-model="filterBy" slot="append">
                <option value="2016">2016</option>
                <option value="2017">2017</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col md="6" class="my-1">
          <h4>Profit: £{{totalBill - totalCost | round}}</h4>
        </b-col>
      </b-row>
      <b-row>
        <highcharts :options="chartOptions"></highcharts>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import {
    Chart
  } from 'highcharts-vue'

  export default {
    name: 'consumer',
    components: {
      PulseLoader,
      highcharts: Chart
    },
    data() {
      return {
        consumer_data: [],
        loading: true,
        filterBy: 2016,
        filtered: [],
        lastFilter: null,
        totalCost: null,
        totalBill: null,
        chartOptions: {
          chart: {
            type: 'bar',
            type: 'column'
          },
          title: {
            text: 'Monthly Consumer Consumption',
            x: -20 //center
          },
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
          },
          yAxis: {
            title: {
              text: 'Consumption'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{
            data: []
          }]
        }
      }
    },
    mounted() {
      axios
        .get(`http://localhost:8000/api/monthly_statistics/${this.$route.params.id}`)
        .then(response => {
          this.loading = false
          this.consumer_data = response.data
          this.filtered = this.consumer_data.filter(item => item.year === this.filterBy)
          for (var i = 0; i < this.filtered.length; i++) {
            this.chartOptions.series[0].data.push(this.filtered[i].consumption)
            this.totalBill += this.filtered.length * this.filtered[i].total_bill
            this.totalCost += this.filtered.length * this.filtered[i].total_cost
          }
        })
    },
    watch: {
      filterBy() {
        this.redraw()
      }
    },
    methods: {
      redraw: function () {
        this.filtered = []
        this.totalBill = 0
        this.totalCost = 0
        this.filtered = this.consumer_data.filter(item => item.year === this.filterBy)
        console.log(this.filtered)
        for (var i = 0; i < this.filtered.length; i++) {
          this.chartOptions.series[0].data.push(this.filtered[i].consumption)
          this.totalBill += this.filtered.length * this.filtered[i].total_bill
          this.totalCost += this.filtered.length * this.filtered[i].total_cost
        }
      }
    },
    filters: {
      round: function (value, decimals) {
        if (!value) {
          value = 0;
        }

        if (!decimals) {
          decimals = 2;
        }

        value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
        return value;
      }
    }
  }

</script>

<style>
  .loader {
    margin-top: 20%;
  }

  .input-group {
    display: block;
    flex-wrap: wrap;
  }

  .options-row {
    padding: 1%;
    background-color: lightgray;
  }

</style>
