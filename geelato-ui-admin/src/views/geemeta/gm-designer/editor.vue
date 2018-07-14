<template>
  <div class="xg-designer">
    <div class="ui mini borderless menu" style="margin:0px;background-color: #eeeeee">
      <div class="item">
        <div class="ui dropdown">文件
          <!--<div class="text">&nbsp;</div>-->
          <!--<i class="dropdown icon"></i>-->
          <div class="menu">
            <div class="item" @click="newProject">
              <i class="folder icon"></i>新建项目
            </div>
            <div class="item" @click="openProject">
              <i class="open folder icon"></i>打开项目
            </div>
            <div class="item">
              <i class="file code outline icon"></i>新建页面
            </div>
            <div class="item">
              <i class="pie chart icon"></i>新建页面
            </div>
            <div class="divider"></div>
            <div class="item">
              <i class="trash icon"></i>
              删除项目
            </div>
          </div>
        </div>
      </div>
      <div class="item" @click="savePage" style="cursor: pointer">保存
      </div>
      <div class="item" style="cursor: pointer">
        预览
      </div>
      <div class="item" style="cursor: pointer">
        设置（是否启用辅助线）
      </div>
    </div>
    <div class="ui padded grid">
      <div class="three wide column" style="padding:1px 0px">
        <div class="ui mini top attached tabular compact menu">
          <a class=" item active " data-tab="designer-tab-project">&nbsp;&nbsp;&nbsp;项目</a>
          <a class=" item" data-tab="designer-tab-designer">工具</a>
        </div>
        <div class="ui bottom attached tab vertical segment tab-content active" data-tab="designer-tab-project">
          <project :ds="ds.project" @openPage="onOpenPage"
                   @newPage="onNewPage"></project>
        </div>
        <div class="ui bottom attached tab vertical  segment tab-content" data-tab="designer-tab-designer">
          <div class="ui mini secondary compact menu">
            <a class="gl-size-small item active " data-tab="designer-sub-tab-layout">布局</a>
            <a class="gl-size-small item" data-tab="designer-sub-tab-form">表单</a>
            <a class="gl-size-small item" data-tab="designer-sub-tab-table">表格</a>
            <a class="gl-size-small item" data-tab="designer-sub-tab-component">组件</a>
            <a class="gl-size-small item" data-tab="designer-sub-tab-control">控件</a>
            <a class="gl-size-small item" data-tab="designer-sub-tab-page">页面</a>
          </div>
          <div class="ui bottom attached tab vertical segment sub-tab-content active"
               data-tab="designer-sub-tab-layout">
            <layout></layout>
          </div>
          <div class="ui bottom attached tab vertical segment sub-tab-content" data-tab="designer-sub-tab-component">
            <web-component></web-component>
          </div>
          <div class="ui bottom attached tab vertical segment sub-tab-content" data-tab="designer-sub-tab-table">
            <table-form></table-form>
          </div>
          <div class="ui bottom attached tab vertical segment sub-tab-content" data-tab="designer-sub-tab-control">
            <control></control>
          </div>
          <div class="ui bottom attached tab vertical segment sub-tab-content" data-tab="designer-sub-tab-page">
            <page></page>
          </div>
          <div class="ui bottom attached tab vertical segment sub-tab-content" data-tab="designer-sub-tab-form">
            <div-form></div-form>
          </div>
        </div>
      </div>
      <div class="ten wide column" style="padding:1px 3px">
        <div class="designer-stage">
          <stage @openSetting="onSettingOpen" @beforeChange="onSettingBefore"
                 :editingPage="designerStore.editingPage"></stage>
        </div>
      </div>
      <div class="three wide column" style="padding:1px 3px">
        <div class="designer-toolbox">
          <setting :editingPage="designerStore.editingPage"></setting>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //  import Vue from 'vue'
  import core from '../../../common/core'
  import Project from './toolbox-project'
  import TableForm from './toolbox-table-form'
  import WebComponent from './toolbox-sheet.vue'
  import Layout from './toolbox-layout'
  import Control from './toolbox-control'
  import Setting from './setting/setting.vue'
  import Page from './toolbox-page'
  import DivForm from './toolbox-div-form'
  import Stage from './stage/stage'
  //  import utils from '../../../common/utils'
  import designerStore from '../../../components/designer/DesignerStoreInstance'
  //  import PageInfo from '../../../common/PageInfo'
  import entityNames from '../../../pages/entities'
  import EditingPageDefinition from '../../../pages/EditingPageDefinition'
  //  import FileHtml5 from './file-template/html5'

  export default {
    data () {
      return {
        ds: {
          project: {id: ''}
        },
        designerStore: designerStore,
        // 当前编辑的页面
//        editingPage: designerStore.editingPage,
        // 本地曾打开过的页面，缓存用
        loadedPages: {},
        files: {},
        settingOptions: {},
        pageDefine: new EditingPageDefinition()
      }
    },
    mounted: function () {
      this.$_initUi()
      // 默认创建空页面
//      let data = {id: utils.uuid(18), text: '空页面', type: 'blank'}
//      this.onNewPage(data)
    },
    methods: {
      $_initUi: function () {
        $(this.$el).find('.ui.dropdown').dropdown({action: 'hide'})
        $(this.$el).find('.ui.menu>.item[data-tab]').tab()
        $(this.$el).find('.ui.menu>.item[data-tab*="designer-sub-tab"]').tab()
      },
      newProject: function () {
        let thisVue = this
        let project = {name: '新项目', tree: ''}
        $('.tabular.menu').tab('change tab', 'designer-tab-project')
        core.data.save(entityNames.platform.dev.project, project).then(function (res) {
          project.id = res.data
          thisVue.ds.project = project
//          console.log('save project>', res.data)
        })
      },
      openProject: function (mouseEvent) {
        //  openVue: function (srcVue, vueTemplate, vueConfig, vueData) {
        core.ui.openPage(this, 'platform_dev_project_list_select', null, {})
        console.log('open project mouseEvent>', mouseEvent)
      },
      onSettingOpen: function (editingElement) {
//        debugger
//        console.debug('editingElement>', editingElement)
//        if (editingElement.meta.type === 'field') {
//          $('.tabular.menu').tab('change tab', 'designer-tab-setting-field')
//        }
//        var d = editingElement || {}
//        // 改变actionId便于检测数据变化
//        d.actionSeq = utils.uuid(8)
//        this.settingOptions = d
      },
      onSettingBefore: function (page) {
        // 记录旧模板数据
        if (page.extendId) {
          this.loadedPages[page.extendId].component = page.component
        }
      },
      /**
       * 页面内元素的配置信息
       * @data {id:xx,cfg:xx}
       */
      onElementSettingUpdate: function (data) {
        // 有id的元素，才是有效的，才需保存
        if (data.id) {
          designerStore.editingPage.opts.elements[data.id] = data.cfg
//          console.log('onElementSettingUpdate designerStore.editingPage.opts.elements>', designerStore.editingPage.opts.elements)
        }
      },
      onNewPage: function (data) {
//        console.log('data>', data)
        let thisVue = this
        // 加载页面配置
        core.data.getFileTemplate(data.type).then(function (vueFile) {
          console.log('vueFile>', vueFile)
          // 加载页面数据源，解析为最终渲染的内容
          thisVue.loadedPages[data.id] = new EditingPageDefinition({
            extendId: data.id,
            component: {
              template: vueFile.$el.cloneNode(true)
            }
          })
          thisVue.loadCachePage(data.id)
          thisVue.savePage()
        })
      },
      /**
       *
       * @param node {id:xxx} 页面id，非页面code
       */
      onOpenPage: function (node) {
        let thisVue = this
        if (!thisVue.loadedPages[node.id]) {
          // 加载页面配置 pageDefine
          core.data.query(entityNames.platform.dev.pageConfig, {extendId: node.id}, 'id,code,content').then(function (res) {
            console.log('加载页面配置>', res)
          })
        } else {
          thisVue.loadCachePage(node.id)
        }
      },
      /**
       * 加入本地缓存
       * 保存到服务端
       * 记录保存更新状态
       */
      savePage: function () {
//        designerStore.editingPage.component = designerStore.editingPage.component.outerHTML || designerStore.editingPage.component
        core.data.save(entityNames.platform.dev.pageConfig, {
          id: designerStore.editingPage.id,
          extendId: designerStore.editingPage.extendId,
          code: designerStore.editingPage.code,
          content: JSON.stringify(designerStore.editingPage)
        }).then(function (res) {
          designerStore.editingPage.id = res.data
//          thisVue.$gl.ui.showMsg('页面保存成功', 'success', '')
        }).catch(function (e) {
//          thisVue.$gl.ui.showMsg('页面保存失败', 'fail', '')
        })
      },
      loadCachePage: function (extendId) {
        console.log('loadCachePage extendId>' + extendId + '>', this.loadedPages[extendId])
        designerStore.editingPage = this.loadedPages[extendId]
        designerStore.editingPage.extendId = extendId
      }
    },
    components: {Project, core, Layout, WebComponent, TableForm, Control, Setting, Page, DivForm, Stage}
  }
