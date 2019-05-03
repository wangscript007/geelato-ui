<template>
  <div class="gl-content-wrapper">
    <div class="ui mini form">
      <div class="ui mini form gl-form">
        <div class="ui error message segment"></div>
        <div class="two wide fields">
          <div class="field">
            <label>标题(title)</label>
            <input type="text" placeholder="" v-model="modal.title">
          </div>
          <div class="field">
            <label>类型(type)</label>
            <sui-dropdown :options="baseType" v-model="modal.type" selection>
            </sui-dropdown>
          </div>
        </div>
        <div class="field">
          <label> <i class="info circle icon"
                     title="动态配置页面时，值如：list_B9BTSN5E，静态编码页面时，值如：/#/m/platform-core/pages/PageLoader?p=list_B9BTSN5E，外部链接页面时，值如http://www.baidu.com"></i>
            值(value)</label>
          <input type="text"
                 placeholder=""
                 v-model="modal.value">
        </div>
        <div class="fields">
          <div class="eight wide field">
            <label>UI初始选项(opts)</label>
            <textarea type="text" placeholder='{"code":"","query":"{}"}' v-model="modal.opts"
                      rows="5"></textarea>
          </div>
          <div class="eight wide field">
            <label>数据初始参数(query)</label>
            <textarea type="text" placeholder='{"id":1}' v-model="modal.query" rows="5"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      opts: {
        type: Object,
        required: false,
        default: function () {
          return {}
        }
      },
      query: {
        type: Object,
        required: false,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        baseType: [{
          text: '动态配置页面（dynamicPage）',
          value: 'dynamicPage',
        }, {
          text: '静态编码页面（staticPage）',
          value: 'staticPage',
        }, {
          text: '外部链接页面（outerHref）',
          value: 'outerHref',
        }],
        modal: {
          title: this.title,
          type: this.type,
          value: this.value,
          opts: JSON.stringify(this.opts),
          query: JSON.stringify(this.query)
        }
      }
    },
    watch: {
      'modal.title': function (val, oval) {
        this.$emit('update:title', val)
      },
      'modal.type': function (val, oval) {
        this.$emit('update:type', val)
      },
      'modal.value': function (val, oval) {
        this.$emit('update:value', val)
      },
      'modal.opts': function (val, oval) {
        this.$emit('update:opts', this.JSONParse(val))
      },
      'modal.query': function (val, oval) {
        this.$emit('update:query', this.JSONParse(val))
      }
    },
    computed: {},
    mounted: function () {
    },
    methods: {
      JSONParse(val) {
        try {
          return JSON.parse(val)
        } catch (e) {
          return {}
        }
      }
    },
    components: {}
  }
</script>
<style>
</style>

