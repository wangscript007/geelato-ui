<template>
  <div class="ui padded grid">
    <div class="sixteen wide column">
      <sui type="tab" selector=".menu .item">
        <div class="ui top attached tabular pointing secondary fruit menu">
          <a class="active item" data-tab="first">基本信息</a>
          <a class="item" data-tab="second">参建单位</a>
          <a class="item" data-tab="third">项目人员</a>
          <a class="item" data-tab="fourth">工点信息</a>
          <a class="item" data-tab="fifth">单位工程</a>
          <a class="item" data-tab="sixth">分部工程</a>
        </div>
        <div class="ui bottom attached active tab segment" data-tab="first">
          <table class="ui small form gl-form">
            <caption>&nbsp;</caption>
            <tbody>
            <tr>
              <td>项目名称</td>
              <td><input type="text"></td>
              <td>所属线路</td>
              <td>
                <sui type="dropdown" selector=".ui.dropdown">
                  <div class="ui selection dropdown">
                    <input type="hidden" name="gender">
                    <i class="dropdown icon"></i>
                    <div class="default text">{{lines&&lines.length>0?lines[0].name:''}}</div>
                    <div class="menu">
                      <div class="item" v-for="line in lines" :data-value="line.code">{{line.name}}</div>
                    </div>
                  </div>
                </sui>
              </td>
            </tr>
            <tr>
              <td>合同编号</td>
              <td><input type="text"></td>
              <td></td>
              <td>
              </td>
            </tr>
            <tr>
              <td>概述</td>
              <td colspan="3"><textarea rows="4"></textarea></td>
            </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
        <div class="ui bottom attached tab segment" data-tab="second">
          <page-loader :code="'prj-mtr-project-info-list'" :query="{em:'prj-project'}"></page-loader>
        </div>
        <div class="ui bottom attached tab segment" data-tab="third">
          <page-loader :code="'prj-mtr-project-info-list'" :query="{em:'prj-project'}"></page-loader>
        </div>
        <div class="ui bottom attached tab segment" data-tab="fourth">
          <page-loader :code="'prj-mtr-project-info-list'" :query="{em:'prj-project'}"></page-loader>
        </div>
        <div class="ui bottom attached tab segment" data-tab="fifth">
          <page-loader :code="'prj-mtr-project-info-list'" :query="{em:'prj-project'}"></page-loader>
        </div>
        <div class="ui bottom attached tab segment" data-tab="sixth">
          <page-loader :code="'prj-mtr-project-info-list'" :query="{em:'prj-project'}"></page-loader>
        </div>
      </sui>
    </div>
  </div>
</template>
<script>
  import entityNames from '../../../pages/entities'
  import Sui from '../../../components/sui/index.vue'
  import PageLoader from '../../../components/page/page-loader.vue'
  import testData from '../../../mock/project-metro/index'

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
        lines: testData.metroLine
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
    components: {Sui, PageLoader}
  }
</script>
<style>
</style>
