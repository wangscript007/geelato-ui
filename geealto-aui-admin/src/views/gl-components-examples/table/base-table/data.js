export default {
  code: '',
  component: '',
  opts: {
    title: '用户信息',
    entity: 'platform_user',
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
          { field: 'name', title: '名称', cop: 'eq', type: 'string' },
          { field: 'loginName', title: '登录名', cop: 'contains', type: 'string', lop: 'or', placeholder: '登录名' },
          { field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and' },
          { field: 'active', title: '激活', cop: 'eq', type: 'boolean', default: true },
          { field: 'active1', title: '单位', cop: 'eq', type: 'string', default: '' },
          { field: 'active2', title: '学历', cop: 'eq', type: 'string', default: '' },
          { field: 'active3', title: '岗位', cop: 'eq', type: 'string', default: '' },
          { field: 'birthday', title: '生日', cop: 'gte', type: 'date', format: 'yyyy-mm-dd' }
          // {
          //   field: 'sex',
          //   title: '性别',
          //   cop: 'eq',
          //   type: 'select',
          //   default: 'male',
          //   options: [{key: '男', value: 'male'}, {key: '女', value: 'female'}]
          // }
        ],
        // 取值 1~4、6
        fieldPerRow: 4
      }
    },
    toolbar: {
      actions: [
        {
          title: '创建',
          click: 'modal',
          modal: {
            title: '用户信息',
            type: 'staticPage',
            value: '/components/gl-form-simple/Index.vue',
            opts: {
              ui: {
                entityName: 'platform_user',
                fields: 'id,name,loginName,description',
                layout: [
                  [{ name: [4, 8] }, { loginName: [4, 8] }],
                  [{ description: [4, 20] }]
                ]
              }
            }
          }
        },
        { title: '删除', click: 'delete', confirm: '确定删除？' }
        // // 弹出页面提示导出多少条记录
        // {title: '导出EXCEL', click: 'xls'},
        // // 弹出页面提示导出多少条记录
        // {title: '导出PDF', click: 'pdf'},
        // // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
        // {title: '打印', click: 'print'}
      ],
      css: { align: 'right' }
    },
    info: '',
    table: {
      select: { field: 'id', title: '', type: 'checkbox' },
      dropdown: {
        title: '操作',
        actions: [
          {
            title: '修改',
            click: 'modal',
            modal: {
              title: '用户信息',
              type: 'staticPage',
              value: '/components/gl-form-simple/Index.vue',
              opts: {
                ui: {
                  entityName: 'platform_user',
                  fields: 'id,name,loginName,description',
                  layout: [
                    [{ loginName: [4, 8] }, { name: [4, 8] }],
                    [{ description: [4, 20] }]
                  ],
                  model: { id: '@.id' }
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
      columnsx: [
        { field: 'id', title: '', visible: false },
        { field: 'name', title: '名称', type: 'string', format: '' },
        { field: 'loginName', title: '登录名', type: 'string', format: '' },
        { field: 'sex', title: '性别', type: 'string', format: '', dict: 'sex' },
        { field: 'mobilePhone', title: '手机', type: 'string', format: '' },
        { field: 'email', title: '邮箱', type: 'string', format: '' },
        // {field: 'bu', title: '单位', type: 'string', format: ''},
        // {field: 'dept', title: '部门', type: 'string', format: ''},
        { field: 'seq', title: '次序', type: 'string', format: '' },
        { field: 'description', title: '描述', type: 'string', format: '' }
      ],
      columns: [
        { title: '#', dataIndex: 'id', scopedSlots: { customRender: 'serial' } },
        { title: '名称', dataIndex: 'name', sorter: true },
        { title: '登录名', dataIndex: 'loginName', sorter: true },
        { title: '手机', dataIndex: 'mobilePhone' },
        { title: '性别', dataIndex: 'sex', sorter: true, customRender: (text) => text === 0 ? '男' : '女' },
        { title: '邮箱', dataIndex: 'email' },
        { title: '次序', dataIndex: 'seq' },
        { title: '描述', dataIndex: 'description' },
        // {
        //   title: '服务调用次数',
        //   dataIndex: 'callNo',
        //   sorter: true,
        //   needTotal: true,
        //   customRender: (text) => text + ' 次'
        // },
        // {
        //   title: '状态',
        //   dataIndex: 'status',
        //   needTotal: true
        // },
        // {
        //   title: '更新时间',
        //   dataIndex: 'updatedAt',
        //   sorter: true
        // },
        {
          title: '操作',
          dataIndex: '',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      p: '1,10',
      order: 'name|+'
    },
    stat: ''
  }
}
