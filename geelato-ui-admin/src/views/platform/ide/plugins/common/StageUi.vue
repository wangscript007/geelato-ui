<template>
  <div class="gl-page-content-wrapper">
    <component :is="currentView" :opts="{ui:editorStore.editingPage.content.opts.ui}" :query="queryString">
      <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>
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
        currentView: '',
        queryString: {}
      }
    },
    created: function () {
      // 组件创建完后获取数据，
    },
    mounted: function () {
      this.$_init()
      this.$forceUpdate()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
//      '$route': '$_updatePage'
    },
    methods: {
      $_init () {
        let thisVue = this
        // thisVue.editorStore.editingPage.code = ''
        let plugin = this.editorStore.plugins[this.editorStore.editingPage.type]
        let uiPanel = null
        for (let index in plugin.stagePanels) {
          let panel = plugin.stagePanels[index]
          if (panel.name === 'ui') {
            uiPanel = panel
            break
          }
        }
        // 如果是从服务端加载page配置信息，此时thisVue.editorStore.editingPage已是最新的，不用本地模板panel的配置数据
        // 若是从模板打开，则打开之后自动保存
        // 增加条件thisVue.editorStore.editingPage.content.component不为空，确保当服务端没有存储有效的配置信息信息，改从模板获取示例进行展示
        if (thisVue.editorStore.editingPage && thisVue.editorStore.editingPage.isFromServer && thisVue.editorStore.editingPage.content.component) {
          thisVue.editorStore.commitOpts('ui', thisVue.editorStore.editingPage.ui)
        } else {
          thisVue.editorStore.editingPage.content.component = uiPanel.opts.component
          thisVue.editorStore.commitOpts('ui', uiPanel.opts.ui)
        }
        // console.log('editorStore', thisVue.editorStore)
        // console.log('opts>', {ui: this.editorStore.editingPage.content.opts.ui})
        // console.log('query>', this.queryString)
        // thisVue.editorStore.commitOpts('json', thisVue.editorStore.editingPage.content.opts.ui)
        thisVue.currentView = resolve => require(['../../../../../' + thisVue.editorStore.editingPage.content.component.substring(1) + '.vue'], resolve)
      },
      $_focus () {
      },
      $_reset () {
      },
      $_setValue (contentString = '') {
      },
      $_commit () {
        // this.editorStore.commitOpts('ui', this.editor.getValue())
        return {code: 0, msg: ''}
      }
    },
    components: {}
  }
</script>
<style>
</style>
