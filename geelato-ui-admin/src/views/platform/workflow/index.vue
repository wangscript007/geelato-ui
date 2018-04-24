<template>
  <div>
    工作流待办
  </div>
</template>
<script>
  import entityNames from '../../../pages/entities'
  import mockData from '../../../mock/data'
  import prjCfg from '../../../common/project/config'

  export default {
    props: {},
    data () {
      return {
        entityName: entityNames.project.projectInfo,
        model: {}
      }
    },
    computed: {
      projectConfig: function () {
        return prjCfg.get(this.$route.query.module)
      },
      projectGroups: function () {
        return mockData.get(this.$route.query.module).projectGroups
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {}
  }
</script>
<style>
</style>
