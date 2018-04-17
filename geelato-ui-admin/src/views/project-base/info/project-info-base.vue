<template>
  <table class="ui small form gl-form">
    <caption>&nbsp;</caption>
    <tbody>
    <tr>
      <td>项目名称</td>
      <td><input type="text"></td>
      <td>所属{{projectConfig.dict['组']}}</td>
      <td>
        <sui type="dropdown" selector=".ui.dropdown">
          <div class="ui selection dropdown">
            <input type="hidden" name="gender">
            <i class="dropdown icon"></i>
            <div class="default text">{{projectGroups&&projectGroups.length>0?projectGroups[0].name:''}}</div>
            <div class="menu">
              <div class="item" v-for="project in projectGroups" :data-value="project.code">{{project.name}}</div>
            </div>
          </div>
        </sui>
      </td>
    </tr>
    <tr>
      <td>合同编号</td>
      <td><input type="text"></td>
      <td></td>
      <td>
      </td>
    </tr>
    <tr>
      <td>概述</td>
      <td colspan="3"><textarea rows="4"></textarea></td>
    </tr>
    </tbody>
    <tfoot></tfoot>
  </table>
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
