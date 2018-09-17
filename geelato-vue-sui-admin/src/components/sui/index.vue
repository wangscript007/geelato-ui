<template>
  <!--<div class="sui"></div>-->
  <div>
    <slot></slot>
  </div>
</template>
<script>
  //  import utils from '../../common/utils'
  export default {
    props: {
      type: {
        type: String,
        required: true
      },
      /**
       * 若未设置，则默认选择slot的内容
       */
      selector: {
        type: String,
        required: false
      },
      /**
       * 对于checkbox有值，其它类型值为undefined
       */
      value: [String, Number, Object, Array, Boolean],
      opts: {
        type: Object,
        required: false,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        id: '',
        val: undefined,
        sui: {}
      }
    },
    updated () {
      // TODO 待观察是否需要this.$_init()，目前启用该方法时，因handleValue会重复执行
      // this.$_init()
    },
    mounted: function () {
      this.$_init()
    },
    methods: {
      $_init: function () {
        let valueApis = {
          checkbox: {valueExp: 'is checked', onChange: 'onChange'},
          dropdown: {valueExp: 'get value', onChange: 'onChange'},
          progress: {valueExp: 'get value', onChange: 'onChange'},
          rating: {valueExp: 'get rating', onChange: 'onRate'}
        }
        let theVue = this
        if (theVue.selector) {
          theVue.sui = $(theVue.$el).find(theVue.selector)[theVue.type](theVue.opts)
        } else {
          theVue.sui = $(theVue.$el.childNodes)[theVue.type](theVue.opts)
        }
        let valueApi = valueApis[theVue.type]
        if (valueApi) {
          // 初始化值
          handleValue()
          // 设置更改事件
          let opts = {}
          opts[valueApi['onChange']] = handleValue
          theVue.sui[theVue.type](opts)
        }

        function handleValue (val, oval) {
          theVue.val = theVue.sui[theVue.type](valueApi.valueExp)
          console.log(theVue.type, 'theVue.value:', theVue.value, 'theVue.val:', theVue.val, 'val:', val, 'oval:', oval)
          theVue.$emit('input', theVue.val)
        }
      }
    },
    components: {}
  }
</script>
<style>
</style>
