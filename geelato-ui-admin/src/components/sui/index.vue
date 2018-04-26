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
        id: ''
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
//        theVue.exclusive = true
        console.log()
        $(this.$el).find(this.selector)[theVue.type](theVue.opts)
      }
    },
    components: {}
  }
</script>
<style>
</style>
