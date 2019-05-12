<template>
  <gl-card :opts="config.opts" :id="config.id" :type="config.type"></gl-card>
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
    },
    methods: {}
  }
</script>

<style scoped>

</style>
