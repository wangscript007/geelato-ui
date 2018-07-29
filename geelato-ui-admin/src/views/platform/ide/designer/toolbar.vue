<template>
  <div class="ui mini borderless menu" style="margin:0px;background-color: #eeeeee">
    <a class="item">
      <sui type="dropdown" :opts="{action: 'hide'}">
        <a class="ui dropdown" style="color:black">文件
          <!--<div class="text">&nbsp;</div>-->
          <!--<i class="dropdown icon"></i>-->
          <div class="menu">
            <div class="item" @click="$_newProject">
              <i class="folder icon"></i>新建项目
            </div>
            <div class="item" @click="$_openProject">
              <i class="open folder icon"></i>打开项目
            </div>
            <div class="item" @click="$_openProject">
              <i class="cog icon"></i>设置项目
            </div>
            <!--<div class="item">-->
            <!--<i class="file code outline icon"></i>新建页面-->
            <!--</div>-->
            <!--<div class="item">-->
            <!--<i class="pie chart icon"></i>新建页面-->
            <!--</div>-->
            <div class="divider"></div>
            <div class="item" @click="$_closeProject">
              <i class="trash icon"></i>
              关闭项目
            </div>
          </div>
        </a>
      </sui>
    </a>
    <!--<div class="item" style="cursor: pointer">-->
    <!--预览-->
    <!--</div>-->
    <!--<div class="item" style="cursor: pointer">-->
    <!--设置（是否启用辅助线）-->
    <!--</div>-->
    <a v-show="projectOpened" class="item" @click="$emit('itemClick','$_savePage',{})">保存</a>
    <!--<a class="item">{{layout[currentLayout].toTitle}}</a>-->
    <a class="item" href="/help.html" target="_blank">帮助</a>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      editorStore: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        projectOpened: false
      }
    },
    mounted: function () {
    },
    methods: {
      /**
       *  emit project like {id,name,tree}
       */
      $_newProject: function () {
        this.$emit('newProject')
        this.projectOpened = true
      },
      $_openProject: function (event) {
        let thisVue = this
        thisVue.$gl.ui.openVueByPath(this, '/views/platform/ide/designer/ProjectList', {
          title: '选择项目',
          opts: {editorStore: this.editorStore}
        }, {
          '$_selected': function (data) {
            thisVue.$emit('openProject', data)
            thisVue.projectOpened = true
          }
        })
      },
      $_closeProject: function (event) {
        this.projectOpened = false
      },
      $_savePage: function () {
//        let thisVue = this
      },
      $_showHelp () {}
    },
    components: {}
  }
</script>
<style scoped>

</style>
