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
                 @updated="$_onNodeSelect"
                 @select="$_onNodeSelect"
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
        <gl-form-base :opts="opts.form.opts" :query="currentNodeEntity" ref="glForm">
        </gl-form-base>
      </div>
      <div slot="rightAction">
        <!--<div class="ui mini button" :class="$gl.ui.color.primary" @click="$_validate">验证表单</div>-->
        <!--<div class="ui mini button" :class="$gl.ui.color.primary" @click="$_getValues">获取表单值</div>-->
        <!--<div class="ui mini button gql" :class="$gl.ui.color.primary" @click="$_getGql">获取Gql</div>-->
        <!--<div class="ui mini button" @click="$_clear">清除</div>-->
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
        currentTreeNode: {},
        currentNodeEntity: {}
      }
    },
    watch: {},
    mounted: function () {
      this.$_loadData()
    },
    methods: {
      $_loadData() {
      },
      $_validate() {
        // console.log('gl-tree-form > Index > this.$refs: ', this.$refs)
        return this.$refs.glForm.$_validate()
      },
      $_getGql() {
        return this.$refs.glForm.$_getGql()
      },
      $_onNodeSelect(nodeEntity, treeNode) {
        // console.log(nodeEntity, treeNode)
        for (let key in nodeEntity) {
          this.$set(this.currentNodeEntity, key, nodeEntity[key])
        }
        for (let key in treeNode) {
          this.$set(this.currentTreeNode, key, treeNode[key])
        }
        this.$refs.glForm.$_setValues(nodeEntity)
      }
    },
    components: {}
  }
</script>
<style scoped>

</style>
