<template>
  <table class="ui mini form gl-form">
    <tr>
      <td>原密码</td>
      <input type="text">
    </tr>
    <tr>
      <td>新密码</td>
      <input type="text">
    </tr>
    <tr>
      <td>确认密码</td>
      <input type="text">
    </tr>
    <tr>
      <td colspan="2" style="text-align: center">
        <button class="ui mini primary button" :class="$GL.ui.theme.color.primary">保存</button>
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
