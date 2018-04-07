<template>
  <div class="ui padded grid">
    项目总体视图
  </div>
</template>
<script>
  import Message from '../../../components/message/index.vue'
  import testData from '../../../mock/project-metro/index'

  export default {
    props: {
      opts: {
        type: Object,
        default: function () {
          return {data: {}}
        }
      }
    },
    data () {
      return {
        theme: this.$GL.ui.theme.color.primary,
        lines: testData.metroLine,
        segments: []
      }
    },
    mounted: function () {
    },
    methods: {
      $_changeLine (line) {
        console.log(line)
        this.segments = line.segments
      }
    },
    components: {Message}
  }
</script>
<style scoped>
  .ui.mini.button {
    margin: 0.5em;
  }
</style>
