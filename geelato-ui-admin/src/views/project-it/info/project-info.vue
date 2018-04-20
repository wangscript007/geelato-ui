<template>
  <div class="ui padded grid">
    <div class="sixteen wide column">
      <sui type="tab" selector=".menu .item">
        <div class="ui top attached tabular pointing secondary fruit menu">
          <a class="active item" data-tab="first">基本信息</a>
          <a class="item" data-tab="second">参建单位</a>
          <a class="item" data-tab="third">项目人员</a>
        </div>
        <div class="ui bottom attached active tab segment" data-tab="first">
          <project-info-base></project-info-base>
        </div>
        <div class="ui bottom attached tab segment" data-tab="second">
          <page-loader code="prj_project_unit_list" :query="{em:'prj_project_unit'}"></page-loader>
        </div>
        <div class="ui bottom attached tab segment" data-tab="third">
          <page-loader code="prj_project_member_list" :query="{em:'prj_project_member'}"></page-loader>
        </div>
      </sui>
    </div>
  </div>
</template>
<script>
  import entityNames from '../../../pages/entities'
  import Sui from '../../../components/sui/index.vue'
  import PageLoader from '../../../components/page/page-loader.vue'
  import testData from '../../../mock/project/project-metro/tjgc'
  import ProjectInfoBase from '../../project-base/info/project-info-base.vue'

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
        this.$GL.data.query(thisVue.entityName, {id: id}, 'id,name,code,description').then(function (res) {
          thisVue.model = res.data[0]
        })
      },
      $_save () {
        let thisVue = this
        this.$GL.data.save(thisVue.entityName, thisVue.model).then(function () {
          thisVue.$emit('callModal', {refreshTable: {}, close: {}})
        })
      }
    },
    components: {Sui, PageLoader, ProjectInfoBase}
  }
</script>
<style>
</style>
