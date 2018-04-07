<template>
  <!--<div class="field">-->
  <!--<label>{{opts.type=='radio'?'单选':'多选'}}</label>-->
  <div :class="opts.display||'inline'">
    <template v-if="opts.type=='radio'">
      <div class="ui radio checkbox" v-for="(item,index) in opts.data">
        <input type="radio" :name="opts.name" class="hidden" :value="item.value">
        <label>{{item.text}}</label>
      </div>
    </template>
    <template v-else>
      <div class="ui checkbox" v-for="(item,index) in opts.data">
        <input type="checkbox" :name="opts.name" class="hidden" :value="item.value">
        <label>{{item.text}}</label>
      </div>
    </template>
  </div>
  <!--</div>-->
</template>
<script>
  import utils from '../../common/utils'

  export default {
    props: {
      opts: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        id: ''
      }
    },
    updated () {
      this.$_init()
    },
    mounted: function () {
      this.id = utils.uuid(8)
      this.$_init()
    },
    methods: {
      $_init: function () {
        $(this.$el).find('.ui.checkbox').checkbox()
      }
//      checkbox: $(this.$el).find('.ui.checkbox').checkbox
    },
    components: {}
  }
</script>
<style>
</style>
