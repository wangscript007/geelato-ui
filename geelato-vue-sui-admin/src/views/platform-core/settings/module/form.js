export default {
  code: '',
  component: '/components/gl-form-combination/Index.vue',
  opts: {
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
              ],
              placeholder: '唯一编码'
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
              tips: '打开模块的默认页面时，采用最大化还是最小化布局。',
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
              value: true,
              convert: 'number'
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
        name: "",
        type: "toolbar",
        opts: {
          appendToParent: true,
          actions: [
            {
              color: "primary",
              title: "保存",
              click: "@:$ctx.save([$ctx.$parent.close,$ctx.$opener.refresh])"
            },
            {
              color: "negative",
              title: "取消",
              click: "@:$ctx.$parent.cancel()"
            }
          ]
        }
      }
    ]
  },
  query: {id: '@.id'}
}
