<template>
  <div class="gl-designer">
    <toolbar :editorStore="editorStore" @newProject="$_newProject" @openProject="$_openProject" @itemClick="$_toolbarItemClick">
    </toolbar>
    <div class="ui grid" style="margin: 0;padding: 0">
      <div v-show="currentLayout==='column3'" class="three wide column" style="margin: 0;padding: 0">
        <sui type="tab" selector=".menu .item">
          <div class="ui top attached tabular mini menu">
            <a class="item active" data-tab="sidebar-project">项目</a>
            <a class="item" data-tab="designer-tab-tool">工具</a>
            <a class="item float right" style="padding:0;background-color: #eeeeee"
               @click="currentLayout=currentLayout==='column3'?'column2':'column3'">
              <i class="caret left icon"></i>
            </a>
          </div>
          <div class="ui bottom attached tab segment active" :style="{height:editorMainHeight}"
               data-tab="sidebar-project">
            <project ref="project" @openPage="$_onOpenPage" @newPage="$_onNewPage"
                     :editorStore="editorStore"></project>
          </div>
          <div class="ui bottom attached tab segment" :style="{height:editorMainHeight}" data-tab="designer-tab-tool">
            <toolbox-element></toolbox-element>
            <div class="element" draggable>
              <input type="checkbox" name="xx">sss
            </div>
          </div>
        </sui>
      </div>
      <div :class="layout[currentLayout].stageWide + ' wide column'" class="" style="margin: 0;padding: 0 1px">
        <stage ref="stage" :editorStore="editorStore" :editorMainHeight="editorMainHeight"
               @resize2Column="currentLayout=currentLayout==='column3'?'column2':'column3'">
          <a slot="resize" v-if="currentLayout==='column2'" class="item"
             style="padding:0;background-color: #eeeeee"
             @click="currentLayout='column3'">
            <i class="caret right icon"></i>
          </a>
        </stage>
      </div>
      <div class="four wide column" style="margin: 0;padding: 0">
        <settings ref="settings" :editorStore="editorStore" :editorMainHeight="editorMainHeight">
        </settings>
        <!--<div class="designer-properties-content">-->
        <!--<div class="ui mini top attached tabular menu">-->
        <!--<a class="item active " data-tab="designer-tab-page">接口信息</a>-->
        <!--</div>-->
        <!--<div class="ui bottom attached tab segment active stage-rules" :style="{height:editorMainHeight}"-->
        <!--data-tab="designer-tab-page">-->
        <!--<properties ref="properties" :editingPage="editorStore.editingPage"></properties>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import Toolbar from './toolbar.vue'
  import Project from './project.vue'
  import ToolboxElement from './toolbox-element.vue'
  import Stage from './stage.vue'
  import Settings from './settings.vue'
  import EditorStore from '../../../../pages/editor/EditorStore'
  //  import Properties from '../common/settings-properties.vue'
  //  import entityNames from '../../../../pages/entities'
  import config from './config.js'

  export default {
    data () {
      return {
        editorStore: new EditorStore({
          // 注册的插件名称
          pluginNames: config.pluginNames,
          // 启动初始化时，会依据插件名称，加载插件配置信息
          plugins: {},
          fileTypes: {
//          html5: {
//            icon: 'html5 icon',
// //            icon: 'fa fa-html5 icon-state-success icon-lg',
//            name: '普通页面'
//          },
//             list: {
//               type: 'list',
//               icon: 'th list icon',
//               name: '列表页面',
//               subTypes: ['ui'],
//               settings: ['properties', 'ui-table']
//             },
//             api: {
//               type: 'api',
//               icon: 'plug icon',
//               name: '通用接口',
//               subTypes: ['mvel', 'sql', 'json'],
//               settings: ['properties']
//             }
          }
        }),
        propertiesValue: {},
        editorMainHeight: '490px',
        editorMainHeightInt: 490,
        currentLayout: 'column3',
        layout: {
          column2: {
            toTitle: '三栏布局',
            stageWide: 'twelve'
          },
          column3: {
            toTitle: '二栏布局',
            stageWide: 'nine'
          }
        }
      }
    },
    created () {
      // 加载插件
      for (let index in this.editorStore.pluginNames) {
        let pluginName = this.editorStore.pluginNames[index]
        let plugin = require('../plugins/' + pluginName + '/config.js').Config
        this.editorStore.plugins[plugin.file.type] = plugin
        // 依据插件类型，构建可在左边文件树菜单创建的文件类型
        if (plugin.file) {
          this.editorStore.fileTypes[plugin.file.type] = {
            type: plugin.file.type,
            icon: plugin.file.icon,
            name: plugin.file.title
          }
        }
      }
    },
    mounted () {
    },
    methods: {
      $_newProject () {
        this.$refs.project.$_newProject()
        $(this.$el).find('.tabular.menu').tab('change tab', 'sidebar-project')
      },
      $_openProject (project) {
        this.$refs.project.$_openProject(project)
        $(this.$el).find('.tabular.menu').tab('change tab', 'sidebar-project')
      },
      $_onOpenPage () {},
      $_onNewPage () {},
      $_toolbarItemClick (methodName, param) {
        this[methodName](param)
      },
      /**
       * 获各panel的数据，并调用工程树组件的保存页面方法
       */
      $_savePage () {
        let thisVue = this
        // 通知相应面板提交将配置信息，更新到editingPage，失败返回false，失败的提示信息在各面板中控制展示
        // commit 返回结果为 {code:0|-1,message:String,data:Object},code为0表示成功
        let commitSettingResult = thisVue.$refs.settings.$_commit()
        if (commitSettingResult.code !== 0) {
          thisVue.$gl.ui.showMsg(commitSettingResult.msg || '保存失败', 'error')
          console.log('commitSettingResult 格式为：{code:0|-1,message:String,data:Object} >', commitSettingResult)
          return
        }
        // this.$refs.stage.$_getValue()
//        thisVue.editorStore.editingPage.name = props.name
//         thisVue.editorStore.editingPage.code = props.code
//         thisVue.editorStore.editingPage.description = props.description
        thisVue.$refs.project.$refs.fileTree.$_savePage()
      }
    },
    components: {Toolbar, Project, ToolboxElement, Stage, Settings}
  }
</script>

<style>

</style>
