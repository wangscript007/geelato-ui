<template>
  <div class="ui padded grid">
    <div class="sixteen wide column">
      这是一个项目报告台账
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
