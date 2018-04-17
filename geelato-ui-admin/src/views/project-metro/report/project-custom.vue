<template>
  <div class="ui padded grid">
    其它定制报表
  </div>
</template>
<script>
  import Message from '../../../components/message/index.vue'
  import Sui from '../../../components/sui/index.vue'
  import testData from '../../../mock/project/project-metro/index'

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
        lines: testData.projectGroups,
        projects: []
      }
    },
    mounted: function () {
    },
    methods: {
      $_changeLine (line) {
        console.log(line)
        this.projects = line.projects
      }
    },
    components: {Message, Sui}
  }
</script>
<style scoped>
  .ui.mini.button {
    margin: 0.5em;
  }
</style>
