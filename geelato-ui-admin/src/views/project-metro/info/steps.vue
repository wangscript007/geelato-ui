<template>
  <div class="ui padded grid">
    <div class="sixteen wide column">
      <div class="ui close info icon message">
        选择线路>标段，进行该标段项目管理视图
      </div>
      <div class="ui fluid steps hidden">
        <div class="step">
          <i class="truck icon"></i>
          <div class="content">
            <div class="title">选择线路</div>
            <div class="description">
            </div>
          </div>
        </div>
        <div class="step">
          <i class="payment icon"></i>
          <div class="content">
            <div class="title">选择标段</div>
            <div class="description"></div>
          </div>
        </div>
        <div class="disabled step">
          <i class="info icon"></i>
          <div class="content">
            <div class="title">确定</div>
          </div>
        </div>
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
