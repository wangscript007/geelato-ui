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
    <div class="sixteen wide column"></div>
    <div class="eleven wide column">
      <h4 class="ui dividing header">基础信息</h4>
      <div class="two fields">
        <div class="field">
          <label>所属项目</label>
          <div class="ui fluid search selection dropdown projectList">
            <input type="hidden" name="receipt">
            <i class="dropdown icon"></i>
            <div class="default text">所属项目</div>
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
        <div class="field">
          <label>标题</label>
          <input type="text" name="title" v-model="form.task.title" placeholder="标题">
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
      <task-comment></task-comment>
    </div>
    <div class="five wide column task-form-properties">
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
                  <div class="default text">请选择</div>
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
          <td style="min-width: 5em;background-color: #eeeeee">指派给</td>
          <td>张三</td>
        </tr>
        </tbody>
      </table>
      <h4 class="ui dividing header">相关任务</h4>
      <table class="ui compact table" style="width: 100%">
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
                  <div class="default text">请选择</div>
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
          <td style="min-width: 5em;background-color: #eeeeee">指派给</td>
          <td>张三</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="sixteen wide column">
      <div class="ui mini button" :class="$GL.ui.color.primary" @click="$_save">保存</div>
      <div class="ui mini button" :class="$GL.ui.color.negative" @click="$_cancel">取消</div>
    </div>
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
          height: '240px',
          minHeight: '200px',
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
      }
    },
    components: {TaskComment}
  }
</script>
<style>
  .te-mode-switch-section {
    display: none;
    /* 隐藏编辑器切换 */
  }

  .tui-codeblock.tui-toolbar-icons {
    display: none;
    /* 隐藏代码功能 */
  }
</style>
