<template>
  <div class="ui padded grid">
    <div class="row">
      <div class="sixteen wide column">
        <h4 class="ui dividing header">xx业务流程</h4>
      </div>
    </div>
    <div class="row">
      <div class="two wide column">
        <div class="ui segment">
          xx申请
        </div>
      </div>
      <div class="two wide column">
        <div class="ui segment">
          xx申请
        </div>
      </div>
      <div class="two wide column">
        <div class="ui segment">
          xx申请
        </div>
      </div>
      <div class="two wide column">
        <div class="ui segment">
          xx申请
        </div>
      </div>
    </div>
    <div class="row">
      <div class="sixteen wide column">
        <h4 class="ui dividing header">xx业务流程</h4>
      </div>
    </div>
    <div class="row">
      <div class="two wide column">
        <div class="ui segment">
          xx申请
        </div>
      </div>
      <div class="two wide column">
        <div class="ui segment">
          xx申请
        </div>
      </div>
      <div class="two wide column">
        <div class="ui segment">
          xx申请
        </div>
      </div>
      <div class="two wide column">
        <div class="ui segment">
          xx申请
        </div>
      </div>
    </div>
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
