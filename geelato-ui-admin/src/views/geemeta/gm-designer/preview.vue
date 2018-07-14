<!--
  通用的加载页面，实现动态路由，通过currentView切换页面，并通过opts、query传递属性及查询参数给渲染的页面
  注意：加载的页面，需存放于本page.vue所在目录下
-->
<template>
  <div class="gl-page-content-wrapper">
    <component v-bind:is="currentView" :opts="pageConfig" :query="query">
      <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        currentView: '',
        pageConfig: '',
        query: ''
      }
    },
    created: function () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.getPageConfig()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'getPageConfig'
    },
    methods: {
      getPageConfig () {
        let thisVue = this
        // 注意！！！
        // 先切换到加载页面，若无该切换，操作this.currentView会保留在真正需打开的页面上
        // 若该路由变化且this.currentView require的vue是同一个时，会导致页面不刷新，
        // 就算路由的参数如id等变化也不刷新
        thisVue.currentView = resolve => require(['../../../components/layout/loading-page.vue'], resolve)
        // 路由的格式：preview/:pageCode?query
        var pageCode = this.$route.params.pageCode
        // 如查pageCode不存在，则取当前editor中正在编辑页面进行展示 TODO
        thisVue.$gl.data.getPageConfig(pageCode).then((res) => {
          console.log('res>', res)
          if (res.code === '0') {
            if (res.data) {
              thisVue.pageConfig = res.data
              thisVue.query = this.$route.query
              // TODO 由于config中的template还是基于component
              thisVue.currentView = resolve => require(['../' + thisVue.pageConfig.ui.component + '.vue'], resolve)
            } else {
              console.error('通过pageCode：“' + this.$route.params.pageCode + '”获取不到页面配置，请确保是否已注册了该页面。')
            }
          }
        })
      }
    }
  }
</script>
<!-- 添加 'scoped' 属性，使该CSS只应用于本vue。 -->
<style>
  .gl-page-content-wrapper {

  }
</style>
