import listDataTemplate from '../table/dataTemplate.js'

/**
 *  默认示例数据
 */
export default {
  form: {
    type: 'form',
    name: 'platform_demo_entity',
    opts: {
      type: 'object',
      // 表单可绑定多实体，这是默认第一实体
      defaultEntity: 'platformUser',
      // update|create|read
      state: 'save',
      properties: {
        // 设置该id:{}，便于子实体中依赖该id
        id: {},
        name: {
          control: 'input',
          title: '名称',
          // 是否禁用
          disabled: true,
          // 是否只读
          readonly: false
          // 是否隐藏，hidden隐藏与否在layout中控制，故没有hidden这个配置
        },
        loginName: {
          control: 'input',
          title: '登录名',
          rules: [
            {
              type: 'empty',
              prompt: '请输入登录名'
            }
          ]
        },
        password: {
          control: 'password',
          title: '密码',
          tips: '至少6位',
          rules: [
            {
              type: 'empty',
              prompt: '请输入密码'
            },
            {
              type: 'minLength[6]',
              prompt: '密码长度至少6位'
            }
          ]
        },
        confirmPassword: {
          control: 'password',
          title: '确认密码',
          rules: [
            {
              type: 'match[password]',
              prompt: '两次输入的密码不一致'
            }
          ]
        },
        email: {
          control: 'email',
          title: '邮箱',
          placeholder: 'xxx@xxx.xxx',
        },
        age: {
          control: 'input',
          title: '年龄',
          // 值
          value: '20',
        },
        avatar: {
          control: 'image',
          title: '头像',
          value: 'elliot',
        },
        sex: {
          control: 'dropdown',
          title: '性别',
          // 若数据是动态生产成，可配置ds，基于ds加载的数据最终会设置到data中
          data: [
            {text: '保密', value: ''},
            {text: '男', value: 'male'},
            {text: '女', value: 'female'}
          ],
          value: ''
        },
        tel: {
          control: 'input',
          title: '电话',
          // 如果实体的字段名称与tel不一样，或因多实体都存在tel字段，可通过field指定，field未设置时，相关于field:'tel'
          field: 'telephone',
          // 若字段需绑定其它实体，该通过该属性设置
          entity: 'platformUser',
          placeholder: '电话号码',
          rules: [
            {
              type: 'empty',
              prompt: '请输入电话号码'
            }
          ]
        },
        province: {
          control: 'dropdown',
          title: '省份',
          ds: 'province',
          // 广东省
          value: '440000'
        },
        city: {
          control: 'dropdown',
          title: '城市',
          // 基于数据源，数源名称可自取，如cityDS，不一定需等于本属性名
          ds: 'city'
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
        code: {
          control: 'input',
          title: 'DEMO编码',
          entity: 'platformDemoEntity',
          description: '这是另一个实体的字段'
        },
        demoName: {
          control: 'input',
          title: 'DEMO名称',
          // 已存在同名的name，这里重命名为demoName
          field: 'name',
          entity: 'platformDemoEntity',
          description: '这是另一个实体的字段'
        },
        demoDescription: {
          control: 'textarea',
          title: 'DEMO描述',
          // 该值$ctx.id在服务端运行求解
          isComputeInServer: true,
          value: '$ctx.id',
          // 已存在同名的name，这里重命名为demoName
          field: 'description',
          entity: 'platformDemoEntity',
          description: '这是另一个实体的字段'
        },
        // userId: {
        //     control: 'input',
        //     title: '用户id',
        //     isComputeInServer: true,
        //     value: '$ctx.id',
        //     entity: 'platformRole',
        //     description: '角色实体的userId依赖，用户实体的id'
        // }
        // ,
        roleDescription: {
          control: 'input',
          title: '角色描述',
          isComputeInServer: true,
          value: '$ctx.demoDescription',
          field: 'description',
          entity: 'platformRole',
          description: '角色实体的description依赖platformDemoEntity实体的demoDescription'
        }
        ,
        AppDescription: {
          control: 'input',
          title: '用户描述',
          isComputeInServer: true,
          value: '$ctx.roleDescription',
          field: 'description',
          entity: 'platformApp',
          description: 'app实体的description依赖platformRole实体的roleDescription'
        }
      },
      layout: {
        type: 'table',
        data: [
          // [label colSpan,rowSpan,field colSpan,rowSpan]
          [{name: [4, 8]}, {avatar: [4, 8, 4]}],
          [{loginName: [4, 8]}],
          [{email: [4, 8]}],
          [{age: [4, 8]}],
          [{sex: [4, 8]}, {tel: [4, 8]}],
          [{province: [4, 8]}, {city: [4, 8]}],
          [{password: [4, 8]}, {confirmPassword: [4, 8]}],
          [{enable: [4, 8]}, {'': [4, 8]}],
          [{code: [4, 8]}, {demoName: [4, 8]}],
          [{description: [4, 20]}]
        ],
        hidden: {
          // 各表单状态，需隐藏的内容
          update: {password: 1, confirmPassword: 2},
          create: {},
          read: {}
        }
      },
      ds: {
        province: {
          entity: 'platform_province',
          // default false
          lazy: false,
          // 支持字段重命名
          fields: 'name text,code value',
          description: '这是一个拉列表数据源'
        },
        city: {
          entity: 'platform_city',
          lazy: true,
          fields: 'name text,code value',
          // 带参数查询的数据源
          params: {
            // 该信息会自动加入计算属性中，当province的值变动时，该数据源会重新加载计算
            provinceCode: 'gs:$ctx.form.province'
          },
          description: '这是一个拉列表数据源，带参数'
        }
      },
      vars: {
        myVarA: {
          description: '这是一个变量，常量名字为myVarA，值为30',
          value: '30'
        }
      }
    }
  },
  treeForm: {
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
      treeId: "opts.ui.model.id",
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
  },
  tabs: {
    type: 'tab',
    name: '',
    items: [
      {
        type: 'form',
        name: 'form1',
        opts: {
          layout: '', // html
          theme: '', // vue file
          fields: [],
          rules: [] // validate rules
        }
      },
      {
        type: 'form',
        name: 'form2',
        opts: {
          layout: '', // html
          theme: '', // vue file
          fields: [],
          rules: [] // validate rules
        }
      }]
  },
  header: {
    type: 'header',
    name: '标题...',
    opts: {}
  },
  toolbar: {
    type: 'toolbar',
    name: '',
    opts: {
      appendToParent: false,
      css: {
        aligned: 'center', // left|right|center
        dividing: true
      },
      actions: [
        // {title: '保存', color: 'primary', click: 'fn', fn: 'this.save'},
        // {title: '打开', color: 'primary', click: 'fn', fn: 'this.openPage'},
        // {
        //   title: '创建',
        //   click: 'modal',
        //   modal: {
        //     title: '编辑示例实体',
        //     type: 'page',
        //     value: '/components/page/PageLoader.vue',
        //     opts: {
        //       code: '',
        //       query: {}
        //       // entityName: 'platform_demo_entity',
        //       // fields: 'id,name,type,code,content,description',
        //       // layout: [
        //       //   [{name: [4, 8]}, {code: [4, 8]}],
        //       //   [{type: [4, 8]}],
        //       //   [{content: [4, 20]}],
        //       //   [{description: [4, 20]}]
        //       // ]
        //     }
        //   },
        //   color: 'primary'
        // },
        {title: '删除2', click: 'delete', confirm: '确定删除？', color: 'negative'}
      ]
    }
  },
  list: listDataTemplate.simple
}
