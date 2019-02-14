export default {
  code: '',
  component: '/components/gl-form-combination/Index.vue',
  opts: {
    cards: [
      {
        type: 'treeForm',
        name: '菜单信息',
        opts: {
          leftTitle: '菜单树',
          rightTitle: '菜单项',
          max: {left: 8, right: 8},
          min: {left: 6, right: 10},
          treeEntityName: "platform_module",
          treeEntityNameField: "title",
          nodeEntityName: "platform_menu_item",
          nodeEntityNameField: "title",
          treeId: "@.id",
          treeName: "@.title+'[模块]'",
          cards: [{
            type: 'form',
            name: '菜单项',
            opts: {
              type: 'object',
              // 表单可绑定多实体，这是默认第一实体
              defaultEntity: 'platform_menu_item',
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
                linkType: {
                  control: 'radio',
                  title: '链接类型',
                  value: 'dynamicPage',
                  data: [
                    {text: '动态页面', value: 'dynamicPage'},
                    {text: '其它页面', value: 'other'}
                  ],
                },
                href: {
                  control: 'input',
                  title: '链接',
                  tips: '/#/m/platform-core/pages/PageLoader?p=form-combination_Ygvv7IXs',
                  placeholder: '/#/m/platform-core/pages/PageLoader?p=form-combination_Ygvv7IXs',
                  readonly: "gs:$ctx.form.linkType==='dynamicPage'",
                  js: "gs:$ctx.form.linkType==='dynamicPage'?$ctx.form.href='/#/m/platform-core/pages/PageLoader?p='+$ctx.form.pageCode:null"
                },
                pageCode: {
                  control: 'input',
                  title: '页面编码',
                  tips: 'UI设计器中配置的页面编码',
                  placeholder: 'form-combination_Ygvv7IXs',
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
                  [{linkType: [4, 20]}],
                  [{pageCode: [4, 20]}],
                  [{href: [4, 20]}]
                ],
                hidden: {
                  // 各表单状态，需隐藏的内容
                  common: {pageCode: 'gs:$ctx.form.linkType!=="dynamicPage"'},
                  update: {},
                  create: {},
                  read: {}
                }
              },
              ds: {},
              vars: {}
            }
          }]
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
              title: "保存并关闭",
              click: "@:$ctx.save($ctx.$parent.close)"
            },
            {
              color: "primary",
              title: "保存不关闭",
              click: "@:$ctx.save()"
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
  }
}
