<template>
  <div class="gl-page-content-wrapper">
    <gl-form-combination :opts="config.opts" :query="opts.ui.model" ref="glFromCombination"></gl-form-combination>
    <button @click="$refs.glFromCombination.save()">保存</button>
  </div>
</template>
<script>
  import detailConfig from './detail.js'

  export default {
    props: {
      opts: {
        type: Object,
        required: true
      },
      query: {
        type: Object
      }
    },
    data() {
      return {
        config: detailConfig
      }
    },
    computed: {},
    created() {
    },
    mounted() {
      console.log('module detail query>', this.query)
      console.log('module detail opts>', this.opts)
    },
    methods: {}
  }
</script>
<style>
</style>
