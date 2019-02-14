<template>
  <file-tree ref="fileTree" :editorStore="editorStore" :projectId="projectId"></file-tree>
</template>

<script>
  import FileTree from './ProjectFileTree.vue'

  /**
   * 提项目结构管理、项目文件管理，对外提供通用的管理能力
   */
  export default {
    props: {
//      type: {
//        type: String,
//        required: true
//      },
//      value: {
//        type: Object,
//        default: function () {
//          return {id: '', name: ''}
//        }
//      },
      editorStore: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        // 本地曾打开过的页面，缓存用
        loadedPages: {},
        projectId: ''
      }
    },
    mounted () {
      // 默认加载，我的最近一个项目

    },
    methods: {
      newProject () {
        // TODO 是否保存旧项目
        let thisVue = this
        // 重置，并通过数据驱动，各页面板进入初始状态
        this.editorStore.reset()
        thisVue.editorStore.project = {name: '新项目', tree: ''}
        this.saveProject()
      },
      openProject (project) {
        let thisVue = this
        // 重置，并通过数据驱动，各页面板进入初始状态
        this.editorStore.reset()
        thisVue.editorStore.project = project
        thisVue.projectId = project.id
      },
      saveProject: function () {
        let thisVue = this
        thisVue.$gl.data.save(thisVue.$gl.entityNames['platform-ide'].dev.project, thisVue.editorStore.project).then(function (res) {
          thisVue.editorStore.project.id = res.data
          thisVue.projectId = res.data
        })
      }
    },
    components: {FileTree}
  }
</script>

<style>

</style>
