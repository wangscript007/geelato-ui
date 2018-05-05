<template>
  <div class="ui grid">
    <!--<div class="sixteen wide column">-->
    <!--<message :header="'说明'">-->
    <!--选择{{projectConfig.dict['组']}} > 选择{{projectConfig.dict['项目']}}，进入该项目管理视图。-->
    <!--</message>-->
    <!--<h5 class="ui header" style="padding-left: 1em">最近浏览的项目</h5>-->
    <!--<div class="ui mini segment">-->
    <!--<div class="ui mini button" :class="$GL.ui.color.primary" v-for="project in $store.state.lastProjects"-->
    <!--@click="$_changeProject(project)" :title="project.projectGroup">-->
    <!--{{project.name}}-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <div class="sixteen wide column">
      <h4 class="ui dividing header">绑定{{projectConfig.dict['项目']}}</h4>
    </div>
    <div class="six wide column">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="font-weight: bold">选择{{projectConfig.dict['组']}}
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui middle aligned divided  selection list">
        <div class="item" v-for="projectGroup in projectGroups" @click="$_changeProjectGroup(projectGroup)">
          <div class="content">
            <div class="description">{{projectGroup.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ten wide column">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="font-weight: bold">选择{{projectConfig.dict['项目']}}
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui segment">
        <div class="ui mini button" :class="$GL.ui.color.primary" v-for="project in projects"
             @click="$_changeProject(project)">
          {{project.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Message from '../../../components/message/index.vue'
  import mockData from '../../../mock/data'
  import prjCfg from '../../../common/project/config'
  import * as types from '../../../store/types'

  export default {
    props: {
      module: {
        type: String,
        required: true
      }
    },
    computed: {
      projectConfig: function () {
        return prjCfg.get(this.module)
      },
      projectGroups: function () {
        return mockData.get(this.module).projectGroups
      }
    },
    data () {
      return {
        projects: [],
        currentLine: {}
      }
    },
    mounted: function () {
    },
    methods: {
      $_changeProjectGroup (projectGroup) {
        this.projectGroup = projectGroup
        this.projects = projectGroup.projects
      },
      $_changeProject (project) {
        this.$store.commit(types.CHANGE_PROJECT, project)
        this.$store.commit(types.CHANGE_HEADER_TITLE, '<div style="font-weight: bold">当前项目：' + this.projectGroup.shortName + '>' +
          project.name + '</div>'
        )
        // 通知更改模块，以便更改菜单
        this.$store.commit(types.CHANGE_MODULE, this.$CFG.getModule('tjgc'))
        this.$router.push('/m/project-metro/info/project-info')
        this.$parent.$parent.sui.modal('hide')
      }
    },
    components: {Message}
  }
</script>
<style scoped>
  .ui.mini.button {
    margin: 0.5em;
  }
</style>
