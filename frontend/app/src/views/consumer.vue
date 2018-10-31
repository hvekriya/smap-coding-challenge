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
          <p>(Combined two years)</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" class="my-1">
          <GChart type="ColumnChart" :data="filteredConsumptionData" :options="consumptionChartOptions" />
        </b-col>
        <b-col md="6" class="my-1">
          <GChart type="ColumnChart" :data="filteredTotalBill" :options="totalBillChartOptions" />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" class="my-1">
          <GChart type="ColumnChart" :data="filteredTotalCost" :options="totalCostChartOptions" />
        </b-col>
        <b-col md="6" class="my-1">
          <GChart type="ColumnChart" :data="filteredTotalProfit" :options="totalProfitChartOptions" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import axios from 'axios'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
  import {
    GChart
  } from 'vue-google-charts'

  export default {
    name: 'consumer',
    components: {
      PulseLoader,
      GChart
    },
    data() {
      return {
        consumer_data: [],
        loading: true,
        filterBy: 2016,
        consumptionData: [],
        filteredConsumptionData: [],
        filteredTotalBill: [],
        filteredTotalCost: [],
        filteredTotalProfit: [],
        lastFilter: null,
        totalCost: null,
        totalBill: null,
        consumptionChartOptions: {
          chart: {
            title: 'Monthly Consumption'
          },
          legend: {
            position: 'none'
          },
          width: 600,
          height: 300,
          vAxis: {
            title: 'Consumption'
          },
          hAxis: {
            title: 'Month'
          }
        },
        totalBillChartOptions: {
          chart: {
            title: 'Monthly Bill'
          },
          legend: {
            position: 'none'
          },
          width: 600,
          height: 300,
          vAxis: {
            title: 'Bill'
          },
          hAxis: {
            title: 'Month'
          }
        },
        totalCostChartOptions: {
          chart: {
            title: 'Monthly Cost'
          },
          legend: {
            position: 'none'
          },
          width: 600,
          height: 300,
          vAxis: {
            title: 'Cost'
          },
          hAxis: {
            title: 'Month'
          }
        },
        totalProfitChartOptions: {
          chart: {
            title: 'Monthly Profit'
          },
          legend: {
            position: 'none'
          },
          width: 600,
          height: 300,
          vAxis: {
            title: 'Profit'
          },
          hAxis: {
            title: 'Month'
          }
        }
      }
    },
    mounted() {
      axios
        .get(`http://localhost:8000/api/monthly_statistics/${this.$route.params.id}`)
        .then(response => {
          this.loading = false
          this.consumer_data = response.data
          this.consumptionChart()
          this.totalBillChart()
          this.totalCostChart()
          this.totalProfitChart()
        })
    },
    watch: {
      filterBy() {
        this.consumptionChart()
        this.totalBillChart()
        this.totalCostChart()
        this.totalProfitChart()
      }
    },
    methods: {
      consumptionChart() {
        this.filteredConsumptionData = []
        this.totalBill = 0
        this.totalCost = 0

        this.filteredConsumptionData.push(
          ['Month', 'Consumption']
        )
        this.consumptionData = this.consumer_data.filter(item => item.year == this.filterBy)
        for (var i = 0; i < this.consumptionData.length; i++) {
          this.filteredConsumptionData.push([this.consumptionData[i].month, this.consumptionData[i].consumption])
          this.totalBill += this.consumptionData.length * this.consumptionData[i].total_bill
          this.totalCost += this.consumptionData.length * this.consumptionData[i].total_cost
        }
      },
      totalBillChart() {
        this.filteredTotalBill = []
        this.filteredTotalBill.push(
          ['Month', 'Bill']
        )
        this.consumptionData = this.consumer_data.filter(item => item.year == this.filterBy)
        for (var i = 0; i < this.consumptionData.length; i++) {
          this.filteredTotalBill.push([this.consumptionData[i].month, this.consumptionData[i].total_bill])
        }
      },
      totalCostChart() {
        this.filteredTotalCost = []
        this.filteredTotalCost.push(
          ['Month', 'Cost']
        )
        this.consumptionData = this.consumer_data.filter(item => item.year == this.filterBy)
        for (var i = 0; i < this.consumptionData.length; i++) {
          this.filteredTotalCost.push([this.consumptionData[i].month, this.consumptionData[i].total_cost])
        }
      },
      totalProfitChart() {
        this.filteredTotalProfit = []
        this.filteredTotalProfit.push(
          ['Month', 'Profit']
        )
        this.consumptionData = this.consumer_data.filter(item => item.year == this.filterBy)
        for (var i = 0; i < this.consumptionData.length; i++) {
          this.filteredTotalProfit.push([this.consumptionData[i].month,
            this.consumptionData[i].total_bill - this.consumptionData[i].total_cost
          ])
        }
      },
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
