<template>
  <b-container>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Voltage" class="mb-0">
          <b-input-group>
            <b-form-select v-model="filterBy" slot="append" v-on:change="filterData">
              <option value="low">low</option>
              <option value="high">high</option>
              <option value="extra_high">extra high</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table striped hover :items="filtered" :fields="fields"></b-table>
  </b-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Consumers',
    data() {
      return {
        consumers: [],
        filtered: [],
        fields: [{
          key: 'id',
          label: 'Consumer id'
        }, {
          key: 'name',
          label: 'Full name'
        }, {
          key: 'consumer_type',
          label: 'Voltage',
        }],
        filterBy: 'low',
        lastFilter: null
      }
    },
    mounted() {
      axios
        .get(`http://localhost:8000/api/consumers/`)
        .then(response => {
          this.consumers = response.data
          this.filtered = this.consumers
        })
    },
    beforeUpdate() {
      if (this.filterBy !== this.lastFilter) {
        this.lastFilter = this.filterBy
        this.filtered = this.consumers.filter(item => item.consumer_type === this.filterBy)
      }
    },
    methods: {
      filterData: function () {
        this.lastFilter = this.filterBy
      }
    }
  }

</script>
