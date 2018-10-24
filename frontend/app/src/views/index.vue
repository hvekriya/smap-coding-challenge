<template>
  <div>
    <h1>SMAP ENERGY</h1>
    <Consumers></Consumers>
  </div>
</template>

<script>
  import Consumers from '@/components/Consumers'
  export default {
    name: 'Home',
    components: {
      Consumers: Consumers
    }
  }

</script>
