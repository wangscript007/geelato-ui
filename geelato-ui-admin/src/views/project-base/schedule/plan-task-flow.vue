<template>
  <div class="gl-page-content-wrapper">
    <!--若未选择计划时，先选择-->
    <div v-if="!currentPlan.name">
      <h4>&nbsp;&nbsp;&nbsp;&nbsp;选择计划</h4>
      <div class="ui fitted divider">
      </div>
      <div class="ui middle aligned divided selection ordered animated list">
        <div class="item" v-for="item in plan.items" @click="currentPlan=item">
          <div class="description">{{item.name}}</div>
        </div>
      </div>
    </div>
    <!--已选择计划之后，展示计划执行、配置的管理页面-->
    <layout-lr v-if="currentPlan.name" :title="title" rightTitle="任务详情" :min="{left:6,right:10}"
               :max="{left:0,right:16}" @toggle="$_mixAndMaxList">
      <div slot="left">
        TODO 这里是一个流程图，点击流程图的节点，在该节点上方弹层展示该节点下的子任务清单，及当前节点的状态信息。
        点击子任务清单下的任一项，则在右边展示任务的详情。若只有一个子任务时，不弹层直接在右方打开。
      </div>
      <div slot="rightAction">
        <div class="item" style="padding-top: 0;padding-bottom: 0">
          <sui type="dropdown" selector=".ui.dropdown">
            <div class="ui mini buttons" :class="$gl.ui.color.primary">
              <div class="ui  mini button">导入</div>
              <div class="ui floating dropdown icon mini button">
                <i class="dropdown icon"></i>
                <div class="menu">
                  <a class="item">Excel文件</a>
                  <a class="item">Project文件</a>
                  <a class="item">在线模板库</a>
                </div>
              </div>
            </div>
          </sui>
          &nbsp;
          <sui type="dropdown" selector=".ui.dropdown">
            <div class="ui mini buttons" :class="$gl.ui.color.primary">
              <div class="ui button">发布</div>
              <div class="ui floating dropdown icon button">
                <i class="dropdown icon"></i>
                <div class="menu">
                  <a class="item">保存当前版本并发布</a>
                  <a class="item">另存为新版本并发布</a>
                </div>
              </div>
            </div>
          </sui>
        </div>
      </div>
      <div slot="right">
        <sui type="tab" selector=".menu .item">
          <div class="ui top attached tabular pointing secondary fruit menu">
            <a class="active item" data-tab="first">任务信息</a>
            <a class="item" data-tab="second">任务检查项</a>
            <a class="item" data-tab="third">更多填报项</a>
            <a class="item" data-tab="fourth">任务动态</a>
          </div>
          <div class="ui bottom attached active tab segment" data-tab="first">
            <sui type="accordion" selector=".ui.accordion" :opts="{exclusive: 'false'}">
              <div class="ui fluid accordion">
                <div class="title active">
                  <i class="dropdown icon"></i>
                  任务信息
                </div>
                <div class="content active">
                  <table class="ui mini form gl-form gl-col-24">
                    <tbody>
                    <tr>
                      <td colspan="8">名称</td>
                      <td colspan="16">
                        <input type="text" value="">
                      </td>
                    </tr>
                    <tr>
                      <td colspan="8">优先级</td>
                      <td colspan="16">
                        <input type="text" value="">
                      </td>
                    </tr>
                    <tr>
                      <td colspan="8">状态</td>
                      <td colspan="16">
                        <input type="text" value="">
                      </td>
                    </tr>
                    <tr>
                      <td colspan="8">百分比</td>
                      <td colspan="16">
                        <input type="text" value="">
                      </td>
                    </tr>
                    <tr>
                      <td colspan="8">描述</td>
                      <td colspan="16">
                        <textarea rows="4"></textarea>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="title active">
                  <i class="dropdown icon"></i>
                  任务成果
                </div>
                <div class="content active">
                  <a class="ui basic mini button" :class="$gl.ui.color.primary" title="添加该任务需交付的成果">添加成果</a>
                  <div class="ui divider">
                  </div>
                  <div class="ui fluid action input">
                    <input type="text" placeholder="上传需求分析报告">
                    <button class="ui button">浏览...</button>
                  </div>
                  <!--<a class="ui label">-->
                  <!--需求分析报告-->
                  <!--<i class="delete icon"></i>-->
                  <!--</a>-->
                </div>
                <div class="title active">
                  <i class="dropdown icon"></i>
                  任务指标
                </div>
                <div class="content active">
                  <button class="ui basic mini button" :class="$gl.ui.color.primary">添加指标</button>
                  <div class="ui divider">
                  </div>
                  <table class="ui mini form gl-form gl-col-24">
                    <tbody>
                    <tr>
                      <td colspan="6">流程数</td>
                      <td colspan="9">
                        <input type="text" value="0">
                      </td>
                      <td colspan="9">
                        <input type="text" value="36">
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div class="ui message">
                    若总量未明确，建议填写一个预估总量。
                  </div>
                </div>
              </div>
            </sui>
          </div>
          <div class="ui bottom attached tab segment" data-tab="second">
            <table class="ui mini form gl-form gl-col-24">
              <tbody>
              <tr v-for="item in ['检查项1','检查项2','检查项3','检查项4','检查项5']">
                <td colspan="1">
                  <div class="ui checkbox">
                    <input type="checkbox" name="">
                  </div>
                </td>
                <td colspan="23">
                  <input type="text" :value="item">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="ui bottom attached tab segment" data-tab="third">
            <div class="ui fluid action input">
              <input type="text" placeholder="选择一个到多个专用表单">
              <button class="ui button">选择</button>
            </div>
            <br/>
            <div class="ui fluid action input">
              <input type="text" placeholder="选择表单的上报流程">
              <button class="ui button">选择</button>
            </div>
          </div>
          <div class="ui bottom attached tab segment" data-tab="fourth">
            <div class="ui toggle checkbox" @click="isCommentOnly=!isCommentOnly">
              <input type="checkbox" name="public">
              <label>只看评论动态信息</label>
            </div>
            <div class="ui feed">
              <div class="event" v-if="!isCommentOnly">
                <div class="label">
                  <i class="user circle huge icon"></i>
                </div>
                <div class="content">
                  <div class="summary">
                    <a class="user">
                      张三
                    </a> 修改进度60%为80%
                    <div class="date">
                      1 小时前
                    </div>
                  </div>
                  <!--<div class="meta">-->
                  <!--<a class="like">-->
                  <!--<i class="like icon"></i> 4 Likes-->
                  <!--</a>-->
                  <!--</div>-->
                </div>
              </div>
              <div class="event" v-if="!isCommentOnly">
                <div class="label">
                  <i class="user circle huge icon"></i>
                </div>
                <div class="content">
                  <div class="summary">
                    <a class="user">
                      张三
                    </a> 修改进度30%为60%
                    <div class="date">
                      2018-03-05 15:15
                    </div>
                  </div>
                </div>
              </div>
              <div class="event">
                <div class="label">
                  <i class="user circle huge icon"></i>
                </div>
                <div class="content">
                  <div class="summary">
                    <a class="user">
                      张三
                    </a> 添加评论：明天需协调王工参与讨论，明确会议时间。
                    <div class="date">
                      2018-03-02 11:12
                    </div>
                  </div>
                </div>
              </div>
              <div class="event" v-if="!isCommentOnly">
                <div class="label">
                  <i class="user circle huge icon"></i>
                </div>
                <div class="content">
                  <div class="summary">
                    <a class="user">
                      张三
                    </a> 修改进度20%为30%
                    <div class="date">
                      2018-03-04 17:19
                    </div>
                  </div>
                </div>
              </div>
              <div class="event" v-if="!isCommentOnly">
                <div class="label">
                  <i class="user circle huge icon"></i>
                </div>
                <div class="content">
                  <div class="summary">
                    <a class="user">
                      张三
                    </a> 修改进度0%为20%
                    <div class="date">
                      2018-03-02 11:12
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </sui>
      </div>
    </layout-lr>
  </div>
</template>
<script>
  import GlTable from '../../../components/collections/table/index'
  import mockData from '../../../mock/data'
  import prjCfg from '../../../common/project/config'

  export default {
    data () {
      return {
        // 任务列表
        currentPlan: {
          id: this.$route.query.id,
          name: this.$route.query.name
        },
        isCommentOnly: false,
        planOfYear: this.$route.query.year,
        planOfMonth: this.$route.query.month
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
      },
      planYearMonth: function () {
        return this.$route.query.year && this.$route.query.month ? this.$route.query.year + '年' + this.$route.query.month + '月' : ''
      },
      taskData: function () {
        return mockData.get(this.$route.query.module).plan.task
      },
      title: function () {
        return this.currentPlan.name + (this.planYearMonth ? '（' + this.planYearMonth + ')' : '')
      }
    },
    mounted: function () {
      console.log(this.$route)
      this.$_initUi()
    },
    methods: {
      $_initUi: function () {
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
      },
      $_mixAndMaxList () {
        if (this.taskData.columns.length === 1) {
          this.taskData.columns = this.plan.task.columns
        } else {
          this.taskData.columns = [{field: 'name', title: '任务名称', type: 'string', format: '', editable: true}]
        }
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
