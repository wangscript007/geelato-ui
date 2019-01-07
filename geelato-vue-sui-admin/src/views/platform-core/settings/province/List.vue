<template>
    <div class="gl-page-content-wrapper">
        <gl-table :opts="config.opts" :query="{em:'platform_province'}"></gl-table>
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
                            title: '省份信息',
                            entity: 'platform_province',
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
                                        {field: 'code', title: '编码', cop: 'contains', type: 'string', lop: 'or'}
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
                                                title: '省份信息',
                                                type: 'href',
                                                value: '/components/gl-form-simple/Index.vue',
                                                opts: {
                                                    ui: {
                                                        entityName: 'platform_province',
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
                                        // // 弹出页面提示导出多少条记录
                                        // {title: '导出EXCEL', click: 'xls'},
                                        // // 弹出页面提示导出多少条记录
                                        // {title: '导出PDF', click: 'pdf'},
                                        // // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
                                        // {title: '打印', click: 'print'}
                                    ]
                                }
                            },
                            info: '',
                            table: {
                                select: {field: 'id', title: '', type: 'checkbox'},
                                dropdown: {
                                    title: '操作',
                                    actions: [
                                        {
                                            title: '修改',
                                            click: 'modal',
                                            modal: {
                                                title: '省份信息',
                                                type: 'href',
                                                value: '/components/gl-form-simple/Index.vue',
                                                opts: {
                                                    ui: {
                                                        entityName: 'platform_province',
                                                        fields: 'id,name,code,description',
                                                        layout: [
                                                            [{code: [4, 8]}, {name: [4, 8]}],
                                                            [{description: [4, 20]}]
                                                        ],
                                                        model: {id: '@.id'}
                                                    }
                                                }
                                            }
                                        }
                                        // {
                                        //   title: '详细',
                                        //   click: 'modal',
                                        //   modal: {
                                        //     type: 'page',
                                        //     value: 'platform_user_list_detail',
                                        //     opts: {}
                                        //   }
                                        // }
                                    ]
                                },
                                columns: [
                                    {field: 'id', title: '', visible: false},
                                    {field: 'name', title: '名称', type: 'string', format: ''},
                                    {field: 'code', title: '编码', type: 'string', format: ''},
                                    {field: 'description', title: '描述', type: 'string', format: ''}
                                ],
                                p: '1,10',
                                order: 'code|+'
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
