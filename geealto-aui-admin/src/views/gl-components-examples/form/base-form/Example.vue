<template>
  <gl-form :opts="config" :loader="apiHelper.query"></gl-form>
</template>

<script>
  import data from './data.js'
  import axios from 'axios'
  import ApiHelper from 'geelato-ui-api'

  const apiHelper = new ApiHelper(axios, {})

  export default {
    name: 'gl-base-from-example',
    data () {
      return {
        config: data,
        apiHelper: apiHelper
      }
    }
  }
</script>

<style scoped>

</style>
