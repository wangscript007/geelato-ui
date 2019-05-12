<template>
  <!--<div id="app">-->
  <!--&lt;!&ndash;<img alt="Vue logo" src="./assets/logo.png">&ndash;&gt;-->
  <!--&lt;!&ndash;<HelloWorld msg="Welcome to Your Vue.js App"/>&ndash;&gt;-->
  <!--<gl-form-example></gl-form-example>-->
  <!--</div>-->
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  // import GlFormExample from './views/form/gl-form/Example.vue'
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

  export default {
    name: 'app',
    components: {
      // GlFormExample
    },
    data() {
      return {
        locale: zhCN
      }
    }
  }
</script>

<style>
  #app {
    height: 100%;
  }

  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*}*/
</style>
