<template>
  <div class="gl-page-content-wrapper">
    <gl-list :opts="config"></gl-list>
  </div>
</template>
<script>
  import GlList from '../../../components/page/list.vue'

  export default {
    props: {},
    data () {
      return {
        // 最大时，不展示查询区
        isMax: false,
        // 关闭tips
        showTips: true,
        // 查询的结果数据
        queryResult: {},
        config: {
          ui: {
            entity: 'prj_task_type',
            title: '计划类型',
            query: {show: true},
            toolbar: {
              dropdown: {actions: []}
            },
            tips: {
              // 展示位置：header|footer|none，当为none或空时，则不展示。
              display: 'none',
              // 提示内容，html格式
              html: '<div>这是提示内容<div>'
            },
            table: {
              dropdown: {
                title: '操作',
                actions: [
                  {
                    title: '详细',
                    click: 'modal',
                    modal: {
                      type: 'page',
                      value: 'sys_role_list_detail',
                      query: {}
                    }
                  },
                  {
                    title: '修改',
                    click: 'modal',
                    modal: {
                      title: '项目信息',
                      type: 'href',
                      value: '/views/project-metro/info/project-info.vue',
                      data: {id: '@.id', name: '@.name'}
                    },
                    hidden: 'js:@.id < 0'
                  },
                  {title: '删除', click: 'delete', hidden: 'js:@.id > 0', confirm: '确定删除？'},
                  {title: '直接调用js', click: 'js:alert(\'aaaa\')'}]
              },
              columns: [
                {field: 'id', title: '序号', visible: false},
                {field: 'name', title: '名称', type: 'string', format: '', visible: false},
                {field: 'code', title: '编码', type: 'string', format: ''},
                {field: 'description', title: '描述', type: 'string', format: '', visible: false}
              ],
              p: '1,100',
              order: 'name|+'
            }
          }
        }
      }
    },
    mounted () {
      this.$_loadData()
//      console.log('this.opts', this.opts)
//      $(this.$el).find('.ui.cards')()
//      $(this.$el).find('.ui.checkbox').checkbox()
    },
    updated () {
      $(this.$el).find('.ui.dropdown').dropdown()
      this.initCheckbox()
    },
    methods: {
      $_loadData () {
      }
    },
    components: {GlList}
  }
</script>
<style scoped>
</style>
