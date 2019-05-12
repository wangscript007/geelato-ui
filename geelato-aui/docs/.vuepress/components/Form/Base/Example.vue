<template>
  <gl-form :opts="config">This is gl-form.</gl-form>
</template>

<script>
  import data from './data.js'

  export default {
    data() {
      return {
        config: data
      }
    },
    mounted() {
      console.log(' this.$route>', this.$options)
    },
    methods: {}
  }
</script>

<style scoped>

</style>
