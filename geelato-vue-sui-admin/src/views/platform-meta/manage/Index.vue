<template>
  <div class="gl-page-content-wrapper">
    <gl-form-combination :opts="config.opts" :query="{}" ref="glFromCombination"></gl-form-combination>
    <!--<button @click="$refs.glFromCombination.save()">保存</button>-->
  </div>
</template>

<script>
  import page from './page.js'

  export default {
    name: "Index",
    data() {
      return {
        config: page
      }
    }
  }
</script>

<style scoped>

</style>

