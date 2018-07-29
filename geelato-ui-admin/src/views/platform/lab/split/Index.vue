<template>
  <div>
    <div class="ui header">
      vue-multipane
    </div>
    <div class="description">
      在拖动右边时，存在左边一起变动的问题
    </div>
    <multipane></multipane>
    <div class="ui header">
      splitJS
    </div>
    <split-js></split-js>
    <div class="description">
      在使用时，注意需设置高度，否则无法拖动
    </div>
  </div>
</template>

<script>
  import Multipane from './Multipane'
  import SplitJs from './SplitJs'

  export default {
    components: {Multipane, SplitJs}
  }
</script>

<style>

</style>
