<template>
  <div class="ui padded grid">
    默认以日历方式展示我的会议（包括我参加的、我创建的）
    可以发起新的会议
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
