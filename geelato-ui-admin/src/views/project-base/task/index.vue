<template>
  <div style="padding:0.5em 1em">
    <div v-if="pageState==='querying'" class="ui grid task-list">
      <div class="sixteen wide column task-topbar">
        <div class="ui mini menu">
          <a class="item">
            <div class="ui icon button" :class="$GL.ui.color.primary" @click="$_edit('','bug')"><i
              class="plus icon"></i>创建
            </div>
            <!--<div class="ui icon dropdown mini button" :class="$GL.ui.color.primary"><i class="plus icon"></i>创建-->
            <!--<div class="mini menu">-->
            <!--<div class="header">-->
            <!--<i class="tags icon"></i>-->
            <!--类型-->
            <!--</div>-->
            <!--<div class="scrolling mini menu">-->
            <!--<div class="mini item" @click="$_edit('','bug')">-->
            <!--<div class="ui red empty circular label"></div>-->
            <!--任务-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
          </a>
          <div class="item" style="width: 85%">
            <div class="ui icon input" style="width: 100%">
              <input type="text" placeholder="输入任务名称..." style="width: 100%">
              <i class="search icon"></i>
            </div>
          </div>
          <div class="right menu">
            <div class="item">
              <div class="ui button" :class="$GL.ui.color.primary">报告</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isMax" class="three wide column task-list-query">
        <div class="ui accordion">
          <div class="title active">
            <i class="dropdown icon"></i>
            任务过滤
          </div>
          <div class="content active">
            <gl-group item=".list>.item">
              <div class="ui mini aligned selection animated list">
                <div class="item" title="所有我有权限看的任务">
                  <div class="description">
                    查看所有
                  </div>
                </div>
                <div class="item" title="任务责任人是我的任务">
                  <div class="description">
                    我负责的
                  </div>
                </div>
                <div class="item" title="指派给我，正待我处理或我处理中未指派出去的任务">
                  <div class="description">
                    待我处理的
                  </div>
                </div>
                <div class="item" title="包括我处理的、评论的，所有与我有关的任务">
                  <div class="description">
                    我参与的
                  </div>
                </div>
                <div class="item" title="收入我个人收藏夹的任务">
                  <div class="description">
                    我收藏的
                  </div>
                </div>
              </div>
            </gl-group>
          </div>
        </div>
        <div class="ui accordion">
          <div class="title active">
            <i class="dropdown icon"></i>
            任务属性
          </div>
          <div class="content active">
            <table class="ui compact table gl-compact gl-table mini form">
              <tr v-for="(item,key) in task.properties">
                <td colspan="8" style="min-width: 5em;background-color: #eeeeee">{{item.name}}</td>
                <td colspan="16">
                  <template v-if="item.type==='text'">
                    <input type="text">
                  </template>
                  <template v-else>
                    <sui type="dropdown" selector=".ui.dropdown">
                      <div class="ui fluid dropdown">
                        <input type="hidden" :name="item.name">
                        <i class="dropdown icon"></i>
                        <div class="default text">请选择</div>
                        <div class="menu">
                          <div v-for="subItem in item.values" class="item"
                               style="padding: 0.5em!important;font-size: 1em"
                               data-value="subItem.code">{{subItem.name}}
                          </div>
                        </div>
                      </div>
                    </sui>
                  </template>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="thirteen wide column task-list-result">
        <div class="ui mini borderless secondary menu task-list-toolbar gl-header">
          <!--<a class="item gl-page-sidebar-toggle" @click="$_toggleSidebar">-->
          <!--<i class="sidebar icon"></i>-->
          <!--</a>-->
          <!--<div class="item">-->
          <!--<div class="ui teal icon button"><i class="plus icon"></i>创建</div>-->
          <!--</div>-->
          <div class="item">
            <div class="ui checkbox" style="margin-left: 3.2em">
              <input type="checkbox" name="example">
              <label class="ui teal">选择</label>
            </div>
          </div>
          <div class="ui dropdown item">
            指派 <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item">给我</a>
              <a class="item">给其它人</a>
            </div>
          </div>
          <div class="ui dropdown item">
            关联 <i class="dropdown icon"></i>
            <div class="menu">
              <a class="item">依赖于...</a>
              <a class="item">被...依赖</a>
              <a class="item">作为...的子项</a>
              <a class="item">作为...的父项</a>
            </div>
          </div>
          <div class="right menu">
            <div class="ui dropdown item">
              单行视图 <i class="dropdown icon"></i>
              <div class="menu">
                <a class="item" @click="display.detail=false">简单视图</a>
                <a class="item" @click="display.detail=true">详情视图</a>
              </div>
            </div>
            <div class="ui dropdown item">
              导出 <i class="dropdown icon"></i>
              <div class="menu">
                <a class="item">Excel</a>
                <a class="item">Word</a>
                <a class="item">Pdf</a>
              </div>
            </div>
            <div class="item">
              <div class="ui button" :class="$GL.ui.color.primary">设置</div>
            </div>
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="ui divided small items">
          <div class="item" v-for="item in task.items">
            <div class="ui mini image">
              <img src="/static/images/avatar/large/jenny.jpg">
            </div>
            <div class="content">
              <h4 class="ui header" style="cursor: pointer" :class="$GL.ui.color.primary" @click="pageState='editing'">
                <div class="ui checkbox">
                  <input type="checkbox" name="example">
                  <div>{{item.num}}-{{item.title}}</div>
                </div>
              </h4>
              <div class="task-datetime">{{item.createAt}}</div>
              <div class="description" v-if="display.detail">
                {{item.description}}
              </div>
              <div class="task-action">
                <div style="float: right;display: inline-block">
                  <div class="ui inline basic icon mini button">
                    <i class="comment outline icon" :class="$GL.ui.color.primary" title="评论"></i>&nbsp;
                    <i class="expand icon" :class="$GL.ui.color.primary" title="展开"></i>
                    <!--<i class="teal compress icon" title="收缩"></i>-->
                  </div>
                </div>

                <sui type="dropdown" selector=".ui.dropdown" v-for="(item,key) in task.properties"
                     style="display: inline-block">
                  <div class="ui inline dropdown mini button">
                    <!--<i class="filter icon"></i>-->
                    <span class="text">{{item.values[0].name}}</span>
                    <div class="mini menu">
                      <!--<div class="ui icon search input">-->
                        <!--<i class="search icon"></i>-->
                        <!--<input type="text" placeholder="查询">-->
                      <!--</div>-->
                      <!--<div class="divider"></div>-->
                      <!--<div class="header">-->
                        <!--&lt;!&ndash;<i class="tags icon"></i>&ndash;&gt;-->
                        <!--{{item.name}}-->
                      <!--</div>-->
                      <div class="scrolling mini menu">
                        <div class="mini item" v-for="subItem in item.values" style="padding: 0.4em 0.8em">
                          <!--<div class="ui red empty circular label" data-value="subItem.code"></div>-->
                          {{subItem.name}}
                        </div>
                      </div>
                    </div>
                  </div>
                </sui>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="align right content">
              一页<50>条记录
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="pageState==='editing'" class="task-form">
      <task-form></task-form>
    </div>
    <div v-if="pageState==='taskSet'" class="task-set">
      <task-set></task-set>
    </div>
  </div>
