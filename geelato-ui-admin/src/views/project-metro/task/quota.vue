<template>
  <div class="gl-page-content-wrapper">
    <layout-lr :title="'指标树'" :leftActions="leftActions" :rightActions="rightActions">
      <div slot="left">
        <jstree :opts="treeConfig"></jstree>
      </div>
      <div slot="right">
        <div class="ui accordion">
          <div class="title active">
            <i class="dropdown icon"></i>
            基本信息
          </div>
          <div class="content active">
            <form class="ui mini form">
              <div class="field">
                <label>指标名称</label>
                <input type="text" name="name" placeholder="">
              </div>
              <div class="field">
                <label>指标编码</label>
                <input type="text" name="code" placeholder="">
              </div>
              <div class="field">
                <label>描述</label>
                <textarea rows="4"></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </layout-lr>
  </div>
</template>
<script>
  import LayoutLr from '../../../components/mix/page-layout-lr'
  import Jstree from '../../../components/mix/jstree'

  export default {
    props: {},
    data () {
      return {
        // 最大时，不展示查询区
        isMax: false,
        leftActions: [{
          title: '新增',
          click: 'modal',
          modal: {
            type: 'page',
            value: 'sys_role_list_detail',
            query: {}
          }
        }],
        rightActions: [{
          title: '保存',
          click: 'modal',
          modal: {
            type: 'page',
            value: 'sys_role_list_detail',
            query: {}
          }
        }],
        treeConfig: {}
      }
    },
    created () {
      this.$_loadData()
    },
    mounted () {
//      console.log('this.opts', this.opts)
//      $(this.$el).find('.ui.cards')()
//      $(this.$el).find('.ui.checkbox').checkbox()
    },
    updated () {
      $(this.$el).find('.ui.accordion').accordion({exclusive: false})
      $(this.$el).find('.ui.dropdown').dropdown()
    },
    methods: {
      $_loadData () {
        this.treeConfig = {
          core: {
            data: [
              {
                text: '轨道交通',
                state: {
                  'opened': true,
                  'selected': true
                },
                children: [
                  {text: '新线规划'},
                  {text: '前期工程'},
                  {text: '设计管理'},
                  {text: '机电'},
                  {
                    text: '土建', children: [{text: '明挖'}, {text: '暗挖'}]
                  }
                ]
              }
            ]
          },
          plugins: ['contextmenu', 'dnd', 'state', 'types']
        }
      }
    },
    components: {LayoutLr, Jstree}
  }
</script>
<style scoped>
</style>
