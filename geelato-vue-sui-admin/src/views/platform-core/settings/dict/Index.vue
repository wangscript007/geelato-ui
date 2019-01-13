<template>
  <div class="gl-page-content-wrapper">
    <gl-table :opts="config.opts" :query="{em:config.opts.ui.entity}"></gl-table>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        config: {
          code: '',
          component: '',
          opts: {
            ui: {
              title: '字典信息',
              entity: 'platform_dict',
              query: {
                // 是否隐藏整个查询区域
                show: true,
                // null或''表示不展示tree过滤区域
                tree: null,
                // null或''表示不展示常用过滤器区域
                filter: null,
                // null或''表示不展示综合查询区域
                mix: {
                  fields: [
                    {field: 'groupCode', title: '组名', cop: 'contains', type: 'string', lop: 'or'},
                    {field: 'name', title: '项名', cop: 'contains', type: 'string'},
                    {field: 'value', title: '项值', cop: 'contains', type: 'string', lop: 'or'},
                    {field: 'enabled', title: '启用', cop: 'eq', type: 'boolean', lop: 'and'}
                  ]
                }
              },
              toolbar: {
                title: '',
                dropdown: {
                  title: '',
                  actions: [
                    {
                      title: '创建',
                      click: 'modal',
                      modal: {
                        title: '参数信息',
                        type: 'href',
                        value: '/components/gl-form-simple/Index.vue',
                        opts: {
                          ui: {
                            entityName: 'platform_dict',
                            fields: 'id,groupCode,name,value,enabled,description',
                            layout: [
                              [{name: [4, 8]}, {value: [4, 8]}],
                              [{groupCode: [4, 8]}, {enabled: [4, 8]}],
                              [{description: [4, 20]}]
                            ]
                          }
                        }
                      }
                    },
                    {title: '删除', click: 'deleteMulti', confirm: '确定删除？'}
                    // // 弹出页面提示导出多少条记录
                    // {title: '导出EXCEL', click: 'xls'},
                    // // 弹出页面提示导出多少条记录
                    // {title: '导出PDF', click: 'pdf'},
                    // // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
                    // {title: '打印', click: 'print'}
                  ]
                }
              },
              tips: {
                html: ''
              },
              table: {
                select: {field: 'id', title: '', type: 'checkbox'},
                dropdown: {
                  title: '操作',
                  actions: [
                    {
                      title: '修改',
                      click: 'modal',
                      modal: {
                        title: '参数信息',
                        type: 'href',
                        value: '/components/gl-form-simple/Index.vue',
                        opts: {
                          ui: {
                            entityName: 'platform_dict',
                            fields: 'id,groupCode,name,value,enabled,description',
                            format: {},
                            layout: [
                              [{name: [4, 8]}, {value: [4, 8]}],
                              [{groupCode: [4, 8]}, {enabled: [4, 8]}],
                              [{description: [4, 20]}]
                            ],
                            model: {id: '@.id'}
                          }
                        }
                      }
                    }
                  ]
                },
                columns: [
                  {field: 'id', title: '', visible: false},
                  {field: 'groupCode', title: '组名', type: 'string', format: ''},
                  {field: 'name', title: '项名', type: 'string', format: ''},
                  {field: 'value', title: '项值', type: 'string', format: ''},
                  {field: 'enabled', title: '启用', type: 'boolean', format: ''},
                  {field: 'description', title: '描述', type: 'string', format: ''}
                ],
                p: '1,20',
                order: 'groupCode|+'
              },
              stat: ''
            }
          }
        }
      }
    },
    computed: {},
    created() {
    },
    mounted() {

    },
    methods: {}
  }
</script>
<style>
</style>
