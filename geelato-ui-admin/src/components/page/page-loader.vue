<!--
  通用的加载页面，实现动态路由，通过currentView切换页面，并通过opts、query传递属性及查询参数给渲染的页面
  注意：加载的页面，需存放于本page.vue所在目录下
-->
<template>
  <component :is="currentView" :opts="pageCfg.opts" :query="queryString">
    <!-- 组件在 vm.currentview 变化时改变！ -->
  </component>
</template>
<script>
  export default {
    props: {
      code: {
        type: String,
        require: true
      },
      query: {
        type: Object,
        require: true
      }
    },
    data () {
      return {
        currentView: '',
        pageCfg: '',
        queryString: ''
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
        thisVue.currentView = resolve => require(['../layout/loading-page.vue'], resolve)
        // 路由的格式：page/:moduleName/:pageCode?query
        thisVue.$GL.data.getPageCfg(thisVue.code).then((res) => {
          console.log('res>', res)
          if (res.code === '0') {
            console.log('thisVue.pageCfg.component>', thisVue.pageCfg.component)
            if (res.data) {
              thisVue.pageCfg = res.data
              thisVue.queryString = thisVue.query
              if (typeof thisVue.pageCfg.component === 'string') {
                if (thisVue.pageCfg.component.startsWith('/')) {
                  // 注意require的写法，这里写成'../'而不是'..'，后者会异常，这与require的加载机制有关
                  thisVue.currentView = resolve => require(['../../' + thisVue.pageCfg.component.substring(1) + '.vue'], resolve)
                } else {
                  console.error('暂不支持的格式thisVue.pageCfg.component>', thisVue.pageCfg.component)
                }
              } else {
                console.error('暂不支持的格式thisVue.pageCfg.component>', thisVue.pageCfg.component)
              }
            } else {
              console.error('通过pageCode：“' + this.$route.params.pageCode + '”获取不到页面配置，请确保是否已注册了该页面。')
            }
          } else {
            console.error('返回状态码code不为0。当前返回结果：', res)
          }
        })
      }
    }
  }
</script>
<!-- 添加 'scoped' 属性，使该CSS只应用于本vue。 -->
<style>
</style>
