<template>
  <div class="ui grid">
    <!--查询条件-->
    <div class="four wide column gl-table-query" :style="{display:(isMax?'none':'')}">
      <div class="ui borderless secondary menu gl-header">
        <div class="item" style="font-weight: bold">{{title}}
        </div>
        <div class="ui right secondary mini menu">
          <div v-if="leftActions" class="item">
            <template v-for="(item, index) in leftActions">
              <button class="ui mini button" :class="theme" @click="$_click(item,$event)">{{item.title}}</button>&nbsp;
            </template>
            <!--<button class="ui mini button" :class="theme">添加</button>&nbsp;-->
          </div>
        </div>
      </div>
      <div class="ui fitted divider"></div>
      <slot name="left">未配置左视图</slot>
    </div>
    <!--查询列表-->
    <div :class="{ 'sixteen wide':isMax, 'twelve wide':!isMax }" class="column gl-table-main">
      <!--工具条-->
      <div class="ui borderless secondary menu gl-header">
        <a class="item gl-page-sidebar-toggle" @click="$_toggleMaxMin">
          <i class="sidebar icon"></i>
        </a>
        <div class="item gl-title" style="font-weight: bold">
        </div>
        <div class="ui right secondary  borderless mini menu">
          <div v-if="rightActions" class="item">
            <template v-for="(item, index) in rightActions">
              <button class="ui mini button" :class="theme" @click="$_click(item,$event)">{{item.title}}</button>&nbsp;
            </template>
          </div>
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
      leftActions: {
        type: Array
      },
      rightActions: {
        type: Array
      }
    },
    data () {
      return {
        theme: this.$GL.ui.theme.color.primary,
        // 最大时，不展示查询区
        isMax: false
        // 关闭tips
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
      },
      $_click (action, event, dataItem) {
        this.$emit(action, event, dataItem)
      }
    },
    components: {}
  }
</script>
<style scoped>
</style>
