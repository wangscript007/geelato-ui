<template>
  <div class="gl-page-content-wrapper">
    <layout-lr :title="'土建标准库'" :leftActions="leftActions" :rightActions="rightActions">
      <div slot="left">
        <div class="ui middle aligned divided  selection list">
          <div class="item">
            <div class="content">
              <div class="description">明挖v1.0.20180328</div>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <div class="description">暗挖v1.0.20180328</div>
            </div>
          </div>
          <div class="item">
            <div class="description">高架v1.0.20180328</div>
          </div>
          <div class="item">
            <div class="content">
              <div class="description">盾构v1.0.20180328</div>
            </div>
          </div>
        </div>
      </div>
      <div slot="right">
        <div class="ui accordion">
          <div class="title active">
            <i class="dropdown icon"></i>
            基本信息
          </div>
          <div class="content active">
            <form class="ui mini form">
              <div class="field">
                <label>名称</label>
                <input type="text" name="name" placeholder="">
              </div>
              <div class="field">
                <label>编码</label>
                <input type="text" name="code" placeholder="">
              </div>
              <div class="field">
                <label>描述</label>
                <textarea rows="4"></textarea>
              </div>
            </form>
          </div>
          <div class="title">
            <i class="dropdown icon"></i>
            标准任务列表
          </div>
          <div class="content">

            <div class="ui top attached segment" style="padding: 5px">
              <div class="ui mini button" :class="$GL.ui.color.primary">导入</div>
            </div>
            <div class="ui attached segment" style="padding: 1px">
              <gl-table :columns="taskData.columns" :data-source="taskData.dataSource"></gl-table>
            </div>
          </div>
        </div>
      </div>
    </layout-lr>
    <message :header="'需求'">
      标准库默认按任务类型进行过滤，支持通过菜单配置，来过滤，为新线规划、前期工程等分配不同的任务标准库。
    </message>
  </div>
</template>
<script>
  import LayoutLr from '../../../components/mix/page-layout-lr'
  import Jstree from '../../../components/mix/jstree'
  import Message from '../../../components/message/index'
  import GlTable from '../../../components/collections/table/index'

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
        treeConfig: {},
        // 任务列表
        taskData: {
          columns: [
//            {field: 'id', title: 'ID', type: 'string'},
//            {field: 'pid', title: '父ID', type: 'string'},
            {field: 'level', title: '层级', type: 'string'},
            {field: 'name', title: '任务名称', type: 'string', format: '', editable: true},
            {field: 'type', title: '类型', type: 'string'}
//            {field: 'res', title: '资源', type: 'string', format: '', editable: true},
//            {field: 'planFinishDate', title: '计划完成时间', type: 'string', format: ''}
          ],
          dataSource: [
            {id: '100000000', pid: '', level: 1, name: '计量支付信息打印格式有误，字体存在问题。', res: '张三', planFinishDate: '2018-3-26'},
            {
              id: '100000001',
              pid: '100000000',
              level: 2,
              name: '计量支付信息打印格式有误，字体存在问题。',
              type: '分部',
              res: '李四',
              planFinishDate: '2018-3-26'
            },
            {
              id: '100000002',
              pid: '100000000',
              level: 2,
              name: '计量支付信息打印格式有误，字体存在问题。',
              type: '分部',
              res: '李四',
              planFinishDate: '2018-3-26'
            },
            {
              id: '100000003',
              pid: '100000002',
              level: 3,
              name: '计量支付信息打印格式有误，字体存在问题。',
              type: '分项',
              res: '王五',
              planFinishDate: '2018-3-26'
            }
          ]
        }
      }
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
                text: '轨道交通',
                state: {
                  'opened': true,
                  'selected': true
                },
                children: [
                  {text: '明挖'},
                  {text: '暗挖'},
                  {text: '高架'},
                  {text: '机电'},
                  {
                    text: '土建', children: [{text: '明挖'}, {text: '暗挖'}]
                  }
                ]
              }
            ]
          },
          plugins: ['contextmenu', 'dnd', 'state', 'types']
        }
      }
    },
    components: {LayoutLr, Jstree, Message, GlTable}
  }
</script>
<style scoped>
</style>
