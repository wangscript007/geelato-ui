<template>
  <div class="ui inverted segment" :class="$gl.ui.color.primary" style="padding: 0px;margin: 0px">
    <div class="page-footer-inner" style="text-align: center" :style="{'line-height':height}"> 2017 &copy;
      geelato-backend-admin By
      <a target="_blank" href="http://www.geelato.org">geelato</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      mode: Number,
      height: String
    }
  }
</script>

<style scoped>
</style>
