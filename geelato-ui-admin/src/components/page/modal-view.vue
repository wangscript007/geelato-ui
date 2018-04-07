<template>
  <div id="app-root-modal" class="ui modal hide">
    <div class="ui header" v-html="modalOpts?modalOpts.title:''">
    </div>
    <div class="scrolling content">
      <!--在component内的vue中，调用$emit('callback', {fnName: paramObject})，以触发$_invokeCallbackSet-->
      <component :is="modalBody" :opts="modalOpts" @callback="$_invokeCallbackSet">
      </component>
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
        callbackSet: {}
      }
    },
    created: function () {
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
        console.log('modal callback event>', e)
//        if (this.onSelected && typeof this.onSelected === 'function') {
//          this.onSelected(data)
//        }
//        this.$emit('selected', data)
      },
      $_close: function () {
        $('#app-root-modal').modal('hide')
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
