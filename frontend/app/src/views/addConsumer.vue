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
          <b-form-select id="exampleInput3" :options="voltage" required v-model="form.food">
          </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </b-container>
</template>

<script>
  export default {
    name: 'addConsumer',
    data() {
      return {
        form: {
          name: '',
          food: null,
          checked: []
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
        alert(JSON.stringify(this.form));
      },
      onReset(evt) {
        evt.preventDefault();
        /* Reset our form values */
        this.form.name = '';
        this.form.food = null;
        /* Trick to reset/clear native browser form validation state */
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        });
      }
    }
  }

</script>
