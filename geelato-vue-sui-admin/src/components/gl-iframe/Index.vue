<template>
  <div style="height: 100%;width: 100%">
    <iframe :src="href?href:opts.href" frameborder="0" :style="style">
    </iframe>
    <!--<resize-observer @notify="resize"/>-->
  </div>
</template>
<script>
  export default {
    props: {
      // 模式一 opts:{href:xx}，一般用于在modalView打开本vue时，使用
      opts: {
        type: Object,
        default: function () {
          return {
            href: ''
          }
        }
      },
      // 模式二 无opts
      href: {
        type: String
      },
      // height: {
      //   type: [String, Number]
      // },
      // 打开本组件的来源组件
      opener: {
        type: Object,
        required: false
      },
      // 通过modal窗口打开该页面时，可获取到该窗口的引用
      modal: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        style: {
          margin: 0,
          padding: 0,
          width: '100%'
        }
      }
    },
    computed: {},
    mounted: function () {
      this.resize()
    },
    watch: {},
    methods: {
      resize() {
        this.$set(this.style, 'height', (this.$el.parentNode.clientHeight) + 'px')
      }
    }
  }
</script>
<!-- 添加 'scoped' 属性，使该CSS只应用于本vue。 -->
<style>
</style>
