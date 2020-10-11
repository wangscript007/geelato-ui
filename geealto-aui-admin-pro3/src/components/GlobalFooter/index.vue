<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <!--<a href="https://www.github.com/geelato/pro-layout" target="_blank">Pro Layout</a>-->
      <!--<a href="https://www.github.com/geelato/geelato-pro" target="_blank">Github</a>-->
      <a href="https://www.github.com/geelato/" target="_blank">@geelato</a>
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/geelato-projects" target="_blank">geelato</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
