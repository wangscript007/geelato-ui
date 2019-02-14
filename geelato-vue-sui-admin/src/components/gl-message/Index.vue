<template>
  <div class="ui icon info message segment">
    <i class="info icon"></i>
    <i class="close icon" v-if="closable"></i>
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
      header: {
        type: String
      },
      text: {
        type: String
      },
      closable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
      }
    },
    mounted() {
      this.initUi()
    },
    updated() {
    },
    methods: {
      initUi() {
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
