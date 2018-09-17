<!--
  表单配置页面
-->
<template>
  <div class="ui grid gl-fitted gl-designer-form">
    <div class="ten wide column">
      <div class="gl-form gl-col-24">
        <ht-table ref="htTable" :width="opts.table.width" :col-num="opts.table.colNum"
                  :row-num="opts.table.rowNum" :merge-cells="opts.table.mergeCells" :ds="opts.table.ds"></ht-table>
      </div>
    </div>
    <div class="six wide column">
      <sui type="tab" selector=".ui.menu>.item" class="ui segment">
        <div class="ui pointing secondary menu">
          <a class="item active" data-tab="tabA">表单</a>
          <a class="item" data-tab="tab">控件</a>
          <a class="item" data-tab="tabC">单元格</a>
        </div>
        <div class="ui tab active" data-tab="tabA">
          <div class="ui cards gl-settings">
            <div class="ui card">
              <div class="content">
                <div class="">表单样式</div>
              </div>
              <div class="content">
                xxxxxx
                <!--<div class="ui fluid action input">-->
                <!--<input type="text" placeholder="未设置..." v-model="card.name" readonly>-->
                <!--<div class="ui mini button" @click="$_loadMeta(card)"><i class="cog icon"-->
                <!--title="设置"></i>-->
                <!--</div>-->
                <!--</div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="ui tab" data-tab="tabB">
        </div>
        <div class="ui tab" data-tab="tab">
        </div>
      </sui>
    </div>
  </div>
</template>
<script>
  import HtTable from '../../../../../components/page/ht-table/Index.vue'

  export default {
    props: {
      opts: {
        type: Object,
        default: function () {
          return {table: {width: 720, colNum: 24, rowNum: 12, mergeCells: []}, editorStore: {}}
        },
        required: true
      }
    },
    data () {
      return {
        ui: undefined,
        hot: undefined
      }
    },
    computed: {},
    created: function () {
    },
    mounted: function () {
      if (this.opts.editorStore.editingPage.content.opts.ui) {
        this.ui = this.opts.editorStore.editingPage.content.opts.ui
      }
    },
    methods: {
      $_getValue () {
        return this.$refs.htTable.$_getValue()
      }
    },
    components: {HtTable}
  }
</script>
<style scoped>
  .gl-designer-form .ui.segment {
    padding: 0.1em 0.1em;
    min-height: 460px
  }

  .gl-designer-form.grid > .column {
    padding: 0
  }
</style>
