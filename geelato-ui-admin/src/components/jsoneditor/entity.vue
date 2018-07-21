<template>
  <div v-if="schema">
    <template v-if="isRoot">
      {{$_isArray(json)?'[':'{'}}
    </template>
    <!--key: person-->
    <div v-for="(schemaItem,key,index) in schema" class="inline field" :class="{'gl-json-indent':isRoot}">
      <template v-for="(dataItem,dataIndex) in $_wrapToArray(json)">
        <label @mouseenter="hoverObject=dataIndex" @mouseleave="hoverObject=''">
          <!--<i class="plus square icon" :class="$gl.ui.color.primary"-->
          <!--v-if="hoverIndex===subIndex" @click="$_addDataItem(dataItem[key])"></i>-->
          <i class="compress icon" :class="$gl.ui.color.primary"
             v-if="!isNotShowObject[dataIndex]&&hoverObject===dataIndex"
             @click="isNotShowObject[dataIndex]=!isNotShowObject[dataIndex];clickSeq++" title="收缩"
             style="cursor: pointer"></i>
          <i class="expand icon" :class="$gl.ui.color.primary"
             v-if="isNotShowObject[dataIndex]&&hoverObject===dataIndex"
             @click="isNotShowObject[dataIndex]=!isNotShowObject[dataIndex];clickSeq++" title="展开"
             style="cursor: pointer"></i>
          <i class="angle double up icon" :class="$gl.ui.color.primary"
             v-if="isNotShowObject[dataIndex]&&hoverObject===dataIndex&&dataItems.length>0&&dataIndex>0"
             @click="$utils.moveup(dataItems,dataIndex)" title="向上移动" style="cursor: pointer"></i>
          <i class="angle double down icon" :class="$gl.ui.color.primary"
             v-if="isNotShowObject[dataIndex]&&hoverObject===dataIndex&&dataItems.length>0&&dataIndex<dataItems.length-1"
             @click="$utils.movedown(dataItems,dataIndex)" title="向下移动" style="cursor: pointer"></i>
          <!--对象开始-->
          {
          <span @click="isNotShowObject[dataIndex]=!isNotShowObject[dataIndex];clickSeq++" title="展开"
                style="cursor: pointer">{{!isNotShowObject[dataIndex]?'':$_indentInfo(dataItem,schemaItem.properties)}}</span>
        </label>
        <gl-property v-if="clickSeq&&!isNotShowObject[dataIndex]"
                     :propertiesSchema="schemaItem.properties"
                     :json="dataItem"
                     :is-root="false" :popup-opts="popupOpts"></gl-property>
        }<br>
        <!--对象开始-->
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
      },
      popupOpts: {
        type: Object,
        default: function () {
          return {
            inline: true,
            hoverable: true,
            position: 'bottom left',
            delay: {
              show: 0,
              hide: 100
            }
          }
        }
      }
    },
    watch: {
      'options.display': {
        handler: function (val, oval) {
          // isNotShowObject
          // let isShow = false
          // if (val === 'expand') {
          //   isShow = true
          // } else if (val === 'compress') {
          //   isShow = false
          // }
          // for (let index in this.$_wrapToArray(this.json)) {
          //   this.isNotShowObject[index] = !isShow
          // }
          this.$_setDisplay()
          console.log('this.isNotShowObject', this.isNotShowObject)
        },
        immediate: true
      }
    },
    data () {
      return {
        isNotShowObject: {},
        clickSeq: 1,
        hoverObject: -1,
        dataItems: []
      }
    },
    mounted: function () {
      // this.$_setDisplay()
      // this.clickSeq++
      // console.log('mounted this.isNotShowObject', this.isNotShowObject)
      // // console.log('options>', this.options, 'json>', this.json)
    },
    methods: {
      $_setDisplay () {
        let isShow = false
        if (!this.options.display) {
          this.options.display = 'compress'
        }
        if (this.options.display === 'expand') {
          isShow = true
        } else if (this.options.display === 'compress') {
          isShow = false
        }
        console.log(this.$_wrapToArray(this.json), this.json)
        for (let index in this.$_wrapToArray(this.json)) {
          console.log('sss')
          this.isNotShowObject[index] = !isShow
        }
        this.clickSeq++
      },
      /**
       * 若是{}，转返回[{}]，若为[],则直接返回
       * @param json
       * @returns {*}
       */
      $_wrapToArray (json) {
        if (this.dataItems.length > 0) {
          return this.dataItems
        }
        if (this.$_isArray(json)) {
          this.dataItems = json
        } else {
          this.dataItems = [json]
        }
        return this.dataItems
      },
      $_isArray (json) {
        if (typeof json === 'object' && 'length' in json) {
          return true
        }
        return false
      },
      /**
       * 为数组添加子项数据
       */
      $_addDataItem (items) {
        console.log('items>', items)
      },
      // $_moveUp (index) {
      //   let item = this.dataItems[index]
      //   this.dataItems.splice(index, 1)
      //   this.dataItems.splice(index + 1, 0, item)
      // },
      // $_moveDown (index) {
      //   let item = this.dataItems[index - 1]
      //   this.dataItems.splice(index - 1, 1)
      //   this.dataItems.splice(index, 0, item)
      // },
      /**
       * 对象缩进之后，以对象的第一个属性作为提示信息，如{title:个人工作台...}
       */
      $_indentInfo (dataItem, properties = {}) {
        if (properties === {}) {
          return '...'
        }
        for (let index in properties) {
          let propertySchema = properties[index]
          console.log('propertySchema>...', propertySchema, properties, dataItem)
          for (let key in propertySchema) {
            return '' + key + ':' + dataItem[key] + '...'
          }
        }
      }
    },
    components: {GlProperty}
  }
</script>
<style scoped>

</style>
