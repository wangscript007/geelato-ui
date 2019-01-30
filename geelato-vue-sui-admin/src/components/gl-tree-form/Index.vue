<template>
  <div class="gl-page-content-wrapper">

    <gl-layout-page :left-title="opts.leftTitle" :right-title="opts.rightTitle" :max="opts.max"
                    :min="opts.min">
      <div slot="left">
        <gl-tree :tree-entity-name="opts.treeEntityName"
                 :tree-entity-name-field="opts.treeEntityNameField"
                 :node-entity-name="opts.nodeEntityName"
                 :node-entity-name-field="opts.nodeEntityNameField"
                 :tree-id="opts.treeId"
                 :tree-name="opts.treeName"
                 @created="$_onNodeSelect"
                 @updated="$_onNodeUpdate"
                 @select="$_onNodeSelect"
                 @moved="$_onNodeSelect"
        >
        </gl-tree>
      </div>
      <div slot="leftAction">
        <!--<sui-button size="mini" v-for="item in configs" @click="$_changeConfig(item.value)">加载{{item.text}}-->
        <!--</sui-button>-->
        <!--<sui-button size="mini" @click="$_genForm" :class="$gl.ui.color.primary">生成表单</sui-button>-->
      </div>
      <div slot="right">
        <!--<div class="ui info attached bottom segment" v-if="" style="word-wrap:break-word">-->
        <!--</div>-->
        <!--<gl-form-base :opts="opts.form.opts" :query="currentNodeEntity" :queryFields="['treeNodeId']" ref="glForm">-->
        <!--</gl-form-base>-->
        <gl-form-combination v-show="selected" :opts="opts" :query="currentNodeEntity" ref="glForm"
                             :modal="modal"></gl-form-combination>
        <gl-message v-show="!selected">
          未选择
        </gl-message>
      </div>
      <div slot="rightAction">
        <!--<div class="ui mini button" :class="$gl.ui.color.primary" @click="$_validate">验证表单</div>-->
        <!--<div class="ui mini button" :class="$gl.ui.color.primary" @click="$_getValues">获取表单值</div>-->
        <!--<div class="ui mini button gql" :class="$gl.ui.color.primary" @click="$_getGql">获取Gql</div>-->
        <!--<div class="ui mini button" @click="$_clear">清除</div>-->
        <gl-toolbar v-if="toolbar" v-bind="toolbar" :css="{align:'right',dividing:false}" :ctx="content"></gl-toolbar>
      </div>

    </gl-layout-page>

  </div>
</template>

<script>
  export default {
    props: {
      opts: {
        type: Object,
        required: false
      },
      query: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        selected: false,
        currentTreeNode: {},
        currentNodeEntity: {},
        toolbar: undefined
      }
    },
    watch: {},
    computed: {
      modal() {
        console.log('gl-tree-form > Index > computed modal: ', this)
        return this
      },
      content() {
        console.log('gl-tree-form > Index > computed modalContent: ', this.$refs.content)
        return this.$refs.glForm
      }
    },
    mounted: function () {
      this.toolbar = undefined
    },
    methods: {
      $_validate() {
        return this.$refs.glForm.$_validate()
      },
      $_getGql() {
        return this.$refs.glForm.$_getGql()
      },
      $_onNodeUpdate(nodeEntity, treeNode) {
        this.$refs.glForm.$_setValues(nodeEntity)
      },
      $_onNodeSelect(nodeEntity, treeNode) {
        this.selected = true
        this.$nextTick()
        console.log('gl-tree-form > Index > $_onNodeSelect > nodeEntity: ', nodeEntity)
        console.log('gl-tree-form > Index > $_onNodeSelect > treeNode: ', treeNode)
        for (let key in nodeEntity) {
          this.$set(this.currentNodeEntity, key, nodeEntity[key])
        }
        for (let key in treeNode) {
          this.$set(this.currentTreeNode, key, treeNode[key])
        }
        this.$refs.glForm.$_setValues(nodeEntity)
        // this.$refs.glForm.$nextTick()
        console.log('gl-tree-form > Index > $_onNodeSelect > currentNodeEntity: ', this.currentNodeEntity)
      },
      /**
       *  合并工具条
       *  @toolbar 工具配置
       */
      $_appendToolbar(toolbar) {
        this.toolbar = toolbar
        return true
      }
    },
    components: {}
  }
</script>
<style scoped>

</style>
