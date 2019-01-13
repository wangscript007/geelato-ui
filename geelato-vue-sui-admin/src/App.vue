<template>
  <div id="app">
    <router-view/>
    <!--<div id="appModals"></div>-->
    <!--<gl-modal ref="appRootModalView" :opener="opener"></gl-modal>-->
  </div>
</template>

<script>
  // import 'babel-polyfill' 解决ie下运行空白的问题
  // import 'babel-polyfill'
  export default {
    name: 'app',
    data() {
      return {opener: undefined}
    },
    mounted() {
    },
    components: {}
  }
</script>

<style>
  @import "assets/style/main.css";
  @import "assets/style/reset.css";
</style>
