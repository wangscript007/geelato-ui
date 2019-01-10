import uiDataTemplate from './dataTemplate.js'

/**
 *  插件定义
 */
export const Config = {
  file: {
    title: '高级表单',
    type: 'form-combination',
    icon: 'th list icon',
    description: '可组合的高级表单'
  },
  toolbar: [],
  stagePanels: [{
    name: 'ui',
    title: 'ui',
    path: 'common/StageUi.vue',
    opts: {
      component: '/components/gl-form-combination/Index',
      ui: {
        cards: [
          {type: 'header', name: '标题...', opts: {}},
          uiDataTemplate.form,
          {
            type: 'ht-table',
            name: 'platform_demo_entity',
            opts: {table: {width: 720, colNum: 24, rowNum: 12, mergeCells: [], ds: []}}
          },
          {
            type: 'tab',
            items: [
              {
                type: 'form',
                name: '模块基本信息',
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
                      title: '首页',
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
                      readonly: true
                    },
                    enable: {
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
                      [{title: [4, 8]}, {resize: [4, 8]}],
                      [{code: [4, 8]}, {enable: [4, 8]}],
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
                type: 'form',
                name: '模块基本信息2',
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
                      title: '首页',
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
                      readonly: true
                    },
                    enable: {
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
                      [{title: [4, 8]}, {resize: [4, 8]}],
                      [{code: [4, 8]}, {enable: [4, 8]}],
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
          },
          {
            type: 'toolbar',
            name: '',
            opts: {
              actions: [
                {
                  title: '创建',
                  click: 'modal',
                  modal: {
                    title: '编辑示例实体',
                    type: 'page',
                    value: '/components/page/PageLoader.vue',
                    opts: {
                      code: '',
                      query: {}
                      // entityName: 'platform_demo_entity',
                      // fields: 'id,name,type,code,content,description',
                      // layout: [
                      //   [{name: [4, 8]}, {code: [4, 8]}],
                      //   [{type: [4, 8]}],
                      //   [{content: [4, 20]}],
                      //   [{description: [4, 20]}]
                      // ]
                    }
                  },
                  color: 'primary'
                },
                {title: '删除', click: 'delete', confirm: '确定删除？', color: 'negative'}
              ]
            }
          }
        ]
      }
    }
  }],
  settingPanels: [
    {name: 'properties', title: '基本信息', path: 'common/Settings.vue'},
    {name: 'form-combination', title: '页面配置', path: 'form-combination/Settings.vue'}
  ]
}
