<template>
  <div>
    <gl-table :columns="columns" :data-source="dataSource"></gl-table>
  </div>
</template>
<script>
  import GlTable from '../../../components/collections/table/index'

  export default {
    props: {},
    data () {
      return {
        cfg: {}
      }
    },
    mounted () {
    },
    updated () {
    },
    methods: {},
    components: {GlTable}
  }
</script>
<style scoped>
</style>
