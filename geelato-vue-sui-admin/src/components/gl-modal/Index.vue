<template>
  <div class="ui fullscreen modal hide">
    <i class="close icon" @click="close"></i>
    <div class="header" v-html="modalOpts?modalOpts.title:' '" @dblclick="isShowContent=!isShowContent">
    </div>
    <div v-show="isShowContent" class="scrolling content" :style="contentStyle">
      <!--在component内的vue中，调用$emit('callModal', {fnName: paramObject})，以触发invokeCallbackSet-->
      <component ref="content" :componentUpdated="isMounted=true" :is="modalBody"
                 :opts="modalOpts.opts"
                 :query="modalOpts.query"
                 :opener="modalOpener" :modal="modal">
        正在加载...
      </component>
    </div>
    <!-- 采用"actions"样式类，其内部的button会被semantic-ui框架加上关闭事件，这里改用gl-modal-actions重写 -->
    <div class="gl-modal-actions" style="text-align: center">
      <!--<div class="ui mini button" :class="$gl.ui.color.primary">保存</div>-->
      <!--<div class="ui mini button" :class="$gl.ui.color.negative" @click="cancel">取消</div>-->

      <!--<div v-if="!toolbar" v-for="(item,key) in actions" class="ui mini button" :key="key"-->
      <!--:class="$gl.ui.color[item.color]"-->
      <!--@click="doAction(key)">-->
      <!--{{item.title}}-->
      <!--</div>-->
      <gl-toolbar v-if="toolbar" v-bind="toolbar" :css="{align:'center',dividing:false}" :ctx="content"></gl-toolbar>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      modalId: String,
      modalOpener: {
        type: Object
      },
      // modalHeader:  {title: ''},
      // modalFooter: null,
      modalBody: Function,
      modalOpts: {
        type: Object,
        default() {
          return {title: '', actions: [], contentStyle: {}}
        }
      },
      // 回调事件集合 格式如：{selected:function(data){ // do something }}
      callbackSet: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data: function () {
      return {
        externalActions: {},
        isModal: true,
        // 页面下方的操作按钮，通过action也可以加入一些事件，但与callbackSet不一样，actions会在modal页面中动态生成按钮
        // 在执行完该按钮绑定的事件之后，会再检查callbackSet是否有同名的方法，有的话，会执行该回调方法
        actions: {},
        isMounted: false,
        isShowContent: true,
        contentStyle: {},
        toolbar: undefined
      }
    },
    computed: {
      modal() {
        console.log('gl-modal > Index > computed modal: ', this)
        return this
      },
      content() {
        console.log('gl-modal > Index > computed modalContent: ', this.$refs.content)
        return this.$refs.content
      }
    },
    created: function () {
      console.log('gl-modal > Index> opener: ', this.modalOpener)
    },
    mounted: function () {
      this.toolbar = undefined
      this.contentStyle = {padding: '1.5em', 'overflow-y': 'auto'}
      $.extend(this.contentStyle, this.modalOpts.contentStyle)
      $(this.$el).draggable({cancel: '.ui.modal>.content'})
    },
    methods: {
      /**
       *  设置打开modal的来源组件
       *  便于后续直接调用opener的操作，例如，在gl-table中打开modal,当modal中保存并关闭窗口时，调用opener的刷新gl-table页面
       */
      setOpener(opener) {
        this.opener = opener
      },
      /**
       *  合并工具条
       *  @toolbar 工具配置
       */
      appendToolbar(toolbar) {
        this.toolbar = toolbar
        return true
      },
      /**
       * 关键窗口，并调用钩子 close
       * @param e
       */
      close: function (e) {
        let value = {}
        if (typeof this.$refs.content.getValue === 'function') {
          value = this.$refs.content.getValue()
        }
        console.log('gl-modal > Index > close > get value: ', value)
        $(this.$el).modal('hide')
        if (typeof this.callbackSet.close === 'function') {
          this.callbackSet.close(e, value)
        }
        // TODO 删除id
        return value
      },
      /**
       * 关键窗口，并调用钩子 cancel
       * @param e
       */
      cancel: function (e) {
        console.log('gl-modal > Index > cancel()')
        $(this.$el).modal('hide')
        if (typeof this.callbackSet.cancel === 'function') {
          this.callbackSet.cancel(e)
        }
        // TODO 删除id
      },
      callback: function (name, params) {
        let fn = this.callbackSet[name]
        if (!fn) {
          console.error('在modal的页面中，调用方法(' + name + ')失败，因为打开该modal时，未注册该方法，已注册的方法为：', this.callbackSet)
        } else {
          this.callbackSet[name](params)
        }
      },
      doAction: function (name, params) {
        let fn = this[name]
        if (!fn) {
          console.error('在modal的页面中，调用方法(' + name + ')失败，因为modal没有该操作按钮，当前actions为：', this.actions)
        } else {
          this[name](params)
          // 回调
          if (typeof this.callbackSet[name] === 'function') {
            this.callbackSet[name](params)
          }
        }
      },
      addAction: function ({name, title, color, fn}) {
        if (!this.checkAction(name)) {
          return
        }
        if (name === 'cancel' || name === 'cancel') {
          this.actions[name] = {
            title: title || '取消',
            color: color || 'negative'
          }
          this[name] = fn || this.cancel
        } else if (name === 'close' || name === 'close') {
          this.actions[name] = {
            title: title || '关闭',
            color: color || 'primary'
          }
          this[name] = fn || this.close
        } else {
          this.actions[name] = {
            title: title,
            color: color || 'primary'
          }
          this[name] = fn
        }
      },
      updateActions() {
        this.$forceUpdate()
      },
      checkAction: function (name) {
        if (name === 'addAction' || name === 'doAction' || name === 'removeAction') {
          console.error('{name}是内置的action管理函数，不可添加或删除！')
          return false
        }
        return true
      }
    },
    components: {}
  }
</script>
<style scoped>
  /*.page-content {*/
  /*margin-left: 0;*/
  /*}*/

  .gl-modal-actions {
    background: #f9fafb;
    padding: 1rem 1rem;
    border-top: 1px solid rgba(34, 36, 38, .15);
  }
</style>
