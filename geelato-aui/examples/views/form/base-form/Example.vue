<template>
  <gl-form :opts="config" :loader="apiHelper.query">This is gl-form.</gl-form>
</template>

<script>
  import data from './data.js'
  import axios from 'axios'
  import ApiHelper from 'geelato-ui-api'

  let apiHelper = new ApiHelper(axios, {})

  export default {
    name: "gl-from-example",
    data() {
      return {
        config: data,
        apiHelper: apiHelper
      }
    }
  }
</script>

<style scoped>

</style>
