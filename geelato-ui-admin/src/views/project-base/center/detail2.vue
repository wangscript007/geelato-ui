<template>
  <div class="ui padded grid">
    <div class="sixteen wide column">
      <div class="ui cell divided  list">
        <div class="item" v-for="projectGroup in projectGroups" @click="$_changeProjectGroup(projectGroup)">
          <div class="right floated content">
            <div class="ui mini button" :class="$GL.ui.color.primary">查看</div>
          </div>
          <i class="large github middle aligned icon"></i>
          <div class="content">
            <a class="header">{{projectGroup.name}}</a>
            <div class="description">总项目数12个</div>
          </div>
        </div>
      </div>

      <message header="说明">
        选择{{projectConfig.dict['组']}} > 选择{{projectConfig.dict['项目']}}，进入该项目管理视图。
      </message>
      <h5 class="ui header" style="padding-left: 1em">最近浏览的项目</h5>
      <div class="ui mini segment">
        <div class="ui mini button" :class="$GL.ui.color.primary" v-for="project in $store.state.lastProjects"
             @click="$_changeProject(project)" :title="project.projectGroup">
          {{project.name}}
        </div>
      </div>
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
  import mockData from '../../../mock/data'
  import prjCfg from '../../../common/project/config'
  import * as types from '../../../store/types'

  export default {
    props: {
      opts: {
        type: Object,
        default: function () {
          return {data: {}}
        }
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
        if (project.inited === false) {
          // 若未初始化，进入引导页面
          this.$router.push('/m/project-metro/info/guide')
        } else {
          // 若已初始化，默认进入项目信息视图页面
          this.$router.push('/m/project-metro/report/project-index')
        }
      }
    },
    components: {}
  }
</script>
<style scoped>
  .ui.mini.button {
    margin: 0.5em;
  }
</style>
