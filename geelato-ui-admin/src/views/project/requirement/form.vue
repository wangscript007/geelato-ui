<template>
  <div class="ui padded grid mini form">
    <div class="sixteen wide column"></div>
    <div class="twelve wide column">
      <h4 class="ui dividing header">基础信息</h4>
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
      <div class="field">
        <label>描述</label>
        <textarea class="task-description-editor" v-model="form.task.description"></textarea>
      </div>
    </div>
    <div class="four wide column task-form-properties">
      <h4 class="ui dividing header">属性</h4>
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
    <div class="sixteen wide column">
      <button class="ui mini teal button" @click="$_save">保存</button>
    </div>
  </div>
</template>
<script>
  //  import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
  // Using ES6 imports:
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
  import entityNames from '../../../common/entities.js'

  // Or CJS imports:
  //  const ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
  export default {
    data () {
      return {
        // 最大时，不展示查询区
        isMax: false,
        // 页面状态
        pageStage: 'querying',
        form: {task: {}},
        list: {project: []}
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
//        $(this.$el).find('.ui.menu>.item[data-tab]').tab()
//        $(this.$el).find('.ui.menu>.item[data-tab*="designer-sub-tab"]').tab()
        ClassicEditor.create($el.find('.task-description-editor').get(0), {
          toolbar: ['headings', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
          heading: {
            options: [
              {modelElement: 'paragraph', title: '正文', class: 'ck-heading_paragraph'},
              {modelElement: 'heading1', viewElement: 'h1', title: '标题1', class: 'ck-heading_heading1'},
              {modelElement: 'heading2', viewElement: 'h2', title: '标题2', class: 'ck-heading_heading2'}
            ]
          },
//          cloudServices: {
//            tokenUrl: 'http://localhost:8080/m/upload/'
//          },
          image: {
            // You need to configure the image toolbar too, so it uses the new style buttons.
            toolbar: ['imageTextAlternative', '|', 'imageStyleAlignLeft', 'imageStyleFull', 'imageStyleAlignRight'],
            styles: [
              // This option is equal to a situation where no style is applied.
              'imageStyleFull',
              // This represents an image aligned to left.
              'imageStyleAlignLeft',
              // This represents an image aligned to right.
              'imageStyleAlignRight'
            ]
          }
        }).catch(error => {
          console.error(error)
        })
//        console.log('ClassicEditor>', ClassicEditor)
      },
      $_save () {
        let $el = $(this.$el)
        this.form.task.projectId = $el.find('.ui.dropdown.projectList').dropdown('get value')
        console.log('form.task>', this.form.task)
      }
    },
    components: {}
  }
</script>
<style>
</style>
