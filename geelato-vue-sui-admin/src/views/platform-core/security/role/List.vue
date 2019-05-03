<template>
    <div class="gl-page-content-wrapper">
        <gl-table :opts="config.opts" :query="{em:'platform_user'}"></gl-table>
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
                      // mode: 'select',
                      title: '角色信息',
                      entity: 'platform_role',
                      layout: {
                        type: 'horizontal',
                        max: 'table'
                      },
                      query: {
                        // 是否隐藏整个查询区域
                        show: true,
                        // null或''表示不展示tree过滤区域
                        tree: null,
                        // null或''表示不展示常用过滤器区域
                        filter: null,
                        // null或''表示不展示综合查询区域
                        mix: {
                          // 可用于查询的字段
                          fields: [
                            // cop：比较操作符，eq：等于；default：默认值
                            {
                              field: 'name',
                              title: '名称',
                              cop: 'eq',
                              type: 'string',
                              defalut: '张',
                              placeholder: ''
                            },
                            // cop：比较操作符，contains：包含；lop：逻辑操作符，or：或者
                            {field: 'code', title: '编码', cop: 'contains', type: 'string', lop: 'or'},
                            // and：并且
                            {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
                          ]
                        }
                      },
                      // --end query --
                      toolbar: {
                        title: '',
                        dropdown: {
                          title: '',
                          actions: [
                            {
                              title: '创建',
                              click: 'modal',
                              modal: {
                                title: '角色管理',
                                type: 'staticPage',
                                value: '/components/gl-form-simple/Index.vue',
                                opts: {
                                  ui: {
                                    entityName: 'platform_role',
                                    fields: 'id,name,code,description',
                                    layout: [
                                      [{name: [4, 8]}, {code: [4, 8]}],
                                      [{description: [4, 20]}]
                                    ]
                                  }
                                }
                              }
                            },
                            {title: '删除', click: 'delete', confirm: '确定删除？'}
                          ]
                        }
                      },
                      tips: {
                        // 展示位置：header|footer|none，当为none或空时，则不展示。
                        display: 'none',
                        // 提示内容，html格式
                        html: ''
                      },
                      // 选择的行数据
                      selected: [],
                      table: {
                        // type：checkbox、radio；title默认为空，可选。
                        select: {field: 'id', title: '选择', type: 'checkbox'},
                        dropdown: {
                          title: '操作',
                          actions: [
                            // {title: '修改', click: 'open', visible: 'js:@.id'},
                            {
                              title: '修改',
                              click: 'modal',
                              modal: {
                                title: '角色管理',
                                type: 'staticPage',
                                value: '/components/gl-form-simple/Index.vue',
                                opts: {
                                  ui: {
                                    entityName: 'platform_role',
                                    fields: 'id,name,code,description',
                                    layout: [
                                      [{name: [4, 8]}, {code: [4, 8]}],
                                      [{description: [4, 20]}]
                                    ],
                                    model: {id: '@.id'}
                                  }
                                }
                              }
                            }
                            // {title: '直接调用js', click: 'js:alert(\'aaaa\')'}
                          ]
                        },
                        columns: [
                          {field: 'id', title: '序号', visible: false},
                          {field: 'name', title: '名称', type: 'string', format: ''},
                          {field: 'code', title: '编码', type: 'string', format: ''},
                          {field: 'description', title: '描述', type: 'string', format: ''}
                        ],
                        p: '1,10',
                        order: 'name|+'
                      },
                      stat: '',
                      // 状态
                      state: {
                        selectedRows: {},
                        clickedRow: {}
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
