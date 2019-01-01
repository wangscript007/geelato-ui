<template>
  <input v-model="date">
</template>
<script>
  // import '../../../public/lib/laydate/laydate.js'

  export default {
    props: {
      // year	年选择器	只提供年列表选择
      // month	年月选择器	只提供年、月选择
      // date	日期选择器	可选择：年、月、日。type默认值，一般可不填
      // time	时间选择器	只提供时、分、秒选择
      // datetime	日期时间选择器	可选择：年、月、日、时、分、秒
      type: {
        type: String,
        default: function () {
          return 'date'
        }
      },
      // range: true 或  '~' 来自定义分割字符
      range: {
        type: [String, Boolean],
        default: function () {
          return false
        }
      },
      format: {
        type: String,
        default: function () {
          return 'yyyy-MM-dd'
        }
      },
      value: {
        type: String,
        default: function () {
          return ''
        }
      },
      // 用于控制是否自动向元素填充初始值（需配合 value 参数使用）
      isInitValue: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      min: {
        type: String,
        default: function () {
          return '1900-1-1'
        }
      },
      max: {
        type: String,
        default: function () {
          return '2099-12-31'
        }
      },
      zIndex: {
        type: Number,
        default: function () {
          return 66666666
        }
      },
      showBottom: {
        type: Boolean,
        default: function () {
          return true
        }
      },
      btns: {
        type: Array,
        default: function () {
          return ['clear', 'now', 'confirm']
        }
      },
    },
    data() {
      return {
        date: ''
      }
    },
    updated() {
    },
    mounted: function () {
      let thisVue = this
      laydate.render({
        // elem: '#test' //或 elem: document.getElementById('test')、elem: lay('#test') 等
        elem: thisVue.$el,
        type: thisVue.type,
        range: thisVue.range,
        format: thisVue.format,
        value: thisVue.value,
        isInitValue: thisVue.isInitValue,
        min: thisVue.min,
        max: thisVue.max,
        zIndex: thisVue.zIndex,
        showBottom: thisVue.showBottom,
        btns: thisVue.btns
      })
    },
    methods: {},
    components: {}
  }
</script>
<style>
</style>
