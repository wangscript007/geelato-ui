<template>
  <sui type="menu" selector=".ui.secondary.menu" style="margin: 1em">
    <div class="ui secondary pointing menu">
      <a class="item">
        我的待办
        <div class="ui red circular label">0</div>
      </a>
      <a class="item active">
        我的已办
      </a>
      <a class="item">
        我的待阅
        <div class="ui red circular label">0</div>
      </a>
      <a class="item">
        我的已阅
      </a>
      <!--<div class="right menu">-->
      <!--<a class="ui item">-->
      <!--Logout-->
      <!--</a>-->
      <!--</div>-->
    </div>
    <div class="ui segment">
      <p></p>
    </div>
  </sui>
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
