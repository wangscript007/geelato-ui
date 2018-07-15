<template>
  <div v-if="propertiesSchema" class="gl-json-indent">
    <!-- key:gender -->
    <!-- propertySchema: {'title': 'gender','type': 'String','enum': ['男','女'],'properties':{......}} -->
    <div v-for="(propertySchema,key) in propertiesSchema" class="inline field">
      <template v-if="propertySchema.type==='String'||propertySchema.type==='Number'">
        <label>
          {{key}}:
        </label>
        <!-- key:gender or name or pets... -->
        <!-- json:  {name:'张三',gender: '男',pets:[{type: '狗', name: 'hensi'},{type: '猫',name: 'kity'}]} -->
        <template v-if="propertySchema.enum">
          <select>
            <option v-for="enumItem in propertySchema.enum" :propertySchema="enumItem" :selected="enumItem===json[key]">
              {{enumItem}}
            </option>
          </select>
        </template>
        <template v-else>
          <input type="text" v-model="json[key]"/>
        </template>
      </template>
      <template v-if="propertySchema.type==='Object'">
        <gl-segment :schema="{[key]:propertySchema}" :json="{[key]:json[key]}" :options="options"
                    :is-root="false"></gl-segment>
      </template>
      <div v-if="propertySchema.type==='Array'">
        <label @click="isShowArray=!isShowArray" style="cursor: pointer">
          {{key}}:[ {{!isShowArray?'...':''}}
        </label>
        <!--propertySchema.key: pet ,key: pets-->
        <!--subValue:{pet:{type: '狗', name: 'hensi'}}-->
        <div v-if="isShowArray" v-for="(subValue,subIndex) in $_formatArray(json[key],propertySchema.key)"
             class="gl-json-indent">
          <label>
            {
          </label>
          <gl-property :propertiesSchema="propertySchema.properties" :json="subValue[propertySchema.key]"
                       :is-root="false"></gl-property>
          <label>
            }
          </label>
        </div>
        ]
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    // 设置了name，可以在当前vue中使用，实现递归
    name: 'GlProperty',
    props: {
      json: [Object, String, Number],
      propertiesSchema: Object,
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
        isShowArray: true
      }
    },
    mounted: function () {
      console.log('properties>', this.properties, 'json>', this.json)
    },
    methods: {
      /**
       *
       * @param json e.g. [{type: '狗', name: 'hensi'},{type: '猫',name: 'kity'}]
       * @param key e.g. pet
       * @returns {*} e.g. [{pet:{type: '狗', name: 'hensi'}},{pet:{type: '猫',name: 'kity'}}]
       */
      $_formatArray (json, key) {
        let result = []
        for (let index in json) {
          result.push({[key]: json[index]})
        }
        console.log('result', result)
        return result
      }
    },
    components: {
      // 由于GlSegment import了本vue组件，这里只能用动态加载的方式，否则 webpack 或 Browserify等在加载该组件时，发现互相引用，无法导入
      GlSegment: () => import('./segment.vue')
    }
  }
</script>
<style scoped>

</style>
