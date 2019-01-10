<!--
  工具条
 -->
<template>
  <h2 class="ui aligned header" :class="clazz">
    <template v-for="(action, index) in actions">
      <!--有hidden属性，或hidden为空-->
      <button class="ui mini button" :class="action.color?$gl.ui.color[action.color]:$gl.ui.color.primary"
              @click="$_click(action,$event)"
              v-if="!action.hasOwnProperty('hidden')||$utils.isEmpty(action.hidden)||$utils.eval(action.hidden)">
        {{action.title}}
      </button>&nbsp;
    </template>
  </h2>
</template>
<script>

  import ActionHandler from './ActionHandler'

  export default {
    props: {
      /**
       *  本工具条的actions是否可以合并到父组件的工具条中
       *  默认为 false
       */
      appendToParent: {
        type: Boolean,
        required: false,
        default() {
          return false
        }
      },
      actions: {
        type: Array,
        required: false
      },
      css: {
        type: Object,
        required: false,
        default() {
          return {
            aligned: 'center', // left|right|center
            dividing: true
          }
        }
      }
    },
    data() {
      return {
        clazz: {
          left: this.css.aligned === 'left',
          right: this.css.aligned === 'right',
          center: this.css.aligned === 'center',
          dividing: this.css.dividing
        }
      }
    },
    mounted: function () {
    },
    methods: {
      $_click(action, $event) {
        let actionHandler = new ActionHandler(this.$gl)
        actionHandler.do(action)
      }
    },
    components: {}
  }
</script>
<style scoped>
</style>
