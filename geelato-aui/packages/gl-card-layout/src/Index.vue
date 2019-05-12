<template>
  <div>
    <gl-card-layout-item :rows="layout.rows" :cardMap="cardMap"></gl-card-layout-item>
  </div>
</template>

<script>
  import GlCardLayoutItem from './Item'

  export default {
    name: "gl-card-layout",
    components: {GlCardLayoutItem},
    props: {
      cardMap: {
        type: Object,
        required: true
      },
      layout: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        // cards: this.opts.cards,
      }
    }
  }
</script>

<style scoped>

</style>
