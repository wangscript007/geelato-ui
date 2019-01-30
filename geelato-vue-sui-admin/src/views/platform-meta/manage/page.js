import formConfig from './form.js'

export default {
  code: '',
  component: '/components/gl-form-combination/Index.vue',
  opts: {
    cards: [
      {
        type: 'treeForm',
        name: '实体信息',
        opts: {
          leftTitle: '实体树',
          rightTitle: '实体信息',
          treeEntityName: '',
          treeEntityNameField: '',
          nodeEntityName: 'platform_dev_table',
          nodeEntityNameField: 'title',
          treeId: '1331557725930119511',
          treeName: 'geelato',
          // max: {left: 8, right: 8},
          // min: {left: 5, right: 11},
          cards: [
            {
              name: "",
              type: "toolbar",
              opts: {
                appendToParent: true,
                actions: [
                  {
                    color: "primary",
                    title: "保存",
                    click: "@:$ctx.$_save(false)"
                  }
                  // {
                  //   color: "negative",
                  //   title: "取消",
                  //   click: "@:$ctx.$parent.$_cancel()"
                  // }
                ]
              }
            },
            {
              type: 'form',
              name: '实体信息',
              opts: {
                type: 'object',
                // 表单可绑定多实体，这是默认第一实体
                defaultEntity: 'platform_dev_table',
                // 查询获取实体数据的字段，默认为['id']
                queryFields: ['treeNodeId'],
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
                    readonly: true,
                    // 是否隐藏，hidden隐藏与否在layout中控制，故没有hidden这个配置
                    rules: [
                      {
                        type: 'empty',
                        prompt: '请输入名称'
                      }
                    ]
                  },
                  tableName: {
                    control: 'input',
                    title: '数据表名'
                  },
                  tableSchema: {
                    control: 'input',
                    title: '数据库名'
                  },
                  enabled: {
                    control: 'checkbox',
                    title: '启用',
                    data: [
                      {text: '已启用', value: true},
                      {text: '未启用', value: false}
                    ],
                    value: true
                  },
                  linked: {
                    control: 'dropdown',
                    title: '链接状态',
                    data: [
                      {text: '已链接', value: 1},
                      {text: '未链接', value: 0}
                    ],
                    value: 0
                  },
                  tableComment: {
                    control: 'textarea',
                    title: '表备注',
                    placeholder: '',
                  },
                  description: {
                    control: 'textarea',
                    title: '描述',
                    placeholder: '',
                  },
                  treeNodeId: {
                    control: 'input',
                    title: '树节点ID',
                  },
                },
                layout: {
                  type: 'table',
                  data: [
                    // [label colSpan,rowSpan,field colSpan,rowSpan]
                    [{title: [4, 8]}, {tableName: [4, 8]}],
                    [{tableSchema: [4, 8]}, {'': [4, 8]}],
                    [{enabled: [4, 8]}, {linked: [4, 8]}],
                    [{tableComment: [4, 8]}, {description: [4, 8]}]
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
            },
            {
              code: '',
              name: '字段信息',
              component: '',
              type: 'list',
              opts: {
                ui: {
                  title: '字段信息',
                  entity: 'platform_dev_column',
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
                        {field: 'name', title: '编码', cop: 'contains', type: 'string', lop: 'or'},
                        {field: 'comment', title: '描述', cop: 'contains', type: 'string', lop: 'or'}
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
                            opts: formConfig.opts
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
                            title: '字段信息',
                            type: 'href',
                            value: formConfig.component,
                            opts: formConfig.opts,
                            query: formConfig.query
                          }
                        }
                      ]
                    },
                    columns: [
                      {field: 'id', title: '', visible: false},
                      {field: 'title', title: '名称', type: 'string', format: ''},
                      {field: 'name', title: '编码', type: 'string', format: ''},
                      {field: 'linked', title: '同步状态', type: 'string', format: ''},
                      {field: 'enabled', title: '启用', type: 'string', format: ''},
                      {field: 'comment', title: '描述', type: 'string', format: ''}
                    ],
                    p: '1,20',
                    order: 'title|+'
                  },
                  stat: ''
                }
              }
            },
          ]
        }
      }
    ]
  }
}
