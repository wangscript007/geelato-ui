<template>
  <div style="padding:0.5em 1em">
    <div v-if="pageStage==='querying'" class="ui padded grid task-list">
      <div class="sixteen wide column task-topbar">
        <div class="ui mini borderless secondary menu task-list-toolbar gl-header">
          <!--<a class="item gl-page-sidebar-toggle" @click="$_toggleSidebar">-->
          <!--<i class="sidebar icon"></i>-->
          <!--</a>-->
          <!--<div class="item">-->
          <!--<div class="ui teal icon button"><i class="plus icon"></i>创建</div>-->
          <!--</div>-->
          <div class="right menu">
            <div class="ui dropdown item">
              导入 <i class="dropdown icon"></i>
              <div class="menu">
                <a class="item">Excel文件</a>
                <a class="item">Project文件</a>
                <a class="item">在线模板库</a>
              </div>
            </div>
            <div class="item">
              <div class="ui button" :class="$gl.ui.color.primary">新增</div>
              &nbsp;
              <div class="ui button" :class="$gl.ui.color.primary">保存</div>
            </div>
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="ui segment" style="text-align: center">
          <h2 class="ui header"><select>
            <option selected>2018</option>
            <option>2017</option>
          </select>年年度任务
          </h2>
        </div>
      </div>
      <div class="ten wide column task-list-result">
        <gl-table :columns="taskData.columns" :data-source="taskData.dataSource"></gl-table>
      </div>
      <div v-if="!isMax" class="six wide column task-list-query">
        <div class="ui ui pointing secondary menu">
          <div class="item" data-tab="tab-name">基础信息</div>
          <div class="item" data-tab="tab-name2">属性信息</div>
        </div>
        <div class="ui tab" data-tab="tab-name">
          <div class="ui mini form">
            <div class="two fields">
              <div class="field">
                <label>标题</label>
                <input type="text" name="title" placeholder="标题">
              </div>
            </div>
            <div class="field">
              <label>描述</label>
              <textarea rows="5"></textarea>
            </div>
          </div>
        </div>
        <div class="ui tab" data-tab="tab-name2">
          <table class="ui table" style="width: 100%">
            <tbody>
            <tr>
              <td>类型</td>
              <td>BUG</td>
            </tr>
            <tr>
              <td>优先级</td>
              <td>高</td>
            </tr>
            <tr>
              <td>状态</td>
              <td>高</td>
            </tr>
            <tr>
              <td>状态</td>
              <td>解决中</td>
            </tr>
            <tr>
              <td>指派给</td>
              <td>张三</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //  import taskForm from './form'
  import GlTable from '../../../components/collections/table/index'

  export default {
    data () {
      return {
        // 最大时，不展示查询区
        isMax: false,
        // 页面状态
        pageStage: 'querying',
        // 任务列表
        taskData: {
          columns: [
            {field: 'id', title: 'ID', type: 'string'},
            {field: 'pid', title: '父ID', type: 'string'},
            {field: 'level', title: '层级', type: 'string'},
            {field: 'name', title: '任务名称', type: 'string', format: '', editable: true},
            {field: 'res', title: '资源', type: 'string', format: '', editable: true},
            {field: 'planFinishDate', title: '计划完成时间', type: 'string', format: ''}
          ],
          dataSource: [
            {id: '100000000', pid: '', level: 1, name: '计量支付信息打印格式有误，字体存在问题。', res: '张三', planFinishDate: '2018-3-26'},
            {
              id: '100000001',
              pid: '100000000',
              level: 2,
              name: '计量支付信息打印格式有误，字体存在问题。',
              res: '李四',
              planFinishDate: '2018-3-26'
            },
            {
              id: '100000002',
              pid: '100000000',
              level: 2,
              name: '计量支付信息打印格式有误，字体存在问题。',
              res: '李四',
              planFinishDate: '2018-3-26'
            },
            {
              id: '100000003',
              pid: '100000002',
              level: 3,
              name: '计量支付信息打印格式有误，字体存在问题。',
              res: '王五',
              planFinishDate: '2018-3-26'
            }
          ]
        }
      }
    },
    mounted: function () {
      this.$_initUi()
    },
    methods: {
      $_initUi: function () {
        $(this.$el).find('.ui.accordion').accordion()
        $(this.$el).find('.ui.dropdown').dropdown()
        $(this.$el).find('.ui.menu .item').tab()
//        $(this.$el).find('.ui.menu>.item[data-tab]').tab()
//        $(this.$el).find('.ui.menu>.item[data-tab*="designer-sub-tab"]').tab()
        this.$_initProjects()
      },
      $_toggleSidebar () {
        this.isMax = !this.isMax
      },
      $_initProjects () {
        this.$gl.data.queryByGql()
        let types = {
          default: {
            icon: 'fa fa-folder icon-state-warning icon-lg'
          },
          root: {
            icon: 'fa fa-folder icon-state-default icon-lg'
          }
        }
        let $projectTree = $(this.$el).find('.task-projects')
        let projectTreeData = [{
          id: 0,
          text: '项目',
          type: 'root'
        }]
        $projectTree.jstree({
          core: {
            themes: {
              responsive: false
            },
            data: projectTreeData
          },
          types: types,
          plugins: ['types']
        })
      },
      $_save () {
        this.$_query()
      },
      $_edit (id, type, to) {
        this.pageStage = 'editing'
      },
      $_query () {
        this.pageStage = 'querying'
      }
    },
    components: {GlTable}
  }
</script>
<style>

  .items > .item .image > img {
    /*width: 50% !important;*/
    /*height: 80%;*/
  }

  .task-topbar.sixteen.wide.column {
    padding-bottom: 0 !important;
  }

  .items > .item > .content > .task-action {
    margin-top: 0.5em;
  }

  .items > .item .task-datetime {
    font-size: 0.8em;
    font-weight: bold;
    float: right;
    margin-right: 1em;
    display: inline-block;
  }

  .items > .item > .content > .task-action .mini.button {
    padding: 0.35em 0.6em 0.35em;
  }

  .items > .item > .content > .description {
    font-size: 0.9em !important;
  }

  .menu.task-list-toolbar {
    border: 0;
  }

  /*.task-list-area > .ui.divider {*/
  /*padding: 0;*/
  /*margin: 0;*/
  /*}*/
</style>
