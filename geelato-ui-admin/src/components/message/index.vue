<template>
  <div class="ui icon message" :class="type">
    <i class="info icon"></i>
    <i class="close icon"></i>
    <div class="content">
      <div class="header">
        {{header}}
      </div>
      <p>{{text}}
      <slot></slot>
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'info'
      },
      header: {
        type: String
      },
      text: {
        type: String
      }
    },
    data () {
      return {
        theme: this.$GL.ui.color.primary
      }
    },
    mounted () {
      this.$_initUi()
    },
    updated () {
    },
    methods: {
      $_initUi () {
        $(this.$el).find('.close').on('click', function () {
          $(this).closest('.message').transition('fade')
        })
      }
    },
    components: {}
  }
</script>
<style scoped>
</style>