</script>
<style>
  .designer-toolbox {
    float: left;
    /*width: 300px;*/
    /*margin-right: 20px;*/
  }

  .designer-stage {
    overflow: hidden;
  }

  /*reset*/
  .xg-designer .ui.attached.segment.tab-content {
    padding: 1px 2px;
    height: 100%;
  }

  .xg-designer .ui.attached.segment.sub-tab-content {
    padding: 1px 2px;
    border-width: 0px;
    height: 100%;
  }

  /*.xg-designer.page-content-wrapper .page-content {*/
  /*padding: 10px 15px 10px;*/
  /*}*/

  /*.xg-designer .panel-body {*/
  /*padding: 2px;*/
  /*}*/

  .xg-designer .menu > .item > .ui.accordion > .title {
    font-size: 12px;
    font-weight: bold;
  }

  /*.xg-designer .float-toolbar {*/
  /*float: inherit;*/
  /*position: relative;*/
  /*top: 0px;*/
  /*line-height: 1em;*/
  /*font-size: 0.8em;*/
  /*text-align: center;*/
  /*background-color: #ffbe52;*/
  /*border-radius: 10px !important;*/
  /*cursor: pointer;*/
  /*margin: 1px 0;*/
  /*}*/

  /*.xg-designer .popover-content {*/
  /*padding: 1px 1px;*/
  /*}*/

  /*.xg-designer .dnd-container {*/
  /*padding: 5px;*/
  /*min-height: 5em;*/
  /*border: 1px dotted #DDD;*/
  /*}*/

  /*.xg-designer*/
  /*.dnd-toolbox .dnd-item*/
  /*.dnd-toolbox .dnd-item.active*/
  /*.dnd-toolbox .dnd-item  > .dnd-dsc{}*/
  /*.dnd-toolbox .dnd-item  > .dnd-dsc > .dnd-title {}*/
  /*.dnd-toolbox .dnd-item  > .dnd-dsc > .dnd-detail {}*/
  /*.dnd-toolbox .dnd-item  > .dnd-toolbar{}*/
  /*.dnd-toolbox .dnd-item  > .dnd-content{}*/

  /*.dnd-stage .dnd-item  > .dnd-dsc{}*/
  /*.dnd-stage .dnd-item  > .dnd-dsc > .dnd-title {}*/
  /*.dnd-stage .dnd-item  > .dnd-dsc > .dnd-detail {}*/
  /*.dnd-stage .dnd-item  > .dnd-toolbar{}*/
  /*.dnd-stage .dnd-item  > .dnd-content{}*/
  /*.dnd-stage.preview*/

  /*.dnd-stage .dnd-target*/
  /*.dnd-stage .dnd-target.dnd-control*/

  .xg-designer .dnd-item {
    /*cursor: move;*/
  }

  .xg-designer .dnd-toolbox {
    width: 100% !important;
  }

  /*
  * dnd-toolbox和dnd-setting都属于dnd-sidebar,抽取共性
  */
  .xg-designer .dnd-sidebar.menu > .accordion.item {
    padding: 0.4em 0.6em;
  }

  .xg-designer .dnd-sidebar.menu > .accordion.item > .title {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .xg-designer .dnd-toolbox .dnd-item {
    position: static;
    border-style: dotted solid;
    background-color: #f4f4f4;
    margin: 0 .2em .2em;
    padding: .36em;
    border-width: 1px 1px 1px 4px;
    border-color: #c9c9c9;
    zoom: 1;
    cursor: move;
  }

  .xg-designer .dnd-toolbox .dnd-item.active {
    background-color: #ececec;
  }

  .xg-designer .dnd-toolbox .dnd-item > .dnd-dsc {
  }

  .xg-designer .dnd-toolbox .dnd-item > .dnd-dsc > .dnd-title {
    padding-left: 0.5em;
    cursor: move;
  }

  .xg-designer .dnd-toolbox .dnd-item > .dnd-dsc > .dnd-title > * {
    cursor: move;
  }

  .xg-designer .dnd-toolbox .dnd-item > .dnd-dsc > .dnd-title > label {
    padding-left: 6px;
  }

  .xg-designer .dnd-toolbox .dnd-item > .dnd-dsc > .dnd-detail {
  }

  .xg-designer .dnd-toolbox .dnd-item > .dnd-toolbar {
    display: none;
  }

  .xg-designer .dnd-toolbox .dnd-item > .dnd-content {
    display: none;
  }

  .xg-designer .dnd-stage .dnd-item {
    border: 1px solid #ffbe52;
    position: relative;
  }

  .xg-designer .dnd-stage .dnd-item > .dnd-dsc {
  }

  .xg-designer .dnd-stage .dnd-item > .dnd-dsc > .dnd-title {
  }

  .xg-designer .dnd-stage .dnd-item > .dnd-dsc > .dnd-detail {
  }

  .xg-designer .dnd-stage .dnd-item > .dnd-toolbar {
    width: 100%;
    line-height: 0.6em;
    display: block;
    /*background-color: #ffe7a8;*/
    /*background-color: #fffde6;*/
    text-align: center;
    cursor: move;
    position: absolute;
    top: -0.5em;
    /*opacity: 0;*/
  }

  .xg-designer .dnd-stage .dnd-item > .dnd-content:hover {
    /*background-color: #fffde6;*/
  }

  /*.xg-designer .dnd-stage .dnd-item > .dnd-toolbar:hover {*/
  /*background-color: #fffde6;*/
  /*}*/

  .xg-designer .dnd-stage .dnd-item > .dnd-toolbar > .ui.button {
    padding: 0.3em 1em;
    font-weight: normal;
    font-size: 0.7em;
    position: relative;
    top: -0.1em;
    opacity: 0;
    /*display: none;*/
    /*line-height: 1.1em;*/
    /*!*float: right;*!*/
    /*margin: 2px 4px 2px 0;*/
    /*font-size: 0.7em;*/
  }

  .xg-designer .dnd-stage .dnd-item > .dnd-toolbar > .ui.label {
    opacity: 0;
  }

  .xg-designer .dnd-stage .dnd-item > .dnd-toolbar:hover > .ui.button, .xg-designer .dnd-stage .dnd-item > .dnd-toolbar:hover > .ui.label {
    opacity: 1;
  }

  .xg-designer .dnd-stage .dnd-item tr.dnd-toolbar td {
    width: 100%;
    line-height: 0.7em;
    background-color: #5fd895;
    text-align: right;
    cursor: move;
    padding: 0;
  }

  .xg-designer .dnd-stage .dnd-item tr.dnd-toolbar td .btn {
    line-height: 1.1em;
    /*float: right;*/
    margin: 2px 2px;
    font-size: 0.7em;
  }

  .xg-designer .dnd-stage .dnd-item tr > td > table > tbody > tr > td {
    border: 1px solid #59c487;
  }

  .xg-designer .dnd-stage .dnd-item > .dnd-content {
    clear: both;
  }

  .xg-designer .dnd-stage.preview {
  }

  .xg-designer .dnd-stage .dnd-target {
    min-height: 2em;
    /*border: 1px dotted #d8d8d8;*/
    padding: 5px;
  }

  .xg-designer .dnd-stage .dnd-target[data-dnd-allow*=control] {
    min-height: 2em;
    border: 1px dotted #eeeeee;
    /*border: 1px dotted #c5f1ff;*/
  }

  .xg-designer .dnd-stage .dnd-target[data-dnd-allow*=layout] {
    min-height: 2em;
    /*border: 1px dotted #ffbe52;*/
    border: 1px dotted #eeeeee;
  }

  .xg-designer .dnd-stage .dnd-target[data-dnd-allow*=field], .xg-designer .dnd-stage .dnd-target[data-dnd-allow*=fields] {
    min-height: 2em;
    /*border: 1px dotted #b4e7ff;*/
    border: 1px dotted #eeeeee;
  }

  .xg-designer .dnd-stage .dnd-target.dnd-control {
    min-height: 2em;
    /*background-color: #e2fff8 !important;*/
  }

  .xg-designer .dnd-stage .dnd-target.column {
    min-height: 2em;
    border: 1px dotted #eeeeee;
  }

  .xg-designer .dnd-stage .dnd-placeholder {
    min-height: 2em;
    background-color: #fffee8;
    /*border: 1px dotted #c9c9c9;*/
    text-align: center;
    line-height: 2em;
    width: 100%;
  }

  .xg-designer .dnd-stage tr.dnd-placeholder > td {
    background-color: #ebfff2;
    text-align: center;
    font-weight: normal;
  }

  .xg-designer .column {
    /*min-height: 5em;*/
    /*!*background-color: #f0f0f0;*!*/
    /*border: 1px dotted #DDD;*/
    /*margin: 0;*/
    /*padding: 4px !important;*/
  }

  .xg-designer .ui.grid > .column {
    padding: 0.068em
  }

  /***********reset***********/
  .xg-designer .compact.segment {
    padding: 5px !important;
  }

  /***********reset***********/
  .xg-designer .actions.xg-actions-xs {
    background-color: #EBEBEB;
    padding: 4px 10px;
    margin-bottom: 1px;
  }

  /*.xg-designer .actions.xg-actions-xs > .btn-group > a {*/
  /*font-weight: bold;*/
  /*}*/
  .xg-designer .actions.xg-actions-xs > .btn-group > a {
    margin-left: 10px;
    font-weight: bold;
    font-size: 0.9em;
    color: #616161;
  }

  .xg-designer .actions.xg-actions-xs > .btn-group > a:hover {
    color: black;
  }

  .xg-designer .actions.xg-actions-xs .dropdown-menu > li > a {
    padding: 0.5em 1em;
  }

  .xg-designer .actions.xg-actions-xs .dropdown-menu {
    min-width: 8em;
    font-weight: bold;
  }

  /**, :after, :before {*/
  /*box-sizing: border-box;*/
  /*}*/

  .gl-form li.tips, i.tips {
    color: dodgerblue;
    margin-right: 0.25em;
  }

  .gl-form li.required, .gl-form i.required {
    color: red;
    margin-right: 0.25em;
    list-style-type: none;
    display: inline;
  }

  .gl-form li.sm, .gl-form i.sm {
    font-size: 0.35em;
    line-height: 0.35em;
    vertical-align: 100%;
  }

  .gl-form .fields.gl-inline {
    margin: 0;
    padding: 0;
    /*background-color: #f4f4f4;*/
  }

  .gl-form .ui.grid > .column .field {
    text-align: right;
  }

  /*.gl-form .fields.gl-inline .field > label {*/
  /**/
  /*!*padding: 0.67857143em 0em;*!*/
  /*!*background-color: #f0f0f0;*!*/
  /*}*/

  .gl-form .ui.grid > .column .field > label {
    line-height: 29.92px;
    display: inline-block;
    width: 37.5%;
    max-width: 37.5%;
    padding-right: 3px;
  }

  .gl-form .ui.grid > .column .field > *:not(label) {
    display: inline-block;
    width: 61%;
    text-align: left;
  }

  /*.gl-form > .field {*/
  /*!*text-align: right;*!*/
  /*}*/

  /*.gl-form > .field > label {*/
  /*line-height: 29.92px;*/
  /*display: inline-block;*/
  /*width: 37.5%;*/
  /*max-width: 37.5%;*/
  /*background: red;*/
  /*}*/

  /*.gl-form > .field > input, .gl-form > .field > textarea {*/
  /*display: inline-block;*/
  /*width: 40%;*/
  /*background: blue;*/
  /*}*/

  .xg-designer .gl-form .field > .inline > .checkbox {
    display: inline-block !important;
  }

  .xg-designer .gl-form.mini .field .checkbox > label {
    font-size: 0.75em;
  }


</style>
