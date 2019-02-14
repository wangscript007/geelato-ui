<template>
  <div class="gl-page-content-wrapper">
    <gl-page-loader :opts="opts" :code="$route.query.p" :query="$route.query" ref="pageLoader"></gl-page-loader>
  </div>
</template>

<script>
  export default {
    name: "PageLoader",
    data() {
      return {
        query: {},
        opts: {}
      }
    },
    computed: {
      code: function () {
        return this.$route.query.p
      },
      queryInfo: function () {
        return this.$route.query
      }
    }
    // watch: {
    //   // 如果路由有变化，会再次执行该方法
    //   '$route': 'update'
    // },
    // mounted() {
    //   this.update()
    // },
    // methods: {
    //   update() {
    //     console.log('ui > PageLoader > $route: ', this.$route)
    //     console.log('ui > PageLoader > query: ', this.query)
    //   }
    // }

  }
</script>

<style scoped>

</style>
