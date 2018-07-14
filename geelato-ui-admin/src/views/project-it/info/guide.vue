<template>
  <div class="gl-page-content-wrapper" style="padding-top: 0">
    <div class="ui padded grid">
      <div class="sixteen wide column">
        <message title="说明">
          在未完成项目的初始化配置之前，默认将进入该指引页面，您也可以通过菜单 “项目信息管理->使用指引” 进入该页面。
        </message>
      </div>
    </div>
  </div>
</template>
<script>
  import entityNames from '../../../pages/entities'
  import Sui from '../../../components/sui/index.vue'
  import PageLoader from '../../../components/page/page-loader.vue'
  import Message from '../../../components/message/index.vue'
  import testData from '../../../mock/project/project-metro/tjgc'

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
        entityName: entityNames.project.projectInfo,
        model: {},
        lines: testData.projectGroups
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
        this.$gl.data.query(thisVue.entityName, {id: id}, 'id,name,code,description').then(function (res) {
          thisVue.model = res.data[0]
        })
      },
      $_save () {
        let thisVue = this
        this.$gl.data.save(thisVue.entityName, thisVue.model).then(function () {
          thisVue.$emit('callModal', {refreshTable: {}, close: {}})
        })
      }
    },
    components: {Sui, Message, PageLoader}
  }
</script>
<style>
</style>
