<template>
  <div id="app-root-modal" class="ui fullscreen modal hide">
    <i class="close icon"></i>
    <div class="header" v-html="modalOpts?modalOpts.title:''">
    </div>
    <div class="scrolling content">
      <!--在component内的vue中，调用$emit('callModal', {fnName: paramObject})，以触发$_invokeCallbackSet-->
      <component :componentUpdated="isMounted=true" :is="modalBody" :opts="modalOpts.opts">
        正在加载...
      </component>
    </div>
    <div class="actions" style="text-align: center">
      <!--<div class="ui mini button" :class="$GL.ui.color.primary" @click="$_save">保存</div>-->
      <!--<div class="ui mini button" :class="$GL.ui.color.negative" @click="$_cancel">取消</div>-->
      <div v-for="(item,key) in actions" class="ui mini button" :class="$GL.ui.color[item.color]"
           @click="$_doAction(key)">
        {{item.title}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {},
    data: function () {
      return {
//        modalHeader:  {title: ''},
        modalBody: null,
//        modalFooter: null,
        modalOpts: {title: '', actions: []},
        // 回调事件集合 格式如：{selected:function(data){ // do something }}
        callbackSet: {},
        // 页面下方的操作按钮
        actions: {},
        isMounted: false
      }
    },
    created: function () {
      this.actions = {
//        $_save: {title: '保存', color: 'primary'},
//        $_cancel: {title: '取消', color: 'negative'}
      }
    },
    mounted: function () {
    },
    methods: {
      /**
       * 关键窗口，并调用钩子 close
       * @param e
       */
      $_close: function (e) {
        $('#app-root-modal').modal('hide')
        if (typeof this.callbackSet.close === 'function') {
          this.callbackSet.close(e)
        }
      },
      /**
       * 关键窗口，并调用钩子 cancel
       * @param e
       */
      $_cancel: function (e) {
        $('#app-root-modal').modal('hide')
        if (typeof this.callbackSet.cancel === 'function') {
          this.callbackSet.cancel(e)
        }
      },
      $_doAction: function (name) {
        this[name]()
      },
      $_addAction: function ({name, title, color, fn}) {
        if (!this.$_checkAction(name)) {
          return
        }
        if (name === '$_cancel' || name === 'cancel') {
          this.actions[name] = {
            title: title || '取消',
            color: color || 'negative'
          }
          this[name] = fn || this.$_cancel
        } else if (name === '$_close' || name === 'close') {
          this.actions[name] = {
            title: title || '关闭',
            color: color || 'primary'
          }
          this[name] = fn || this.$_close
        } else {
          this.actions[name] = {
            title: title,
            color: color || 'primary'
          }
          this[name] = fn
        }
      },
      $_updateActions () {
        this.$forceUpdate()
      },
      $_checkAction: function (name) {
        if (name === '$_addAction' || name === '$_doAction' || name === '$_removeAction') {
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
  .page-content {
    margin-left: 0;
  }
</style>
