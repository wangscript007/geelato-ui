<template>
  <div id="app">
    <router-view/>
    <modal-view ref="appRootModalView"></modal-view>
  </div>
</template>

<script>
  // import 'babel-polyfill' 解决ie下运行空白的问题
  import 'babel-polyfill'
  import modalView from './components/page/modal-view.vue'

  export default {
    name: 'app',
    mounted () {
    },
    components: {modalView}
  }
</script>

<style>
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*!*text-align: center;*!*/
    /*color: #2c3e50;*/
    /*!*margin-top: 60px;*!*/
  }
</style>
