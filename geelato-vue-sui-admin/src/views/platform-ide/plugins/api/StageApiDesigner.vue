<template>
  <div class="gl-page-content-wrapper">
    vvvv
  </div>
</template>
<script>
  export default {
    props: {
      editorStore: {
        type: Object,
        required: true
      },
      editorMainHeight: {
        type: String,
        default: function () {
          return '480px'
        }
      }
    },
    data() {
      return {
      }
    },
    watch: {
      'editorStore.editingPage.id': function (val, oldVal) {
        // 若未有page信息，则返回
        if (!val) {
          return
        }
        console.log('editorStore.editingPage.id> val:', val, 'oldVal:', oldVal)
        // 重置为未启用
        this.$_init()
      }
    },
    created: function () {
      // 组件创建完后获取数据，
    },
    mounted: function () {
      this.$_init()
      // this.$forceUpdate()
    },
    methods: {
      $_init() {
        let thisVue = this
      },
      $_focus() {
      },
      $_reset() {
      },
      $_setValue(contentString = '') {
      },
      $_commit() {
        return {code: 0, msg: ''}
      }
    },
    components: {}
  }
</script>
<style>
</style>
