<template>
  <div class="gl-designer">
    <toolbar ref="toolbar" :editorStore="editorStore" @newProject="newProject" @openProject="openProject"
             @itemClick="toolbarItemClick">
    </toolbar>
    <div :style="{height:editorOuterMainHeight}">
      <div class="gl-designer-sidebar split split-horizontal">
        <sui type="tab" selector=".menu .item">
          <!--ui mini top attached tabular menu gl-designer-tab-menu-->
          <div class="ui mini top attached tabular menu gl-designer-tab-menu">
            <a class="item active" data-tab="sidebar-project">项目</a>
            <!--<a class="item" data-tab="designer-tab-tool">工具</a>-->
            <a class="item float right" style="padding:0;background-color: #eeeeee"
               @click="spliter.collapse(0)">
              <i class="caret left icon"></i>
            </a>
          </div>
          <div class="ui bottom attached tab segment active" :style="{height:editorMainHeight}"
               data-tab="sidebar-project">
            <project ref="project" @openPage="onOpenPage" @newPage="onNewPage"
                     :editorStore="editorStore"></project>
          </div>
          <div class="ui bottom attached tab segment" :style="{height:editorMainHeight}"
               data-tab="designer-tab-tool">
            <toolbox-element></toolbox-element>
            <div class="element" draggable>
              <input type="checkbox" name="xx">sss
            </div>
          </div>
        </sui>
      </div>
      <div class="gl-designer-stage split split-horizontal">
        <stage ref="stage" :editorStore="editorStore" :editorMainHeight="editorMainHeight">
          <!--<a slot="resize" v-if="spliter&&spliter.getSizes()[0]>0" class="item"-->
          <!--style="padding:0;background-color: #eeeeee"-->
          <!--@click="spliter.collapse(0)">-->
          <!--<i class="caret right icon"></i>-->
          <!--</a>-->
        </stage>
      </div>
      <div class="gl-designer-settings split split-horizontal">
        <settings ref="settings" :editorStore="editorStore" :editorMainHeight="editorMainHeight">
          <a slot="resize" class="item" style="padding:0;background-color: #eeeeee"
             @click="spliter.collapse(2)">
            <i class="caret right icon"></i>
          </a>
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
  import Split from 'split.js'
  import Toolbar from './Toolbar.vue'
  import Project from './Project.vue'
  import ToolboxElement from './ToolboxElement.vue'
  import Stage from './Stage.vue'
  import Settings from './Settings.vue'
  import EditorStore from '../lib/EditorStore'

  import config from './config.js'

  export default {
    data() {
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
        toolbarHeightNum: 33.42, // px
        // 一般一个tab时，高度为33.42，当增加多一个tab后，变为34.42，按最高的预留;
        // 最终方案，在gl-designer-tab-menu中指字max-height为31.42
        tabTitleHeightNum: 31.42,
        // 预留的向下的距离
        mainBottomGutter: 2,
        // editorMainHeight: '490px',
        // editorMainHeightNum: 490,
        spliter: undefined
      }
    },
    computed: {
      editorMainHeightNum: function () {
        return parseInt(this.$store.state.platform.currentLayout.content.height.replace('px', '')) - this.toolbarHeightNum - this.tabTitleHeightNum - this.mainBottomGutter
      },
      editorMainHeight: function () {
        return this.editorMainHeightNum + 'px'
      },
      /**
       * 包括tab及代码区
       * */
      editorOuterMainHeight: function () {
        return (this.editorMainHeightNum + this.tabTitleHeightNum) + 'px'
      }
    },
    created() {
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
    mounted() {
      this.spliter = Split(['.gl-designer-sidebar', '.gl-designer-stage', '.gl-designer-settings'], {
        sizes: [18.75, 56.25, 25],
        gutterSize: 4,
        minSize: 2
      })
    },
    methods: {
      newProject() {
        this.$refs.project.newProject()
        $(this.$el).find('.tabular.menu').tab('change tab', 'sidebar-project')
      },
      openProject(project) {
        this.$refs.project.openProject(project)
        $(this.$el).find('.tabular.menu').tab('change tab', 'sidebar-project')
      },
      onOpenPage() {
      },
      onNewPage() {
      },
      toolbarItemClick(methodName, param) {
        this[methodName](param)
      },
      /**
       * 获各panel的数据，并调用工程树组件的保存页面方法
       */
      savePage() {
        let thisVue = this
        // 通知相应面板提交将配置信息，更新到editingPage，失败返回false，失败的提示信息在各面板中控制展示
        // commit 返回结果为 {code:0|-1,message:String,data:Object},code为0表示成功
        let commitSettingResult = thisVue.$refs.settings.commit()
        if (commitSettingResult.code !== 0) {
          thisVue.$gl.ui.showMsg(commitSettingResult.msg || '保存失败', 'error')
          console.log('commitSettingResult 格式为：{code:0|-1,message:String,data:Object} >', commitSettingResult)
          return
        }
        // this.$refs.stage.getValue()
//        thisVue.editorStore.editingPage.name = props.name
//         thisVue.editorStore.editingPage.code = props.code
//         thisVue.editorStore.editingPage.description = props.description
        thisVue.$refs.project.$refs.fileTree.savePage()
      }
    },
    components: {Toolbar, Project, ToolboxElement, Stage, Settings}
  }
</script>

<style>
  .gl-designer .ui.tab.segment {
    margin: 0;
    padding: 0;
  }

  .gl-designer-tab-menu.ui.tabular.menu .active.item {
    border-top-width: 0px;
    max-height: 31.42px !important;
    border-top: 0px;
  }

  .gl-designer-tab.ui.bottom.attached.segment {
    overflow: auto;
    margin: 0;
    padding: 0;
  }

  .gl-designer .split {
    margin: 0;
    padding: 0;
  }

  /*.gl-designer-stage.split {*/
  /*padding: 0 5px;*/
  /*}*/

  .gl-designer .split p, .split-flex p {
    /*padding: 20px;*/
  }

  .gl-designer .split, .split-flex {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .gl-designer .gutter {
    background-color: #eee;
    background-repeat: no-repeat;
    background-position: 50%;
  }

  .gl-designer .gutter.gutter-horizontal {
    /*background-image: url('grips/vertical.png');*/
    cursor: ew-resize;
  }

  .gl-designer .gutter.gutter-vertical {
    /*background-image: url('grips/horizontal.png');*/
    cursor: ns-resize;
  }

  .gl-designer .split.split-horizontal, .gutter.gutter-horizontal {
    height: 100%;
    float: left;
  }
</style>
