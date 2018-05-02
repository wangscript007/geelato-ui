<template>
  <div class="ui padded grid mini task form">
    <!--<div class="ui mini top attached tabular menu">-->
    <!--<a class=" item active " data-tab="designer-tab-ui">任务信息</a>-->
    <!--<a class=" item" data-tab="designer-tab-code">Template</a>-->
    <!--<a class=" item" data-tab="designer-tab-json">JSON</a>-->
    <!--</div>-->
    <!--<div class="ui bottom attached tab segment active stage-ui" :class="[stageSelector]" data-tab="designer-tab-ui">-->
    <!--<div class="dnd-target" data-dnd-allow="table,layout,control" style="border-color: #d8d8d8">-->
    <!--</div>-->
    <!--</div>-->
    <div class="ten wide column">
      <h4 class="ui dividing header">基础信息</h4>
      <div class="two fields">
        <div class="field">
          <label>任务标题</label>
          <input type="text" name="title" v-model="form.task.title" placeholder="标题">
        </div>
        <!--<div class="field">-->
        <!--<label>所属项目</label>-->
        <!--<div class="ui fluid search selection dropdown projectList">-->
        <!--<input type="hidden" name="receipt">-->
        <!--<i class="dropdown icon"></i>-->
        <!--<div class="default text">所属项目</div>-->
        <!--<div class="menu">-->
        <!--<template v-for="item in list.project">-->
        <!--<div class="item" :data-value="item.id" :data-text="item.name">-->
        <!--&lt;!&ndash;<img class="ui mini avatar image" src="/static/assets/images/avatar/small/geelato.jpg">&ndash;&gt;-->
        <!--{{item.name}}-->
        <!--</div>-->
        <!--</template>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="field">
          <label>截止时间</label>
          <input type="text">
        </div>
      </div>
      <div class="two fields">
        <div class="field">
          <label>责任人</label>
          <input type="text" name="title" v-model="form.task.title" placeholder="标题">
        </div>
        <div class="field">
          <label>责任单位</label>
          <div class="ui fluid search selection dropdown projectList">
            <input type="hidden" name="receipt">
            <i class="dropdown icon"></i>
            <div class="default text">责任单位</div>
            <div class="menu">
              <template v-for="item in list.project">
                <div class="item" :data-value="item.id" :data-text="item.name">
                  <!--<img class="ui mini avatar image" src="/static/assets/images/avatar/small/geelato.jpg">-->
                  {{item.name}}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="field">
        <label>描述</label>
        <div class="task-description-editor" v-model="form.task.description"></div>
      </div>
      <div class="ui clearing segment" style="border: 0px;padding: 1em 0 0 0;margin:0 0 0 0"
           @mouseover="showDynamicInfo=true" @onmouseout="showDynamicInfo=false">
        <h4 v-if="showDynamicInfo" class="ui right floated header" style="padding-bottom: 0.1em;margin-bottom: 0.1em">
          <!--<div class="ui toggle checkbox" @click="isCommentOnly=!isCommentOnly">-->
          <!--<input type="checkbox" name="public">-->
          <!--<label>评论</label>-->
          <!--</div>-->
          <!--<div class="ui toggle checkbox" @click="isCommentOnly=!isCommentOnly">-->
          <!--<input type="checkbox" name="public">-->
          <!--<label>附件</label>-->
          <!--</div>-->
          <!--<div class="ui toggle checkbox" @click="isCommentOnly=!isCommentOnly">-->
          <!--<input type="checkbox" name="public">-->
          <!--<label>所有</label>-->
          <!--</div>-->
          <div class="ui mini buttons">
            <gl-group item=".ui.button">
              <button class="ui button active" @click="isCommentOnly=false">所有</button>
              <button class="ui button" @click="isCommentOnly=true">仅评论</button>
              <button class="ui button" @click="isCommentOnly=false">仅附件</button>
            </gl-group>
          </div>
        </h4>
        <h4 class="ui left floated header">
          动态信息
        </h4>
      </div>
      <div class="ui fitted divider"></div>
      <div class="ui feed">
        <div class="event" v-if="!isCommentOnly">
          <div class="label">
            <i class="user circle huge icon"></i>
          </div>
          <div class="content">
            <div class="summary gl-summary-thin">
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
            <div class="summary gl-summary-thin">
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
            <div class="summary gl-summary-thin">
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
            <div class="summary gl-summary-thin">
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
            <div class="summary gl-summary-thin">
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
      <!--<task-comment></task-comment>-->
    </div>
    <div class="six wide column task-form-properties">
      <h4 class="ui dividing header">属性</h4>
      <table class="ui compact table gl-table" style="width: 100%">
        <tbody>
        <tr v-for="(item,key) in task.properties">
          <td style="min-width: 5em;background-color: #eeeeee">{{item.name}}</td>
          <td>
            <template v-if="item.type==='text'">
              <input type="text">
            </template>
            <template v-else>
              <sui type="dropdown" selector=".ui.dropdown">
                <div class="ui fluid dropdown">
                  <input type="hidden" :name="item.name">
                  <i class="dropdown icon"></i>
                  <div class="default text" style="padding: .37857143em 1em">请选择</div>
                  <div class="menu">
                    <div v-for="subItem in item.values" class="item"
                         style="font-size: 1em"
                         data-value="subItem.code">{{subItem.name}}
                    </div>
                  </div>
                </div>
              </sui>
            </template>
          </td>
        </tr>
        <tr>
          <td style="min-width: 5em;background-color: #eeeeee">进度</td>
          <td>
            <div class="ui fluid labeled input" style="padding: 0">
              <input type="text" value="80">
              <div class="ui label">%</div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="min-width: 5em;background-color: #eeeeee">指派给</td>
          <td><i class="user circle big icon"></i>张三</td>
        </tr>
        <tr>
          <td style="min-width: 5em;background-color: #eeeeee">标签&nbsp;<i class="tag icon"></i></td>
          <td>
            <div class="ui mini basic blue label">
              报告
              <i class="delete icon"></i>
            </div>
            <div class="ui mini basic yellow label">
              方案
              <i class="delete icon"></i>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <h4 class="ui dividing header">任务成果(1/2)</h4>
      <gl-group item=".list>.item">
        <div class="ui aligned divided list">
          <div class="item">
            <div class="right floated content">
              <i class="download big icon gl-state-finished"></i>
            </div>
            <div class="content" style="cursor: pointer" @click="$_toAddingAchievement()">
              <i class="check circle outline big icon gl-state-none"></i>
              《用户需求》
            </div>
          </div>
          <div class="item">
            <div class="right floated content">
              <i class="download big icon gl-state-unfinished"></i>
            </div>
            <div class="content" style="cursor: pointer" @click="$_toAddingAchievement()">
              <i class="circle outline big icon gl-state-none"></i>
              《产品需求》
            </div>
          </div>
          <div class="item" v-if="achievementState==='querying'">
            <!--<div class="right floated content">-->
            <!--<i class="user circle big icon"></i>-->
            <!--</div>-->
            <div class="content" style="cursor: pointer" @click="$_toAddingAchievement()">
              <i class="add circle big icon"></i>
              添加其它成果
            </div>
          </div>
          <div class="item" v-if="achievementState==='editing'">
            <div class="right floated content">
              <i class="user circle big icon"></i>
            </div>
            <div class="content">
              <input type="text" style="width: 80%" @keyup.enter="$_addAchievement($event)">
            </div>
          </div>
        </div>
      </gl-group>
      <h4 class="ui dividing header">子任务(0/0)</h4>
      <gl-group item=".list>.item">
        <div class="ui aligned divided list">
          <div class="item" v-if="subTaskState==='editing'">
            <div class="right floated content">
              <i class="user circle big icon"></i>
            </div>
            <div class="content">
              <input type="text" style="width: 80%" @keyup.enter="$_addSubTask($event)">
            </div>
          </div>
          <div class="item" v-if="subTaskState==='querying'">
            <div class="right floated content">
              <i class="user circle big icon"></i>
            </div>
            <div class="content" style="cursor: pointer" @click="$_toAddingSubTask()">
              <i class="add circle big icon"></i>
              添加子任务
            </div>
          </div>
        </div>
      </gl-group>
      <h4 class="ui dividing header">前置任务(0/0)</h4>
      <gl-group item=".list>.item">
        <div class="ui aligned divided list">
          <div class="item" v-if="preTaskState==='editing'">
            <div class="right floated content">
              <i class="user circle big icon"></i>
            </div>
            <div class="content">
              <input type="text" style="width: 80%" @keyup.enter="$_addPreTask($event)">
            </div>
          </div>
          <div class="item" v-if="preTaskState==='querying'">
            <div class="right floated content">
              <i class="user circle big icon"></i>
            </div>
            <div class="content" style="cursor: pointer" @click="$_toAddingPreTask()">
              <i class="add circle big icon"></i>
              添加前置任务
            </div>
          </div>
        </div>
      </gl-group>
    </div>
    <!--<div class="sixteen wide column">-->
    <!--<div class="ui mini button" :class="$GL.ui.color.primary" @click="$_save">保存</div>-->
    <!--<div class="ui mini button" :class="$GL.ui.color.negative" @click="$_cancel">取消</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import entityNames from '../../../pages/entities.js'
  import 'tui-editor/dist/tui-editor.css'
  import 'tui-editor/dist/tui-editor-contents.css'
  import TuiEditor from 'tui-editor'
  import TaskComment from './task-comment.vue'

  export default {
    data () {
      return {
        // 子任务状态 editing querying
        subTaskState: 'querying',
        // 前置任务状态 editing querying
        preTaskState: 'querying',
        // 任务成果 editing querying
        achievementState: 'querying',
        // 动态信息，只展示评论
        showDynamicInfo: false,
        // 动态信息，只展示评论
        isCommentOnly: false,
        // 子任务、前置任务、父任务，{relationShip:'',}
        refTasks: [],
        // 最大时，不展示查询区
        isMax: false,
        // 页面状态
        pageStage: 'querying',
        form: {task: {}},
        list: {project: []},
        tuiEditor: {}
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
      this.$_loadData()
      this.$_initUi()
    },
    methods: {
      $_loadData: function () {
        let thisVue = this
//        thisVue.$GL.data.query(entityNames.project.projectInfo, null, 'id,name').then(function (result) {
//          thisVue.list.project = result.data
//        })
        thisVue.$GL.data.queryBatch([{
          entityName: entityNames.project.projectInfo,
          fieldNames: 'id,name'
        }, {
          entityName: entityNames.project.task,
          fieldNames: 'id,title'
        }]).then(function (result) {
          thisVue.list.project = result.data[entityNames.project.projectInfo].data
        })
      },
      $_initUi: function () {
        let $el = $(this.$el)
        $el.find('.ui.accordion').accordion()
        $el.find('.ui.dropdown').dropdown()

        this.tuiEditor = new TuiEditor({
          el: $el.find('.task-description-editor').get(0),
          initialEditType: 'wysiwyg', // markdown
          previewStyle: 'vertical', // tab
          height: '180px',
          minHeight: '120px',
          language: 'zh'
        })
        $(this.$el).find('.ui.menu>.item[data-tab]').tab()
      },
      $_save () {
        let thisVue = this
        let $el = $(this.$el)
        thisVue.form.task.projectId = $el.find('.ui.dropdown.projectList').dropdown('get value')
        thisVue.form.task.description = this.tuiEditor.getValue()
        thisVue.$GL.data.save(entityNames.project.task, thisVue.form.task).then(function (resp) {
          console.log('resp>', resp)
        })
        this.$parent.pageState = 'querying'
        console.log('form.task>', this.form.task)
      },
      $_cancel () {
        this.$parent.pageState = 'querying'
      },
      $_toAddingAchievement () {
        this.achievementState = 'editing'
      },
      $_addAchievement (event) {
        this.achievementState = 'querying'
      },
      $_toAddingSubTask () {
        this.subTaskState = 'editing'
      },
      $_addSubTask (event) {
        console.log(event)
        this.subTaskState = 'querying'
      },
      $_toAddingPreTask () {
        this.preTaskState = 'editing'
      },
      $_addPreTask (event) {
        this.preTaskState = 'querying'
      }
    },
    components: {TaskComment}
  }
</script>
<style>
  .task-description-editor .te-mode-switch-section {
    display: none;
    /* 隐藏编辑器切换 */
  }

  .task-description-editor .tui-codeblock.tui-toolbar-icons {
    display: none;
    /* 隐藏代码功能 */
  }
</style>
