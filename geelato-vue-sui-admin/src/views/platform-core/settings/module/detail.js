export default {
  code: '',
  component: '/components/gl-form-combination/Index.vue',
  opts: {
    cards: [
      {
        type: 'tab',
        items: [
          {
            type: 'form',
            name: '模块信息',
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
          },
          {
            type: 'treeForm',
            name: '菜单信息',
            opts: {
              leftTitle: '模块菜单',
              rightTitle: '菜单项',
              max: {left: 8, right: 8},
              min: {left: 5, right: 11},
              treeEntityName: "platform_module",
              treeEntityNameField: "title",
              nodeEntityName: "platform_menu_item",
              nodeEntityNameField: "title",
              treeId: "@.id",
              treeName: "模块菜单",
              form: {
                type: 'form',
                name: '菜单项',
                opts: {
                  type: 'object',
                  // 表单可绑定多实体，这是默认第一实体
                  defaultEntity: 'platform_menu_item',
                  // update|create|read
                  state: 'save',
                  properties: {
                    // 设置该id:{}，便于子实体中依赖该id
                    id: {},
                    title: {
                      control: 'input',
                      title: '名称',
                      // 是否禁用
                      disabled: true,
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
                    clazz: {
                      control: 'input',
                      title: '类样式'
                    },
                    active: {
                      control: 'dropdown',
                      title: '启用',
                      data: [
                        {text: '启用', value: '1'},
                        {text: '不启用', value: '0'}
                      ],
                      value: '1'
                    },
                    href: {
                      control: 'input',
                      title: '链接',
                      placeholder: '/#/m/platform-ide/designer/Index',
                    },
                    treeNodeId: {
                      control: 'input',
                      title: '描述',
                    },
                  },
                  layout: {
                    type: 'table',
                    data: [
                      // [label colSpan,rowSpan,field colSpan,rowSpan]
                      [{title: [4, 8]}, {clazz: [4, 8]}],
                      [{active: [4, 8]}, {'': [4, 8]}],
                      [{href: [4, 20]}]
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
            }
          }
        ]
      }
    ]
  }
}
