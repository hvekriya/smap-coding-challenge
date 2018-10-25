<template>
  <b-container>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Filter by voltage" class="mb-0">
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
    <b-table striped hover :items="filtered" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click.stop="deleteConsumer(row.item, row.index, $event.target)" class="mr-1">
          Delete
        </b-button>
      </template>
    </b-table>
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
        }, {
          key: 'actions',
          label: 'Actions'
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
      },
      deleteConsumer(item, index, button) {
        axios
          .delete(`http://localhost:8000/api/consumer/${item.id}`)
          .then(response => {
            if (response.data.success) {
              this.filtered.splice(index, 1)
            } else {
              console.log('There was error with delete the item')
            }
          })
      }
    }
  }

</script>
