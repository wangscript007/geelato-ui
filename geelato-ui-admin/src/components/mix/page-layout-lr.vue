<template>
  <div class="ui grid">
    <!--查询条件-->
    <div :class="leftWide + ' wide column gl-table-query'" :style="{display:(!leftWide?'none':'')}">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="margin-right: -1em;padding-right: 0">
          <i class="circle outline icon"></i>
        </div>
        <div class="item" style="font-weight: bold">{{title}}
        </div>
        <div class="ui right secondary mini menu">
          <div v-if="leftActions" class="item">
            <template v-for="(item, index) in leftActions">
              <button class="ui mini button" :class="$GL.ui.color.primary" @click="$_click(item,$event)">
                {{item.title}}
              </button>&nbsp;
            </template>
            <!--<button class="ui mini button" :class="$GL.ui.color.primary">添加</button>&nbsp;-->
          </div>
          <slot name="leftAction"></slot>
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <slot name="left">未配置左视图</slot>
    </div>
    <div :class="rightWide + ' wide column gl-table-main'" :style="{display:(!rightWide?'none':'')}">
      <!--工具条-->
      <div class="ui borderless secondary menu gl-header">
        <a class="item gl-page-sidebar-toggle" @click="$_toggleMaxMin">
          <i class="sidebar icon"></i>
        </a>
        <div class="item gl-title" style="font-weight: bold">
          {{rightTitle}}
        </div>
        <div class="ui right secondary  borderless mini menu">
          <div v-if="rightActions" class="item">
            <template v-for="(item, index) in rightActions">
              <button class="ui mini button" :class="$GL.ui.color.primary" @click="$_click(item,$event)">
                {{item.title}}
              </button>&nbsp;
            </template>
          </div>
          <slot name="rightAction"></slot>
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <slot name="right">未配置右视图</slot>
    </div>
  </div>
</template>
<script>
  //  import utils from '../../common/utils'

  export default {
    props: {
      title: {
        type: String
      },
      rightTitle: {
        type: String
      },
      leftActions: {
        type: Array
      },
      rightActions: {
        type: Array
      },
      max: {
        type: Object,
        default: function () {
          return {left: 0, right: 16}
        }
      },
      min: {
        type: Object,
        default: function () {
          return {left: 4, right: 12}
        }
      }
    },
    computed: {
      leftWide: function () {
        if (this.isMax) {
          return this.max.left === 0 ? '' : this.wides[this.max.left - 1]
        } else {
          console.log('xx', this.min.left === 0 ? '' : this.wides[this.min.left - 1])
          return this.min.left === 0 ? '' : this.wides[this.min.left - 1]
        }
      },
      rightWide: function () {
        if (this.isMax) {
          return this.max.right === 0 ? '' : this.wides[this.max.right - 1]
        } else {
          return this.min.right === 0 ? '' : this.wides[this.min.right - 1]
        }
      }
    },
    data () {
      return {
        // 最大时，不展示查询区
        isMax: false,
        wides: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen']
      }
    },
    mounted () {
      this.$_initUi()
    },
    updated () {
    },
    methods: {
      $_initUi () {
        $(this.$el).find('.ui.dropdown').dropdown()
        $(this.$el).find('.ui.checkbox').checkbox()
        $(this.$el).find('.ui.menu .item').tab()
      },
      $_toggleMaxMin () {
        this.isMax = !this.isMax
        this.$emit('toggle')
      },
      $_click (action, event, dataItem) {
        console.log('action>', action)
        this.$emit(action, event, dataItem)
      }
    },
    components: {}
  }
</script>
<style scoped>
</style>
