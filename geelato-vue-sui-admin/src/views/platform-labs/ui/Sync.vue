<template>
  <div>
    <settings-guide-modal v-bind.sync="modal">
    </settings-guide-modal>
    <div class="ui info message">
      title:{{modal.title}}<br>
      type:{{modal.type}}<br>
      value:{{modal.value}}<br>
      opts:{{modal.opts}}<br>
      query:{{modal.query}}<br>
    </div>
  </div>
</template>
<script>
  import SettingsGuideModal from '../../platform-ide/plugins/table/SettingsGuideModal.vue'

  export default {
    props: {},
    data() {
      return {
        modal: {
          title: '标题',
          type: 'page',
          value: '/views/xx.vue',
          opts: {},
          query: {}
        }
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {SettingsGuideModal}
  }
</script>
<style scoped>
</style>
