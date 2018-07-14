<template>
  <div class="gl-page-content-wrapper">
    <layout-lr title="成果标准树" :leftActions="leftActions" :rightActions="rightActions">
      <div slot="left">
        <jstree :opts="treeConfig"></jstree>
      </div>
      <div slot="right">
        <sui type="accordion" selector=".ui.accordion" :opts="{exclusive: false}">
          <div class="ui accordion">
            <div class="title active">
              <i class="dropdown icon"></i>
              成果标准信息
            </div>
            <div class="content active">
              <form class="ui mini form">
                <div class="two fields">
                  <div class="field">
                    <label>成果名称</label>
                    <input type="text" name="name" placeholder="" value="项目工作说明书">
                  </div>
                  <div class="field">
                    <label>成果编码</label>
                    <input type="text" name="code" placeholder="">
                  </div>
                </div>
                <div class="field">
                  <label>描述</label>
                  <textarea rows="4"></textarea>
                </div>
                <div class="field">
                  <div class="ui mini basic button" :class="$gl.ui.color.primary">
                    下载成果模板
                    <i class="download icon"></i>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </sui>
      </div>
    </layout-lr>
  </div>
</template>
<script>
  import LayoutLr from '../../../components/mix/page-layout-lr'
  import Jstree from '../../../components/mix/jstree'
  import prjCfg from '../../../common/project/config'

  export default {
    props: {},
    data () {
      return {
        // 最大时，不展示查询区
        isMax: false,
        leftActions: [{
          title: '新增',
          click: 'modal',
          modal: {
            type: 'page',
            value: 'sys_role_list_detail',
            query: {}
          }
        }],
        rightActions: [{
          title: '保存',
          click: 'modal',
          modal: {
            type: 'page',
            value: 'sys_role_list_detail',
            query: {}
          }
        }],
        treeConfig: {}
      }
    },
    computed: {
      projectConfig: function () {
        return prjCfg.get(this.$route.query.module)
      }
//      projectGroups: function () {
//        return mockData.get(this.$route.query.module).projectGroups
//      }
    },
    created () {
      this.$_loadData()
    },
    mounted () {
    },
    updated () {
    },
    methods: {
      $_loadData () {
        this.treeConfig = {
          core: {
            data: [
              {
                text: '轨道交通新线建设项目',
                state: {
                  'opened': true,
                  'selected': true
                },
                children: [
                  {text: '新线规划'},
                  {text: '前期工程'},
                  {text: '设计管理'},
                  {text: '机电'},
                  {
                    text: '土建', children: [{text: '明挖'}, {text: '暗挖'}]
                  }
                ]
              },
              {
                text: '轨道交通IT项目管理',
                state: {
                  'opened': true,
                  'selected': true
                },
                children: [
                  {text: '项目工作说明书'},
                  {text: '需求分析报告'},
                  {text: '总体设计报告'},
                  {text: '详细设计报告'},
                  {text: '系统测试报告'},
                  {text: '用户测试报告'},
                  {text: '上线试运行方案'},
                  {text: '上线试运行报告'}]
              }
            ]
          },
          plugins: ['contextmenu', 'dnd', 'state', 'types']
        }
      }
    },
    components: {LayoutLr, Jstree}
  }
</script>
<style scoped>
</style>
