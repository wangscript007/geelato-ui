<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
  //  import utils from '../../common/utils'

  export default {
    props: {
      /**
       * item selector
       */
      item: {
        type: String,
        required: true
      },
      /**
       * index < 0 时，表示所有的item都不默认选中
       */
      index: {
        type: Number,
        required: false,
        default: function () {
          return 0
        }
      },
      active: {
        type: String,
        required: false,
        default: function () {
          return 'active'
        }
      }
    },
    data () {
      return {
        id: ''
      }
    },
    updated () {
//      this.init()
    },
    mounted: function () {
      this.init()
    },
    methods: {
      init: function () {
        let theVue = this
        let $items = $(this.$el).find(this.item)
        $items.each(function (i, domEle) {
          $(domEle).click(function (e) {
            $items.removeClass(theVue.active)
            $(e.currentTarget).addClass(theVue.active)
            theVue.$emit('selected', e.currentTarget, i)
          })
        })
        // 选中默认的item
        if ($items.length > 0 && this.index >= 0) {
          $($items[this.index]).addClass(theVue.active)
        }
      }
    },
    components: {}
  }
</script>
<style>
</style>
