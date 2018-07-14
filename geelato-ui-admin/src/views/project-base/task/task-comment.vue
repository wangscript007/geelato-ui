<template>
  <div class="ui comments">
    <h4 class="ui dividing header">评论（跟进）</h4>
    <!--<div class="comment">-->
      <!--<a class="avatar">-->
        <!--<img src="/static/images/avatar/small/matt.jpg">-->
      <!--</a>-->
      <!--<div class="content">-->
        <!--<a class="author">Matt</a>-->
        <!--<div class="metadata">-->
          <!--<span class="date">Today at 5:42PM</span>-->
        <!--</div>-->
        <!--<div class="text">-->
          <!--How artistic!-->
        <!--</div>-->
        <!--<div class="actions">-->
          <!--<a class="reply">回复</a>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <div class="comment">
      <a class="avatar">
        <img src="/static/images/avatar/small/elliot.jpg">
      </a>
      <div class="content">
        <a class="author">张小泉</a>
        <div class="metadata">
          <span class="date">昨天 12:30AM</span>
        </div>
        <div class="text">
          <p>这个项工作已内部通过会议讨论</p>
        </div>
        <div class="actions">
          <a class="reply">回复</a>
        </div>
      </div>
      <div class="comments">
        <div class="comment">
          <a class="avatar">
            <img src="/static/images/avatar/small/jenny.jpg">
          </a>
          <div class="content">
            <a class="author">李大彪</a>
            <div class="metadata">
              <span class="date">刚刚</span>
            </div>
            <div class="text">
              请推进，组织内部讨论
            </div>
            <div class="actions">
              <a class="reply">回复</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment">
      <a class="avatar">
        <img src="/static/images/avatar/small/joe.jpg">
      </a>
      <div class="content">
        <a class="author">王力</a>
        <div class="metadata">
          <span class="date">5天前</span>
        </div>
        <div class="text">
         待内部开会讨论解决。
        </div>
        <div class="actions">
          <a class="reply">回复</a>
        </div>
      </div>
    </div>
    <form class="ui reply form">
      <div class="field">
        <textarea rows="4"></textarea>
      </div>
      <div class="ui blue labeled submit icon button">
        <i class="icon edit"></i> 添加评论
      </div>
    </form>
  </div>
</template>
<script>
  import entityNames from '../../../pages/entities.js'
  import 'tui-editor/dist/tui-editor.css'
  import 'tui-editor/dist/tui-editor-contents.css'
  import TuiEditor from 'tui-editor'

  export default {
    data () {
      return {
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
//        thisVue.$gl.data.query(entityNames.project.projectInfo, null, 'id,name').then(function (result) {
//          thisVue.list.project = result.data
//        })
        thisVue.$gl.data.queryBatch([{
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
        thisVue.$gl.data.save(entityNames.project.task, thisVue.form.task).then(function (resp) {
          console.log('resp>', resp)
        })
        this.$parent.pageState = 'querying'
        console.log('form.task>', this.form.task)
      },
      $_cancel () {
        this.$parent.pageState = 'querying'
      }
    },
    components: {}
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
