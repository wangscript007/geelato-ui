<template>
  <div v-if="propertiesSchema" class="gl-json-indent">
    <!-- key:gender -->
    <!-- propertySchema: {'title': 'gender','type': 'String','enum': ['男','女'],'properties':{......}} -->
    <div v-for="(propertySchema,key) in propertiesSchema" class="inline field">
      <template v-if="propertySchema.type==='String'||propertySchema.type==='Number'||propertySchema.type==='Boolean'">
        <label :title="propertySchema.title">
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
        <template v-else-if="propertySchema.type==='Boolean'">
          <input type="checkbox" v-model="json[key]"/>
        </template>
        <template v-else>
          <input type="text" v-model="json[key]" style="min-width: 30em"/>
        </template>
      </template>
      <template v-if="propertySchema.type==='Object'">
        <gl-segment :schema="{[key]:propertySchema}" :json="{[key]:json[key]}" :options="options"
                    :is-root="false"></gl-segment>
      </template>
      <div v-if="propertySchema.type==='Array'">
        <label @mouseenter="hoverArray=key" @mouseleave="hoverArray=''">
          <i class="compress icon" :class="$gl.ui.color.primary" v-if="isShowArray&&hoverArray===key"
             @click="isShowArray=!isShowArray" title="收缩" style="cursor: pointer"></i>
          <i class="expand icon" :class="$gl.ui.color.primary" v-if="!isShowArray&&hoverArray===key"
             @click="isShowArray=!isShowArray" title="展开" style="cursor: pointer"></i>
          <i class="plus square icon" :class="$gl.ui.color.primary" v-if="hoverArray===key"
             @click="$_addDataItem($event,propertySchema)" title="添加子元素" style="cursor: pointer"></i>
          <i class="window close red icon" style="cursor: pointer" v-if="hoverArray===key"
             @click="$_deleteAllDataItem(json[key])" title="删除所有子元素"></i>
          {{key}}:[ {{!isShowArray?'...':''}}
        </label>
        <!--propertySchema.key: pet ,key: pets-->
        <!--subValue:{pet:{type: '狗', name: 'hensi'}}-->
        <div v-show="isShowArray" v-for="(subValue,subIndex) in $_formatArray(json[key],propertySchema.key)"
             class="gl-json-indent" @mouseenter="hoverIndex=subIndex" @mouseleave="hoverIndex=-1">
          <label>
            <i class="angle double up icon" :class="$gl.ui.color.primary"
               v-if="hoverIndex===subIndex&&dataItems.length>0&&subIndex>0"
               @click="$utils.moveup(dataItems,subIndex)" title="向上移动" style="cursor: pointer"></i>
            <i class="angle double down icon" :class="$gl.ui.color.primary"
               v-if="hoverIndex===subIndex&&dataItems.length>0&&subIndex<dataItems.length-1"
               @click="$utils.movedown(dataItems,subIndex)" title="向下移动" style="cursor: pointer"></i>
            <i class="window close red icon" style="cursor: pointer"
               v-if="hoverIndex===subIndex"
               @click="$_deleteDataItem(json[key],subIndex)" title="删除该元素"></i>{
          </label>
          <gl-property :propertiesSchema="propertySchema.properties" :json="subValue"
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
      options: Object,
      popupOpts: Object
    },
    data () {
      return {
        isRoot: {
          type: Boolean,
          default: function () {
            return true
          }
        },
        isShowArray: true,
        dataItems: [],
        hoverIndex: -1,
        hoverArray: ''
      }
    },
    mounted: function () {
      // console.log('properties>', this.properties, 'json>', this.json)
    },
    methods: {
      /**
       *
       * @param json e.g. [{type: '狗', name: 'hensi'},{type: '猫',name: 'kity'}]
       * @param key e.g. pet
       * @returns {*} e.g. [{pet:{type: '狗', name: 'hensi'}},{pet:{type: '猫',name: 'kity'}}]
       */
      $_formatArray (json, key) {
        // if (this.dataItems.length > 0) {
        //   return this.dataItems狗
        // }
        // for (let index in json) {
        //   this.dataItems.push(json[index])
        // }
        // console.log('result', this.dataItems)
        this.dataItems = json || []
        return this.dataItems
      },
      /**
       * 为数组添加子项数据
       */
      $_addDataItem ($event, propertySchema) {
        this.$utils.stopPropagationAndPreventDefault($event)
        // console.log('$event>', $event, 'propertySchema>', propertySchema, 'dataItems>', this.dataItems)
        // Todo，属性为对像的情况
        let dateItem = {}
        for (var key in propertySchema.properties) {
          let property = propertySchema.properties[key]
          dateItem[key] = property.default || ''
        }
        // this.dataItems.push({[propertySchema.key]: dateItem})
        this.dataItems.push(dateItem)
        return this.dataItems
      },
      /**
       * @param json 原始数据，dataItems是加工后的数据
       * @param index
       */
      $_deleteDataItem (json, index) {
        console.log('json>', json)
        if (this.dataItems && this.dataItems.length > 0) {
          this.dataItems.splice(index, 1)
          json.splice(index, 1)
        }
      },
      $_deleteAllDataItem (json) {
        if (json.length > 0) {
          this.dataItems.splice(0, json.length)
          json.splice(0, json.length)
        }
      }
    },
    components: {
      // 由于GlSegment import了本vue组件，这里只能用动态加载的方式，否则 webpack 或 Browserify等在加载该组件时，发现互相引用，无法导入
      GlSegment: () => import('./entity.vue')
    }
  }
</script>
<style scoped>

</style>
