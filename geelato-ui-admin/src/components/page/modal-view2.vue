<template>
  <div id="app-root-modal" class="ui fullscreen modal hide">
    <i class="close icon"></i>
    <div class="ui header" v-html="modalOpts?modalOpts.title:''">
    </div>
    <div class="scrolling content">
      <!--在component内的vue中，调用$emit('callModal', {fnName: paramObject})，以触发$_invokeCallbackSet-->
      <component :componentUpdated="isMounted=true" :is="modalBody" :opts="modalOpts.opts" @callModal="$_invokeCallbackSet">
        正在加载...
      </component>
    </div>
    <div class="actions" style="text-align: center">
      <!--<div class="ui mini button" :class="$gl.ui.color.primary" @click="$_save">保存</div>-->
      <!--<div class="ui mini button" :class="$gl.ui.color.negative" @click="$_cancel">取消</div>-->
      <div v-for="(item,key) in actions" class="ui mini button" :class="$gl.ui.color[item.color]"
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
       * @param e {内置事件1:数据，内置事件2：数据，自定义事件名1:数据1，自定义事件名2:数据2}，内置事件如：{close:{}},自定义事件如：{selected:{id:'xx',name,'张三',age:13}}
       */
      $_invokeCallbackSet: function (e) {
        let thisVue = this
        if (this.callbackSet) {
          if (typeof e === 'object') {
            for (var eventName in e) {
              // 若自定义的事件与内置事件重名，则取自定义的事件
              var fn = thisVue.callbackSet[eventName] || thisVue['$_' + eventName]
              if (fn) {
                let params = e[eventName]
                let nextFun = fn(params)
                // 若返回modal内置的事件，则为作事件链执行
                if (nextFun === 'close') {
                  this.$_close()
                }
              } else {
                console.error('不存在函数：' + eventName + '，未能在modal中执行回调。')
              }
            }
          }
        }
//        console.log('modal callback event>', e)
//        if (this.onSelected && typeof this.onSelected === 'function') {
//          this.onSelected(data)
//        }
//        this.$emit('selected', data)
      },
      $_close: function () {
        $('#app-root-modal').modal('hide')
      },
      $_doAction: function (name) {
//        console.log('this', this)
//        console.log('actionName', name)
        this[name]()
      },
//      $_removeAction: function (name) {
//        if (!this.$_checkAction(name)) {
//          return
//        }
//        delete this.actions[name]
//        delete this[name]
//      },
      $_addAction: function ({name, title, color, fn}) {
        if (!this.$_checkAction(name)) {
          return
        }
        this.actions[name] = {title: title, color: color || (name === '$_cancel' ? 'negative' : 'primary')}
        this[name] = fn
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
