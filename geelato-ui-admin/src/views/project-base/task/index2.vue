<template>
  <div style="padding:0.5em 1em">
    <div v-if="pageStage==='querying'" class="ui grid task-list">
      <div class="sixteen wide column task-topbar">
        <div class="ui mini menu">
          <a class="item">
            <!--<div class="ui icon button" :class="$GL.ui.color.primary" @click="$_edit('','bug')"><i class="plus icon"></i>创建</div>-->
            <div class="ui icon dropdown mini button" :class="$GL.ui.color.primary"><i class="plus icon"></i>创建
              <div class="mini menu">
                <div class="header">
                  <i class="tags icon"></i>
                  类型
                </div>
                <div class="scrolling mini menu">
                  <div class="mini item" @click="$_edit('','bug')">
                    <div class="ui red empty circular label"></div>
                    任务
                  </div>
                </div>
              </div>
            </div>
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
            <gl-group item=".list>.item" index="1">
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
              </div>
            </gl-group>
          </div>
        </div>
        <div class="ui accordion">
          <div class="title active">
            <i class="dropdown icon"></i>
            任务来源
          </div>
          <div class="content active">
            <sui type="checkbox" selector=".ui.checkbox">
              <div class="ui toggle checkbox">
                <input type="checkbox" name="isFromPlan">
                <label>计划文件</label>
              </div>
            </sui>
            <gl-group item=".list>.item">
              <div class="ui mini aligned selection animated list">
                <div class="item" v-for="item in plan.items" @click="currentPlan=item">
                  <div class="description" :class="{header:currentPlan.id===item.id}">
                    {{item.name}}
                  </div>
                </div>
              </div>
            </gl-group>
          </div>
        </div>
        <div class="ui accordion">
          <div class="title active">
            <i class="dropdown icon"></i>
            计划周期
          </div>
          <div class="content active">
            <div class="task-tags">
              <div><label class="ui label">年度</label><label class="ui label">月度</label><label
                class="ui label">周</label>
              </div>
              <div>2018年 2017年 2016年</div>
              <div>1月 2月 3月 4月</div>
              <div>5月 5月 6月 7月</div>
              <div>9月 10月 11月 12月</div>
              <div>1周 2周 3周 4周</div>
            </div>
          </div>
        </div>
        <div class="ui accordion">
          <div class="title active">
            <i class="dropdown icon"></i>
            任务属性
          </div>
          <div class="content active">
            <div class="task-tags">
              <label class="ui label">我的收藏</label>
              <label class="ui label">临时任务</label>
            </div>
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
              <h4 class="ui header" :class="$GL.ui.color.primary">
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
                <div class="ui inline dropdown mini button">
                  <!--<i class="filter icon"></i>-->
                  <span class="text">一般</span>
                  <div class="mini menu">
                    <div class="ui icon search input">
                      <i class="search icon"></i>
                      <input type="text" placeholder="Search tags...">
                    </div>
                    <div class="divider"></div>
                    <div class="header">
                      <i class="tags icon"></i>
                      优先级
                    </div>
                    <div class="scrolling mini menu">
                      <div class="mini item">
                        <div class="ui red empty circular label"></div>
                        Important
                      </div>
                      <div class="item">
                        <div class="ui blue empty circular label"></div>
                        Announcement
                      </div>
                      <div class="item">
                        <div class="ui black empty circular label"></div>
                        Cannot Fix
                      </div>
                      <div class="item">
                        <div class="ui purple empty circular label"></div>
                        News
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ui inline dropdown mini button">
                  <!--<i class="filter icon"></i>-->
                  <span class="text">问题</span>
                  <div class="mini menu">
                    <div class="ui icon search input">
                      <i class="search icon"></i>
                      <input type="text" placeholder="Search tags...">
                    </div>
                    <div class="divider"></div>
                    <div class="header">
                      <i class="tags icon"></i>
                      类型
                    </div>
                    <div class="scrolling mini menu">
                      <div class="mini item">
                        <div class="ui red empty circular label"></div>
                        Important
                      </div>
                      <div class="item">
                        <div class="ui blue empty circular label"></div>
                        Announcement
                      </div>
                      <div class="item">
                        <div class="ui black empty circular label"></div>
                        Cannot Fix
                      </div>
                      <div class="item">
                        <div class="ui purple empty circular label"></div>
                        News
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ui inline dropdown mini button">
                  <!--<i class="filter icon"></i>-->
                  <span class="text">待处理</span>
                  <div class="mini menu">
                    <div class="ui icon search input">
                      <i class="search icon"></i>
                      <input type="text" placeholder="Search tags...">
                    </div>
                    <div class="divider"></div>
                    <div class="header">
                      <i class="tags icon"></i>
                      状态
                    </div>
                    <div class="scrolling mini menu">
                      <div class="mini item">
                        <div class="ui red empty circular label"></div>
                        Important
                      </div>
                      <div class="item">
                        <div class="ui blue empty circular label"></div>
                        Announcement
                      </div>
                      <div class="item">
                        <div class="ui black empty circular label"></div>
                        Cannot Fix
                      </div>
                      <div class="item">
                        <div class="ui purple empty circular label"></div>
                        News
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ui inline dropdown mini button">
                  <!--<i class="filter icon"></i>-->
                  <span class="text">V1.1.1</span>
                  <div class="mini menu">
                    <div class="ui icon search input">
                      <i class="search icon"></i>
                      <input type="text" placeholder="Search tags...">
                    </div>
                    <div class="divider"></div>
                    <div class="header">
                      <i class="tags icon"></i>
                      优先级
                    </div>
                    <div class="scrolling mini menu">
                      <div class="mini item">
                        <div class="ui red empty circular label"></div>
                        Important
                      </div>
                      <div class="item">
                        <div class="ui blue empty circular label"></div>
                        Announcement
                      </div>
                      <div class="item">
                        <div class="ui black empty circular label"></div>
                        Cannot Fix
                      </div>
                      <div class="item">
                        <div class="ui purple empty circular label"></div>
                        News
                      </div>
                    </div>
                  </div>
                </div>
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
    <div v-if="pageStage==='editing'" class="task-form">
      <!--<task-form></task-form>-->
    </div>
    <div v-if="pageStage==='taskSet'" class="task-set">
      <task-set></task-set>
    </div>
  </div>
</template>
<script>
  //  import taskForm from './form'
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
        pageStage: 'querying'
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
//        $(this.$el).find('.ui.menu>.item[data-tab]').tab()
//        $(this.$el).find('.ui.menu>.item[data-tab*="designer-sub-tab"]').tab()
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
//        this.pageStage = 'editing'
        this.pageStage = 'taskSet'
      },
      $_query () {
        this.pageStage = 'querying'
      }
    },
    components: {taskSet}
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
