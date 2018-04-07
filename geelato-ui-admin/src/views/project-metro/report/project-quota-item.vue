<template>
  <td>
    <sui type="progress" selector=".ui.progress" :opts="{percent: percent}">
      <div class="ui tiny progress" :class="color">
        <div class="bar"></div>
        <div class="label">20/20/300</div>
      </div>
    </sui>
  </td>
</template>
<script>
  import Sui from '../../../components/sui/index.vue'

  export default {
    props: {
      percent: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: false
      }
    },
    data () {
      return {}
    },
    mounted () {
    },
    methods: {},
    components: {Sui}
  }
</script>
<style scoped>
  td:not(:first-of-type) {
    text-align: center !important;
    padding: 0 0 .5em .0em !important;
  }
</style>
