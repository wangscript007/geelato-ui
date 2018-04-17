<template>
  <div>
    <div class="ui mini borderless menu" v-if="$store.state.currentProject.name">
      <div class="right float item">
        <div class="ui mini button" :class="$GL.ui.color.primary">导出</div>
      </div>
    </div>
    <div class="gl-page-content-wrapper" style="padding-top:0px">
      <div class="ui padded grid">
        <div class="sixteen wide column" v-if="$store.state.currentProject.name">
          <h2 class="ui center aligned header">{{$store.state.currentProject.name}}</h2>
          <div style="text-align: right;padding-right: 4em">2018-02-20</div>
          <div class="ui divider"></div>
          <h4 class="ui header">项目概况</h4>
          <div class="ui segement">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息项目概况信息
          </div>
          <h4 class="ui header">进度信息</h4>
          <div class="ui segement">
            ......
          </div>
          <h4 class="ui header">投资情况</h4>
          <div class="ui segement">
            ......
          </div>
          <h4 class="ui header">支付情况</h4>
          <div class="ui segement">
            ......
          </div>
        </div>
        <div class="sixteen wide column" v-else>
          <h2 class="ui center aligned header">
            <div class="ui mini button" :class="$GL.ui.color.primary"
                 @click="$router.push('/m/project-metro/info/select-project')">请先选择项目
            </div>
          </h2>
          <div class="ui divider"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Message from '../../../components/message/index.vue'
  import testData from '../../../mock/project/project-metro/index'

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
        projects: []
      }
    },
    mounted: function () {
    },
    methods: {
      $_changeLine (line) {
        console.log(line)
        this.projects = line.projects
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
