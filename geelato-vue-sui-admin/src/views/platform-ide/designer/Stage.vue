<template>
  <div class="designer-stage-content">
    <div v-if="editorStore.editingPage.id">
      <div class="ui mini top attached tabular menu gl-designer-tab-menu">
        <slot name="resize"></slot>
        <template v-for="(item,key) in plugin.stagePanels">
          <a class="item" :class="{active:item.name===selectedPanel.name}" :data-tab="'designer-tab-'+item.name"
             @click="selectedPanel=item;tabInited[item.name]=true;focus(item)">{{item.title}}</a>
        </template>
      </div>
      <div v-for="(item,key) in plugin.stagePanels" class="ui bottom attached segment gl-designer-tab"
           :style="{height:editorMainHeight}">
        <!--！！v-if与v-show结合，保证按需触发加载，加载之后又能保存对象，只是隐藏了-->
        <component v-if="tabInited[item.name]" :is="panelComponent[item.name]" v-show="selectedPanel.name===item.name"
                   :ref="item.name"
                   :editorStore="editorStore"
                   :editorMainHeight="editorMainHeight"></component>
      </div>

      <!--<stage-mvel v-if="tabInited.mvel" v-show="selectedPanel==='mvel'" ref="mvel" :editorStore="editorStore"-->
      <!--:editorMainHeight="editorMainHeight"></stage-mvel>-->
      <!--<stage-sql v-if="tabInited.sql" v-show="selectedPanel==='sql'" ref="sql" :editorStore="editorStore"-->
      <!--:editorMainHeight="editorMainHeight"></stage-sql>-->
      <!--<stage-json v-if="tabInited.json" v-show="selectedPanel==='json'" ref="json" :editorStore="editorStore"-->
      <!--:editorMainHeight="editorMainHeight"></stage-json>-->
    </div>

    <sui v-if="!editorStore.editingPage.id" type="tab" selector=".menu .item">
      <div class="ui mini top attached tabular menu gl-designer-tab-menu">
        <slot name="resize"></slot>
        <a class="item active " data-tab="designer-tab-blank">空</a>
      </div>
      <div class="ui bottom attached tab segment active" :style="{height:editorMainHeight}"
           data-tab="designer-tab-blank">
      </div>
    </sui>
  </div>
</template>
<script>
  //  import StageBlank from '../common/stage-blank.vue'
  //  import StageMvel from '../common/stage-mvel.vue'
  //  import StageSql from '../common/stage-sql.vue'
  //  import StageJson from '../common/stage-json.vue'

  export default {
    props: {
      editorStore: {
        type: Object,
        required: true
      },
      editorMainHeight: {
        type: String,
        default: function () {
          return '480px'
        }
      }
    },
    data() {
      return {
        // 解决未加载时，渲染codemirror出错问题，默认为不渲染，如默认只有第一个初始化{mvel:true,sql:false,json:false}
        tabInited: {},
        fileType: {},
        selectedPanel: '',
        panelComponent: {},
        plugin: {}
      }
    },
    watch: {
      'editorStore.editingPage.id': function (val, oldVal) {
        // 若未有page信息，则返回
        if (!val) {
          return
        }
        console.log('designer > Stage > watch > editorStore.editingPage.id > val:', val, 'oldVal:', oldVal)
        // 重置为未启用
        this.tabInited = {}
        this.plugin = this.editorStore.plugins[this.editorStore.editingPage.type]
        // 获取当前页面的定义类型，明确启用哪些tab
        for (let index in this.plugin.stagePanels) {
          let panel = this.plugin.stagePanels[index]
          this.tabInited[panel.name] = false
        }
        // 初始化第一个tab
        if (this.plugin.stagePanels && this.plugin.stagePanels.length > 0) {
          this.selectedPanel = this.plugin.stagePanels[0]
          this.tabInited[this.selectedPanel.name] = true
        }
      }
    },
    created: function () {
      // 预加载所有插件的动态加载代码页面模板组件
      for (let key in this.editorStore.plugins) {
        let plugin = this.editorStore.plugins[key]
        for (let index in plugin.stagePanels) {
          let panel = plugin.stagePanels[index]
          if (!this.panelComponent[panel.name]) {
            this.panelComponent[panel.name] = resolve => require(['../plugins/' + panel.path], resolve)
          } else {
            // 重名的panel丢弃
            // console.error('designer > Stage > created > 存在重名的panel，原panel: ', this.panelComponent[panel.name], '新panel: ', panel)
          }
        }
      }
    },
    mounted: function () {
    },
    methods: {
      focus(panel) {
        // 每个tab初次调用，component还未生成，即this.$refs[subType]为undefined
        if (this.$refs[panel.name] && typeof this.$refs[panel.name].focus === 'function') {
          // 注意要用$nextTick，待tab切换后完成之后回调
          this.$nextTick(this.$refs[panel.name].focus)
        }
      },
      getValue() {
        if (!this.plugin.stagePanels) {
          return {}
        }
        for (let index in this.plugin.stagePanels) {
          let panel = this.plugin.stagePanels[index]
          // 只获取激活状态的内容
          if (this.$refs[panel.name] && this.$refs[panel.name][0]) {
            this.editorStore.commitOpts(panel.name, this.$refs[panel.name][0].getValue())
          }
        }
      }
    },
    components: {}
//    components: {StageBlank, StageMvel, StageSql, StageJson}
  }
</script>
<style>
</style>

