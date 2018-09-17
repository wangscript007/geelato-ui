<template>
  <table class="ui mini form gl-form">
    <tr>
      <td>昵称</td>
      <input type="text">
    </tr>
    <tr>
      <td>账号</td>
      <input type="text">
    </tr>
    <tr>
      <td colspan="2" style="text-align: center">
        <button class="ui mini button" :class="$gl.ui.color.primary">保存</button>
      </td>
    </tr>
  </table>
</template>
<script>
  export default {
    props: {},
    data () {
      return {}
    },
    mounted: function () {
    },
    methods: {},
    components: {}
  }
</script>
<style>
</style>
