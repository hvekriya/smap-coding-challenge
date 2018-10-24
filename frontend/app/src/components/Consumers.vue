<template>
  <b-container>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group horizontal label="Consumer type" class="mb-0">
          <b-input-group>
            <b-form-select v-model="filterBy" slot="append" v-on="">
              <option value="low">low</option>
              <option value="high">high</option>
              <option value="extra_high">extra high</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <!-- <ul class="people-list">
      <li v-for="person in filteredConsumers">{{ person.name }}</li>
    </ul> -->
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
        fields: ['id', 'name', 'consumer_type'],
        filterBy: 'low'
      }
    },
    mounted() {
      axios
        .get(`http://localhost:8000/api/consumers/`)
        .then(response => {
          this.consumers = response.data
        })
    },
    beforeUpdate() {
      this.filtered = [{
        "id": 1,
        "name": "Jim Bond",
        "consumer_type": "extra_high"
      }]
      // this.filtered = this.consumers.filter(item =>
      //   item.consumer_type === this.filterBy
      // )
    }
  }

</script>
