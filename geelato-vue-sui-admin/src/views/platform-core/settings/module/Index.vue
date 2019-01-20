<template>
  <div class="gl-page-content-wrapper">
    <gl-table :opts="config.opts" :query="{em:config.opts.ui.entity}"></gl-table>
  </div>
</template>
<script>
  import detailConfig from './detail.js'

  export default {
    data() {
      return {
        config: {
          code: '',
          component: '',
          opts: {
            ui: {
              title: '模块信息',
              entity: 'platform_module',
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
                    {field: 'title', title: '名称', cop: 'contains', type: 'string', lop: 'or'},
                    {field: 'code', title: '编码', cop: 'contains', type: 'string', lop: 'or'},
                    {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'or'}
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
                        title: '模块信息',
                        type: 'href',
                        value: '/components/gl-form-combination/Index.vue',
                        opts: {
                          ui: {
                            cards: [
                              {
                                type: 'form',
                                opts: {
                                  type: 'object',
                                  // 表单可绑定多实体，这是默认第一实体
                                  defaultEntity: 'platform_module',
                                  // update|create|read
                                  state: 'save',
                                  properties: {
                                    // 设置该id:{}，便于子实体中依赖该id
                                    id: {},
                                    title: {
                                      control: 'input',
                                      title: '名称',
                                      // 是否禁用
                                      disabled: false,
                                      // 是否只读
                                      readonly: false,
                                      // 是否隐藏，hidden隐藏与否在layout中控制，故没有hidden这个配置
                                      rules: [
                                        {
                                          type: 'empty',
                                          prompt: '请输入名称'
                                        }
                                      ]
                                    },
                                    code: {
                                      control: 'input',
                                      title: '编码',
                                      rules: [
                                        {
                                          type: 'empty',
                                          prompt: '请输入编码'
                                        }
                                      ]
                                    },
                                    index: {
                                      control: 'input',
                                      title: '模块首页',
                                      placeholder: '/#/m/platform-ide/designer/Index',
                                      rules: [
                                        {
                                          type: 'empty',
                                          prompt: '请输入模块首页'
                                        }
                                      ]
                                    },
                                    html: {
                                      control: 'input',
                                      title: '名称html格式',
                                      placeholder: '<bold>系统管理</bold>',
                                    },
                                    resize: {
                                      control: 'dropdown',
                                      title: '页面大小',
                                      // 若数据是动态生产成，可配置ds，基于ds加载的数据最终会设置到data中
                                      data: [
                                        {text: '最小化', value: 'min'},
                                        {text: '最大化', value: 'max'}
                                      ],
                                      value: 'min'
                                    },
                                    seq: {
                                      control: 'input',
                                      title: '次序',
                                      readonly: true,
                                      value: -1
                                    },
                                    enabled: {
                                      control: 'checkbox',
                                      title: '启用',
                                      value: true
                                    },
                                    description: {
                                      control: 'textarea',
                                      title: '描述',
                                    },
                                  },
                                  layout: {
                                    type: 'table',
                                    data: [
                                      // [label colSpan,rowSpan,field colSpan,rowSpan]
                                      [{title: [4, 8]}, {code: [4, 8]}],
                                      [{index: [4, 20]}],
                                      [{resize: [4, 8]}, {enabled: [4, 8]}],
                                      [{html: [4, 8]}, {seq: [4, 8]}],
                                      [{description: [4, 20]}]
                                    ],
                                    hidden: {
                                      // 各表单状态，需隐藏的内容
                                      update: {},
                                      create: {},
                                      read: {}
                                    }
                                  },
                                  ds: {},
                                  vars: {}
                                }
                              }
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
                html: '模块的名称，即为平台顶级菜单模块的名称。'
              },
              table: {
                select: {field: 'id', title: '', type: 'checkbox'},
                dropdown: {
                  title: '操作',
                  actions: [
                    // {
                    //   title: '修改',
                    //   click: 'modal',
                    //   modal: {
                    //     title: '模块信息',
                    //     type: 'href',
                    //     value: '/components/gl-form-simple/Index.vue',
                    //     opts: {
                    //       ui: {
                    //         entityName: 'platform_module',
                    //         fields: 'id,title,code,index,resize,html,description',
                    //         layout: [
                    //           [{title: [4, 8]}, {code: [4, 8]}],
                    //           [{index: [4, 8]}, {resize: [4, 8]}],
                    //           [{html: [4, 20]}],
                    //           [{description: [4, 20]}]
                    //         ],
                    //         model: {id: '@.id'}
                    //       }
                    //     }
                    //   }
                    // },
                    // {
                    //   title: '详情',
                    //   click: 'modal',
                    //   modal: {
                    //     title: '详细信息',
                    //     type: 'href',
                    //     value: '/views/platform-core/settings/module/Detail.vue',
                    //     opts: {
                    //       ui: {
                    //         model: {id: '@.id'}
                    //       }
                    //     }
                    //   }
                    // },
                    // {
                    //   title: '详情1',
                    //   click: 'modal',
                    //   modal: {
                    //     title: '详细信息',
                    //     type: 'href',
                    //     value: '/components/gl-page-loader/Index.vue',
                    //     opts: {
                    //       // code: 'list_9V02AlD4',
                    //       code: 'form-combination_Ygvv7IXs',
                    //       model: {id: '@.id'}
                    //     }
                    //   }
                    // },
                    {
                      title: '详情',
                      click: 'modal',
                      modal: {
                        title: '详细信息',
                        type: 'href',
                        value: detailConfig.component,
                        opts: detailConfig.opts
                      }
                    }
                  ]
                },
                columns: [
                  {field: 'id', title: '', visible: false},
                  {field: 'title', title: '名称', type: 'string', format: ''},
                  {field: 'code', title: '模块编码', type: 'string', format: ''},
                  {field: 'description', title: '描述', type: 'string', format: ''}
                ],
                p: '1,20',
                order: 'title|+'
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
