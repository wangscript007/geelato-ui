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
        <input type="text" placeholder="" v-model="model.code">
      </div>
      <div class="field">
        <label>描述</label>
        <textarea rows="5" v-model="model.description"></textarea>
      </div>
    </div>
    <div class="sixteen wide column">
      <button class="ui mini button" @click="$_save" :class="theme">保存</button>
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
        theme: this.$GL.ui.theme.color.primary,
        entityName: entityNames.project.projectInfo,
        model: {}
      }
    },
    mounted: function () {
      console.log('id>', this.opts.data)
      if (this.opts.data) {
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
        this.$GL.data.query(thisVue.entityName, {id: id}, 'id,name,code,description').then(function (res) {
          thisVue.model = res.data[0]
        })
      },
      $_save () {
        let thisVue = this
        this.$GL.data.save(thisVue.entityName, thisVue.model).then(function () {
          thisVue.$emit('callback', {refreshTable: {}, close: {}})
        })
      }
    },
    components: {}
  }
</script>
<style>
</style>
