<template>
  <div class="gl-page-content-wrapper">
    <h2 class="ui header">
      {{title}}
      <div class="sub header">
        {{description}}
      </div>
    </h2>

    <div class="ui dividing header"></div>

  </div>
</template>
<script>

  export default {
    props: {},
    data() {
      return {
        title: 'components name',
        description: 'components description'
      }
    },
    watch: {
      '$route': function (val, oval) {
        this.title = this.$route.query.components
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {}
  }
</script>
<style scoped>
</style>
