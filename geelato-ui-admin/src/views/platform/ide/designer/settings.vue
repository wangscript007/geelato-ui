<template>
  <div class="designer-settings-content">

    <template v-if="editorStore.editingPage.id">
      <div class="ui mini top attached tabular menu">
        <template v-for="(item,key) in plugin.settingPanels">
          <a class="item" :class="{active:item.name===selectedPanel.name}" :data-tab="'designer-tab-'+item.name"
             @click="selectedPanel=item;tabInited[item.name]=true">{{item.title}}</a>
        </template>
      </div>
      <div class="ui bottom attached segment" style="margin: 0" :style="{height:editorMainHeight}">
        <template v-for="(item,key) in plugin.settingPanels">
          <!--！！v-if与v-show结合，保证按需触发加载，加载之后又能保存对象，只是隐藏了-->
          <component v-if="tabInited[item.name]" :is="panelComponent[item.name]" v-show="selectedPanel.name===item.name"
                     :ref="item.name"
                     :editorStore="editorStore"
                     :editorMainHeight="editorMainHeight"></component>
        </template>
      </div>
    </template>
    <sui v-if="!editorStore.editingPage.id" type="tab" selector=".menu .item">
      <div class="ui mini top attached tabular menu">
        <slot name="resize"></slot>
        <a class="item active " data-tab="designer-tab-blank">空</a>
      </div>
      <div class="ui bottom attached tab segment active" :style="{height:editorMainHeight}"
           data-tab="designer-tab-blank"
           style="padding:0">
      </div>
    </sui>
  </div>
</template>
<script>
  export default {
    props: {
      editorStore: {
        type: Object,
        required: true
      },
      editorMainHeight: {
        type: String,
        defalut: function () {
          return '480px'
        }
      }
    },
    data () {
      return {
        // 解决未加载时，渲染codemirror出错问题，默认为不渲染，如默认只有第一个初始化{mvel:true,sql:false,json:false}
        tabInited: {},
        plugin: {},
        selectedPanel: '',
        panelComponent: {}
      }
    },
    watch: {
      'editorStore.editingPage.id': function (val, oldVal) {
        // 若未有page信息，则返回
        if (!val) {
          return
        }
        // 重置为未启用
        this.tabInited = {}
        // this.plugin = this.editorStore.fileTypes[this.editorStore.editingPage.type]
        this.plugin = this.editorStore.plugins[this.editorStore.editingPage.type]
        // 获取当前页面的定义类型，明确启用哪些tab
        for (let index in this.plugin.settingPanels) {
          let panel = this.plugin.settingPanels[index]
          this.tabInited[panel.name] = false
        }
        // 初始化第一个tab
        if (this.plugin.settingPanels && this.plugin.settingPanels.length > 0) {
          this.selectedPanel = this.plugin.settingPanels[0]
          this.tabInited[this.selectedPanel.name] = true
        }
        // console.log('this.selectedPanel', this.selectedPanel)
      }
    },
    created: function () {
      // 预加载所有插件的动态加载代码页面模板组件
      for (let key in this.editorStore.plugins) {
        let plugin = this.editorStore.plugins[key]
        for (let index in plugin.settingPanels) {
          let panel = plugin.settingPanels[index]
          if (!this.panelComponent[panel.name]) {
            this.panelComponent[panel.name] = resolve => require(['../plugins/' + panel.path], resolve)
          }
        }
      }
    },
    mounted: function () {
    },
    methods: {
      $_commit () {
        if (!this.plugin.settingPanels) {
          return {code: 0, msg: ''}
        }
        for (let index in this.plugin.settingPanels) {
          let panel = this.plugin.settingPanels[index]
          let panelComponent = this.$refs[panel.name]
          // 只获取激活状态的内容
          if (panelComponent) {
            // console.log('panelComponent>', panelComponent[0])
            let result = panelComponent[0].$_commit()
            if (result.code !== 0) {
              return result
            }
          }
        }
        return {code: 0, msg: ''}
      }
    },
    components: {}
//    components: {StageBlank, StageMvel, StageSql, StageJson}
  }
</script>
<style>
  #designer_field_setting {
    width: 100%;
  }

  #designer_field_setting .gl-form td:nth-child(2n+1) {
    font-weight: normal;
    text-align: right;
    padding-right: 0.2em;
    background-color: white;
  }

  #designer_field_setting .gl-form td:nth-child(2n+1) > i {
    margin-left: 2px;
  }

  #designer_field_setting .gl-form td:nth-child(2n) {
    background-color: white;
    padding: 0px;
  }

  #designer_field_setting .gl-form td:nth-child(2n) > .ui {
    margin-left: 1em;
  }

  #designer_field_setting .gl-form input, #designer_field_setting .gl-form textarea {
    width: 100%;
    border: 0px;
  }

  #designer_field_setting i.icon {
    cursor: pointer;
    padding-left: 1em;
  }
</style>
