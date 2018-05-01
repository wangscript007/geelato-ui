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
      selector: {
        type: String,
        required: false
      },
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
        sui: {}
      }
    },
    updated () {
      this.$_init()
    },
    mounted: function () {
      this.$_init()
    },
    methods: {
      $_init: function () {
        let theVue = this
        this.sui = $(this.$el).find(this.selector)[theVue.type](theVue.opts)
//        console.log('sui>', theVue.sui)
      }
    },
    components: {}
  }
</script>
<style>
</style>
