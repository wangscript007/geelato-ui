<template>
  <div class="ui padded grid mini form">
    <div class="sixteen wide column">
      <!--<h4 class="ui dividing header">基础信息</h4>-->
      <div class="field">
        <label>名称</label>
        <input type="text" placeholder="" v-model="model.name">
      </div>
      <div class="field">
        <label>编码</label>
        <input type="text" placeholder="" v-model="model.groupCode">
        <input type="hidden" placeholder="" v-model="model.groupId">
      </div>
      <div class="field">
        <label>值</label>
        <input type="text" placeholder="" v-model="model.value">
      </div>
      <div class="field">
        <label>次序</label>
        <input type="text" placeholder="" v-model="model.seq">
      </div>
      <div class="field">
        <label>启用状态</label>
        <input type="text" placeholder="" v-model="model.enabled">
      </div>
      <div class="field">
        <label>描述</label>
        <textarea rows="5" v-model="model.description"></textarea>
      </div>
    </div>
    <div class="sixteen wide column">
      <button class="ui mini teal button" @click="$_save">保存</button>
    </div>
  </div>
</template>
<script>
  import entityNames from '../../../common/entities'

  export default {
    props: {
      opts: {
        type: Object,
        default: function () {
          return {data: {}}
        }
      }
    },
    data () {
      return {
        entityName: entityNames.platform.common.dict,
        model: {}
      }
    },
    mounted: function () {
      console.log('id>', this.opts.data)
      if (this.opts.data && this.opts.data.id) {
        this.$_loadData(this.opts.data.id)
      } else {
        this.model = this.opts.data || {}
      }
      this.$_initUi()
    },
    methods: {
      $_initUi: function () {
        let $el = $(this.$el)
        $el.find('.ui.accordion').accordion()
        $el.find('.ui.dropdown').dropdown()
      },
      $_loadData (id) {
        if (!id) {
          return
        }
        let thisVue = this
        this.$GL.data.query(thisVue.entityName, {id: id}).then(function (data) {
          thisVue.model = data
        })
      },
      $_save () {
        console.log('treeNode', this.model)
//        let thisVue = this
//        this.$GL.data.save(thisVue.entityName, thisVue.model).then(function () {
//          thisVue.$emit('callback', {refreshTable: {}, close: {}})
//        })
      }
    },
    components: {}
  }
</script>
<style>
</style>
