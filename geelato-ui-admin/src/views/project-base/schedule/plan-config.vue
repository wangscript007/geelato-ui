<template>
  <div class="gl-page-content-wrapper">
    <layout-lr title="计划列表" rightTitle="计划配置" :leftActions="leftActions">
      <div slot="left">
        <div class="ui middle aligned divided  selection list">
          <div class="item" v-for="item in plan.items">
            <div class="description" @click="currentPlan=item">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div slot="rightAction">
        <div class="item">
          <router-link
            :to="{ path: '/m/project-base/schedule/plan-task', query: { id: currentPlan.id,name: currentPlan.name }}"
            class="ui mini button" :class="$GL.ui.color.primary">编制计划
          </router-link>
        </div>
      </div>
      <div slot="right">
        <!--<div class="ui mini center aligned segment">-->
        <!--<div class="ui mini button" :class="$GL.ui.color.primary">编制计划任务</div>-->
        <!--</div>-->
        <sui type="accordion" selector=".ui.accordion" :opts="{exclusive: false}">
          <div class="ui accordion">
            <div class="title active">
              <i class="dropdown icon"></i>
              里程碑任务
            </div>
            <div class="content active">
              选择总工期策划（另一个计划文件）的部分任务，作为本计划的计划关键里程碑任务
            </div>
            <div class="title active">
              <i class="dropdown icon"></i>
              填报时间设置
            </div>
            <div class="content active">
              <form class="ui mini form">
                <div class="inline fields">
                  <div class="field">
                    <label>开始填报月份</label>
                    <input type="text" name="name" placeholder="" value="2018年1月">
                  </div>
                  <div class="field">
                    <label>截止填报月份</label>
                    <input type="text" name="code" placeholder="" value="2020年10月">
                  </div>
                </div>
                <div class="field">
                  <label>排除填报月份</label>
                  <input type="text" name="code" placeholder="" value="2019年2月">
                </div>
              </form>
            </div>
            <div class="title">
              <i class="dropdown icon"></i>
              填报提醒设置
            </div>
            <div class="content">
              <sui type="checkbox" selector=".ui.checkbox">
                <div class="ui checkbox">
                  <input id="tip-message" type="checkbox">
                  <label for="tip-message">是否提醒</label>
                </div>
              </sui>
              <form class="ui mini form">
                <div class="inline fields">
                  <div class="field">
                    <label>每月固定日期</label>
                    <input type="text" name="name" placeholder="" value="1号">
                  </div>
                  <div class="field">
                    <label>排除提醒月份</label>
                    <input type="text" name="code" placeholder="" value="2019年2月,2019年3月">
                  </div>
                </div>
                <div class="field">
                  <label>提醒内容</label>
                  <input type="text" name="code" placeholder="" value="请提交{年}年{月}月{计划名称}。">
                </div>
                <div class="field">
                  <label>提醒对像</label>
                  <input type="text" name="code" placeholder="" value="请提交{年}年{月}月{计划负责人}。">
                  <message header="提醒内容配置">
                    {}：表示变量，内置变量为{年}、{月}、{计划名称}、{计划负责人}，如"请提交{年}年{月}月{计划名称}"，最终展示为"请提交2018年1月火车站工作计划"
                  </message>
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
  import Jstree from '../../../components/mix/jstree'
  import GlTable from '../../../components/collections/table/index'
  import mockData from '../../../mock/data'
  import prjCfg from '../../../common/project/config'

  export default {
    props: {},
    data () {
      return {
        currentPlan: {},
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
        treeConfig: {},
        // 任务列表
        taskData: {
          columns: [
//            {field: 'id', title: 'ID', type: 'string'},
//            {field: 'pid', title: '父ID', type: 'string'},
            {field: 'level', title: '层级', type: 'string'},
            {field: 'name', title: '任务名称x', type: 'string', format: '', editable: true},
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
              res: '王五2',
              planFinishDate: '2018-3-26'
            }
          ]
        }
      }
    },
    computed: {
      projectConfig: function () {
        return prjCfg.get(this.$route.query.module)
      },
      projectGroups: function () {
        return mockData.get(this.$route.query.module).projectGroups
      },
      plan: function () {
        return mockData.get(this.$route.query.module).plan
      }
    },
    created () {
      this.$_loadData()
    },
    mounted () {
      this.currentPlan = this.plan.items[0]
    },
    updated () {
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
    components: {Jstree, GlTable}
  }
</script>
<style scoped>
</style>
