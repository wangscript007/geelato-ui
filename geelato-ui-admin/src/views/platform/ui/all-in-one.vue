<template>
  <div class="ui padded grid">
    <sui type="checkbox" selector=".ui.checkbox">
      <div class="ui checkbox">
        <input id="example-id" type="checkbox">
        <label for="example-id">Label</label>
      </div>
    </sui>
    <sui type="tab" selector=".menu .item">
      <div class="ui top attached tabular pointing secondary  menu">
        <a class="active item" data-tab="first">First</a>
        <a class="item" data-tab="second">Second</a>
        <a class="item" data-tab="third">Third</a>
      </div>
      <div class="ui bottom attached active tab segment" data-tab="first">
        First
      </div>
      <div class="ui bottom attached tab segment" data-tab="second">
        Second
      </div>
      <div class="ui bottom attached tab segment" data-tab="third">
        Third
      </div>
    </sui>
  </div>
</template>
<script>
  import Sui from '../../../components/sui/index.vue'

  export default {
    props: {},
    data () {
      return {
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {Sui}
  }
</script>
<style scoped>
  .ui.mini.button {
    margin: 0.5em;
  }
</style>
