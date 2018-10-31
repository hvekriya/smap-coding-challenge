<template>
  <b-container>
    <div>
      <h1>Add a new consumer</h1>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <b-form-group id="exampleInputGroup2" label="Your Name:" label-for="exampleInput2">
          <b-form-input id="exampleInput2" type="text" v-model="form.name" required placeholder="Enter name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup3" label="Voltage:" label-for="exampleInput3">
          <b-form-select id="exampleInput3" :options="voltage" required v-model="form.consumer_type">
          </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </b-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'addConsumer',
    data() {
      return {
        form: {
          name: '',
          consumer_type: null
        },
        voltage: [{
            text: 'Select One',
            value: null
          },
          'low', 'high', 'extra_high'
        ],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault();
        console.log(this.form)
        axios
          .post(
            'http://localhost:8000/api/consumer', {
              name: this.form.name,
              consumer_type: this.form.consumer_type
            }
          )
          .then(response => {
            alert('Form Submitted Successfully')
          })
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.name = '';
        this.form.consumer_type = null;
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      }
    }
  }

</script>
