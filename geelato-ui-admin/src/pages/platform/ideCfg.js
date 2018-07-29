class IdeCfg {
  constructor () {
    this.pageCfgs = [
      // 项目管理
      {
        code: 'ide-user-list',
        component: '/components/page/table',
        opts: {
          ui: {
            title: '用户信息',
            entity: 'sys_user',
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
                  {field: 'name', title: '名称', cop: 'eq', type: 'string'},
                  {field: 'loginName', title: '登录名', cop: 'contains', type: 'string', lop: 'or'},
                  {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
                  // {field: 'active', title: '激活', cop: 'eq', type: 'boolean', default: false},
                  // {field: 'birthday', title: '生日', cop: 'gte', type: 'date', format: 'yyyy-mm-dd'},
                  // {
                  //   field: 'sex',
                  //   title: '性别',
                  //   cop: 'eq',
                  //   type: 'select',
                  //   default: 'male',
                  //   options: [{key: '男', value: 'male'}, {key: '女', value: 'female'}]
                  // }
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
                      title: '用户信息',
                      type: 'href',
                      value: '/components/page/TableForm.vue',
                      opts: {
                        entityName: 'sys_user',
                        fields: 'id,name,loginName,description',
                        layout: [
                          [{name: [4, 8]}, {loginName: [4, 8]}],
                          [{description: [4, 20]}]
                        ]
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
                      title: '用户信息',
                      type: 'href',
                      value: '/components/page/TableForm.vue',
                      opts: {
                        entityName: 'sys_user',
                        fields: 'id,name,loginName,description',
                        layout: [
                          [{loginName: [4, 8]}, {name: [4, 8]}],
                          [{description: [4, 20]}]
                        ],
                        model: {id: '@.id'}
                      }
                    }
                  }
                  // {
                  //   title: '详细',
                  //   click: 'modal',
                  //   modal: {
                  //     type: 'page',
                  //     value: 'sys_user_list_detail',
                  //     opts: {}
                  //   }
                  // }
                ]
              },
              columns: [
                {field: 'id', title: '', visible: false},
                {field: 'name', title: '名称', type: 'string', format: ''},
                {field: 'loginName', title: '登录名', type: 'string', format: ''},
                {field: 'description', title: '描述', type: 'string', format: ''}
              ],
              p: '1,10',
              order: 'name|+'
            },
            stat: ''
          }
        }
      }
    ]
  }
}

let instance = new IdeCfg()
export default instance
