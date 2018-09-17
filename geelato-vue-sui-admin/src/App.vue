<template>
    <div id="app">
        <router-view/>
        <gl-modal ref="appRootModalView"></gl-modal>
    </div>
</template>

<script>
    // import 'babel-polyfill' 解决ie下运行空白的问题
    // import 'babel-polyfill'
    export default {
        name: 'app',
        mounted() {
        },
        components: {}
    }
</script>

<style>
    @import "assets/style/main.css";
    @import "assets/style/reset.css";
</style>
