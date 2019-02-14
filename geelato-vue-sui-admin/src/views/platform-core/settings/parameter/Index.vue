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
                      title: '参数信息',
                      entity: 'platform_parameter',
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
                            {field: 'name', title: '名称', cop: 'contains', type: 'string'},
                            {field: 'code', title: '键', cop: 'contains', type: 'string', lop: 'or'},
                            {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
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
                                    entityName: 'platform_parameter',
                                    fields: 'id,name,code,value,defaultValue,description',
                                    layout: [
                                      [{name: [4, 8]}, {code: [4, 8]}],
                                      [{value: [4, 8]}, {defaultValue: [4, 8]}],
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
                        html: '系统参数信息配置，系统内置的参数信息只有超级管理员才有权限修改。'
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
                                    entityName: 'platform_parameter',
                                    fields: 'id,name,code,value,defaultValue,description',
                                    layout: [
                                      [{name: [4, 8]}, {code: [4, 8]}],
                                      [{value: [4, 8]}, {defaultValue: [4, 8]}],
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
                          {field: 'name', title: '名称', type: 'string', format: ''},
                          {field: 'code', title: '键', type: 'string', format: ''},
                          {field: 'value', title: '当前值', type: 'string', format: ''},
                          {field: 'defaultValue', title: '默认值', type: 'string', format: ''},
                          {field: 'description', title: '描述', type: 'string', format: ''}
                        ],
                        p: '1,20',
                        order: 'name|+'
                      },
                      stat: '这是统计信息'
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
