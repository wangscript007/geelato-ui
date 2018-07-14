<template>
  <div class="gl-page-content-wrapper">
    <div class="ui grid">
      <div class="sixteen wide column">
        <table class="ui basic compact table">
          <tr>
            <td class="two wide">项目合同总额</td>
            <td class="two wide">2180万</td>
            <td class="twelve wide">
              <sui type="progress" selector=".ui.progress" :opts="{text:''}">
                <div class="ui small red  progress" data-value="2180" data-total="2180">
                  <div class="bar">
                    <div class="progress"></div>
                  </div>
                </div>
              </sui>
            </td>
          </tr>
          <tr>
            <td>合同支付申请</td>
            <td>1209万</td>
            <td>
              <sui type="progress" selector=".ui.progress">
                <div class="ui small blue progress" data-value="1209" data-total="2180">
                  <div class="bar">
                    <div class="progress"></div>
                  </div>
                </div>
              </sui>
            </td>
          </tr>
          <tr>
            <td>财务实际支付</td>
            <td>820万</td>
            <td>
              <sui type="progress" selector=".ui.progress">
                <div class="ui small teal progress" data-value="820" data-total="2180">
                  <div class="bar">
                    <div class="progress"></div>
                  </div>
                </div>
              </sui>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <layout-lr title="支付批次" rightTitle="支付详情">
      <div slot="left">
        <gl-group item=".list>.item">
          <div class="ui middle aligned divided  selection list">
            <div class="item" v-for="item in ['第一笔-预付款','第二笔-进度款','第三笔-进度款','第四笔-质保款']">
              <div class="description" @click="currentPlan=item">{{item}}</div>
            </div>
          </div>
        </gl-group>
      </div>
      <div slot="right">
        <!--<div class="ui mini center aligned segment">-->
        <!--<div class="ui mini button" :class="$gl.ui.color.primary">编制计划任务</div>-->
        <!--</div>-->
        <sui type="accordion" selector=".ui.accordion" :opts="{exclusive: false}">
          <div class="ui accordion">
            <div class="title active">
              <i class="dropdown icon"></i>
              合同支付条款
            </div>
            <div class="content active">
              完成需求调研工作，需求调研成果通过甲方评审。
            </div>
            <div class="title active">
              <i class="dropdown icon"></i>
              计划支付时间
            </div>
            <div class="content active">
              2018-1-2
            </div>
            <div class="title active">
              <i class="dropdown icon"></i>
              支付情况
            </div>
            <div class="content active">
              未支付
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
  import Sui from '../../../components/sui'
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

//      console.log('this.opts', this.opts)
//      $(this.$el).find('.ui.cards')()
//      $(this.$el).find('.ui.checkbox').checkbox()
    },
    updated () {
      $(this.$el).find('.ui.accordion').accordion({exclusive: false})
      $(this.$el).find('.ui.dropdown').dropdown()
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
                  {text: '调研场次'},
                  {text: '业务流程数'},
                  {text: '系统功能点数'},
                  {text: '汇报场次'},
                  {text: '培训场次'},
                  {text: '优化需求数'},
                  {text: '系统缺陷数'},
                  {text: '数据变更数'}]
              }
            ]
          },
          plugins: ['contextmenu', 'dnd', 'state', 'types']
        }
      }
    },
    components: {LayoutLr, Jstree, Sui}
  }
</script>
<style scoped>
  .ui.progress:last-child {
    margin: 0 0 0em !important;
  }
</style>
