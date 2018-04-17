<template>
  <div class="ui padded grid">
    <div class="sixteen wide column">
      <message :header="'说明'">
        选择线路>标段，进行该标段项目管理视图。
      </message>
      <h5 class="ui header" style="padding-left: 1em">最近浏览的项目</h5>
      <div class="ui mini segment">
        <div class="ui mini button" :class="$GL.ui.color.primary" v-for="project in $store.state.lastProjects"
             @click="$_changeProject(project)" :title="project.metroLine">
          {{project.name}}
        </div>
      </div>
    </div>
    <div class="six wide column">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="font-weight: bold">选择线路
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui middle aligned divided  selection list">
        <div class="item" v-for="line in lines" @click="$_changeLine(line)">
          <div class="content">
            <div class="description">{{line.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ten wide column">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="font-weight: bold">选择标段
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui segment">
        <div class="ui mini button" :class="$GL.ui.color.primary" v-for="project in projects" @click="$_changeProject(segment)">
          {{segment.name}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Message from '../../../components/message/index.vue'
  import testData from '../../../mock/project/project-metro/index'
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
    data () {
      return {
        lines: testData.projectGroups,
        projects: [],
        currentLine: {}
      }
    },
    mounted: function () {
    },
    methods: {
      $_changeLine (line) {
        this.currentLine = line
        this.projects = line.projects
      },
      $_changeProject (segment) {
        this.$store.commit(types.CHANGE_PROJECT, segment)
        this.$store.commit(types.CHANGE_HEADER_TITLE, '<div style="font-weight: bold">当前项目：' + this.currentLine.shortName + '>' +
          segment.name + '</div>'
        )
        if (segment.inited === false) {
          // 若未初始化，进入引导页面
          this.$router.push('/m/project-metro/info/guide')
        } else {
          // 若已初始化，默认进入项目信息视图页面
          this.$router.push('/m/project-metro/report/project-index')
        }
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
