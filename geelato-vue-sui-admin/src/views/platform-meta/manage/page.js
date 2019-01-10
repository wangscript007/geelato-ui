export default {
  code: '',
  component: '/components/gl-form-combination/Index.vue',
  opts: {
    ui: {
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
            treeId: '1331557725930819513',
            treeName: 'geelato',
            // max: {left: 8, right: 8},
            // min: {left: 5, right: 11},
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
                  tableName: {
                    control: 'input',
                    title: '数据表名'
                  },
                  tableSchema: {
                    control: 'input',
                    title: '数据库名'
                  },
                  enabled: {
                    control: 'dropdown',
                    title: '启用',
                    data: [
                      {text: '已启用', value: '1'},
                      {text: '未启用', value: '0'}
                    ],
                    value: '1'
                  },
                  linked: {
                    control: 'dropdown',
                    title: '链接状态',
                    data: [
                      {text: '已链接', value: '1'},
                      {text: '未链接', value: '0'}
                    ],
                    value: '1'
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
            }
          }
        }
      ]
    }
  }
}