</template>
<script>
  import taskForm from './form-detail.vue'
  import taskSet from './task-set'

  export default {
    data () {
      return {
        display: {
          detail: true
        },
        currentPlan: {},
        // 最大时，不展示查询区
        isMax: false,
        // 页面状态 editing querying taskSet
        pageState: 'querying'
      }
    },
    computed: {
//      projectConfig: function () {
//        return prjCfg.get(this.$route.query.module)
//      },
      projectGroups: function () {
        return this.$mockData.get(this.$route.query.module).projectGroups
      },
      task: function () {
        return this.$mockData.get(this.$route.query.module).task
      },
      plan: function () {
        return this.$mockData.get(this.$route.query.module).plan
      }
    },
    mounted: function () {
      this.$_initUi()
    },
    methods: {
      $_initUi: function () {
        $(this.$el).find('.ui.accordion').accordion()
        $(this.$el).find('.ui.dropdown').dropdown()
        this.$_initProjects()
      },
      $_toggleSidebar () {
        this.isMax = !this.isMax
      },
      $_initProjects () {
        this.$GL.data.queryByGql()
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
        this.pageState = 'editing'
//        this.pageState = 'taskSet'
      },
      $_query () {
        this.pageState = 'querying'
      }
    },
    components: {taskForm, taskSet}
  }
</script>
<style scoped>

  /*.accordion > .title {*/
  /*background-color: #f0f0f0;*/
  /*}*/

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
