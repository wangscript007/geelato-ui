<template>
  <div v-if="schema">
    <template v-if="isRoot">
      {{$_isArray(json)?'[':'{'}}
    </template>
    <div v-for="(item,key,index) in schema" class="inline field" :class="{'gl-json-indent':isRoot}">
      <template v-for="(value,index) in $_wrapToArray(json)">
        <label @click="isShowObject=!isShowObject" style="cursor: pointer">
          {{key}}:{ {{isShowObject?'':'...'}}
        </label>
        <gl-property v-if="isShowObject" :propertiesSchema="item.properties" :json="value[key]"
                     :is-root="false"></gl-property>
        }
      </template>
    </div>
    <template v-if="isRoot">
      {{$_isArray(json)?']':'}'}}
    </template>
  </div>
</template>
<script>
  import GlProperty from './property'

  export default {
    props: {
      json: [Array, Object],
      schema: Object,
      options: Object,
      isRoot: {
        type: Boolean,
        default: function () {
          return true
        }
      }
    },
    data () {
      return {
        isShowObject: true
      }
    },
    mounted: function () {
      console.log('schema>', this.schema, 'json>', this.json)
    },
    methods: {
      /**
       * 若是{}，转返回[{}]，若为[],则直接返回
       * @param json
       * @returns {*}
       */
      $_wrapToArray (json) {
        if (this.$_isArray(json)) {
          return json
        } else {
          return [json]
        }
      },
      $_isArray (json) {
        if (typeof json === 'object' && 'length' in json) {
          return true
        }
        return false
      }
    },
    components: {GlProperty}
  }
</script>
<style scoped>

</style>
