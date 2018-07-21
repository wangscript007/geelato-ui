<template>
  <div v-if="schema" class="ui small gl-json form">
    <!--<div style="margin-left: 1em">-->
    <!--<template v-if="isRoot">[{</template>-->

    <!--<template v-if="isRoot">}]</template>-->
    <!--</div>-->
    <json-entity :schema="schema" :json="json" :options="options">
    </json-entity>

  </div>
</template>

<script>
  import JsonEntity from './entity'

  export default {
    props: {
      json: [Array, Object],
      schema: Object,
      options: Object
    },
    data () {
      return {
        isRoot: {
          type: Boolean,
          default: function () {
            return true
          }
        },
        isArray: {
          type: Boolean,
          default: function () {
            return true
          }
        }
      }
    },
    mounted: function () {
    },
    methods: {},
    components: {JsonEntity}
  }
</script>
<style scoped>

</style>
