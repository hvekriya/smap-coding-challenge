<template>
  <div>
    <h1>{{consumer_data}}</h1>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'consumer',
    data() {
      return {
        consumer_data: []
      }
    },
    mounted() {
      axios
        .get(`http://localhost:8000/api/monthly_statistics/${this.$route.params.id}`)
        .then(response => {
          this.consumer_data = response.data
        })
    },
  }

</script>
