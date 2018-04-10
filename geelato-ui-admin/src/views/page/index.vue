<!--
  通用的加载页面，实现动态路由，通过currentView切换页面，并通过opts、query传递属性及查询参数给渲染的页面
  注意：加载的页面，需存放于本page.vue所在目录下
-->
<template>
  <div class="gl-page-content-wrapper">
    <page-loader :code="code" :query="query"></page-loader>
  </div>
</template>
<script>
  import PageLoader from '../../components/page/page-loader.vue'

  export default {
    data () {
      return {
        code: '',
        query: ''
      }
    },
    created: function () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.$_updatePage()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': '$_updatePage'
    },
    methods: {
      $_updatePage () {
        this.code = this.$route.params.pageCode
        this.query = this.$route.query
      }
    },
    components: {PageLoader}
  }
</script>
<style>
</style>
