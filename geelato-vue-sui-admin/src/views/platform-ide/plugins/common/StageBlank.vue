<template>
  <div :style="{height:editorMainHeight}">加载中...</div>
</template>
<script>
  export default {
    props: {
      editorStore: {
        type: Object
      },
      editorMainHeight: {
        type: String,
        defalut: function () {
          return '480px'
        }
      }
    },
    data () {
      return {
        editor: {}
      }
    },
    watch: {
      'editingPage.id': function (val, oval) {
      }
    },
    mounted: function () {
      this.$_init()
    },
    methods: {
      $_init () {
      },
      $_setValue (contentString = '') {
      },
      $_commit () {
        return {code: 0, msg: ''}
      }
    },
    components: {}
  }
</script>
<style>
</style>

