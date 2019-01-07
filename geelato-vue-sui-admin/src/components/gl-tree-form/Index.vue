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
                 :tree-name="opts.treeName">
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
        <gl-form-base :opts="opts.form.opts" :query="query" ref="glForm">
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
      return {}
    },
    watch: {},
    mounted: function () {
      this.$_loadData()
    },
    methods: {
      $_loadData() {
      }
    },
    components: {}
  }
</script>
<style scoped>

</style>
