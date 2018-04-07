// import staticCfgManager from '../staticCfgManager'

class SecurityCfg {
  constructor () {
    this.pageCfgs = [
      // 用户管理
      {
        code: 'sys-user-list',
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
            toolbar: {create: {}},
            info: '',
            table: {
              select: {field: 'id', title: '', type: 'checkbox'},
              dropdown: {
                title: '操作',
                action: [{title: '修改', click: 'open', disable: ':id > 0'}, {title: '修改2', click: 'open'}, {
                  title: '详细',
                  click: 'javascript:alert(\'aaaa\')'
                }, {title: '修改3', click: 'open'}]
              },
              columns: [
                // {field: 'id', title: '', type: 'checkbox'},

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
      },
      // 角色管理
      {
        code: 'sys-role-list',
        component: '/components/page/table',
        opts: {
          ui: {
            mode: 'select',
            title: '角色信息',
            entity: 'sys_role',
            query: {
              // 是否隐藏整个查询区域
              show: true,
              // null或''表示不展示tree过滤区域
              tree: null,
              // null或''表示不展示常用过滤器区域
              filter: null,
              // null或''表示不展示综合查询区域
              mix: {
                // 可用于查询的字段
                fields: [
                  // cop：比较操作符，eq：等于；default：默认值
                  {field: 'name', title: '名称', cop: 'eq', type: 'string', defalut: '张', placeholder: ''},
                  // cop：比较操作符，contains：包含；lop：逻辑操作符，or：或者
                  {field: 'code', title: '编码', cop: 'contains', type: 'string', lop: 'or'},
                  // and：并且
                  {field: 'description', title: '描述', cop: 'contains', type: 'string', lop: 'and'}
                ]
              }
            },
            // --end query --
            toolbar: {
              title: '',
              dropdown: {
                title: '',
                actions: [
                  {title: '创建', click: 'modal', modal: {}},
                  {title: '删除', click: 'delete', confirm: '确定删除？'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出EXCEL', click: 'xls'},
                  // 弹出页面提示导出多少条记录
                  {title: '导出PDF', click: 'pdf'},
                  // 默认打印当前列表，若print需要特殊的内容，可以用自定义javascrpt:;来实现
                  {title: '打印', click: 'print'}
                ]
              }
            },
            tips: {
              // 展示位置：header|footer|none，当为none或空时，则不展示。
              display: 'none',
              // 提示内容，html格式
              html: '<div>这是提示内容<div>'
            },
            // 选择的行数据
            selected: [],
            table: {
              // type：checkbox、radio；title默认为空，可选。
              select: {field: 'id', title: '选择', type: 'checkbox'},
              dropdown: {
                title: '操作',
                actions: [
                  {title: '修改', click: 'open', disable: 'javascript:@.id > 0'},
                  {
                    title: '详细',
                    click: 'modal',
                    modal: {
                      type: 'page',
                      value: 'sys_role_list_detail',
                      query: {}
                    }
                  },
                  {title: '直接调用js', click: 'javascript:alert(\'aaaa\')'}]
              },
              columns: [
                {field: 'id', title: '序号', visible: false},
                {field: 'name', title: '名称', type: 'string', format: ''},
                {field: 'code', title: '编码', type: 'string', format: ''},
                {field: 'description', title: '描述', type: 'string', format: ''}
              ],
              p: '1,10',
              order: 'name|+'
            },
            stat: '',
            // 状态
            state: {
              selectedRows: {},
              clickedRow: {}
            }
          }
        }
      },
      // 角色详情
      {
        code: 'sys-role-list-detail',
        component: 'page/tab-view',
        opts: {
          title: '角色详情',
          info: '',
          state: {},
          activeIndex: 1,
          tabs: [
            {title: '基本信息', html: '<p style="text-align: center">角色基本信息</p>', href: '', page: {}},
            {
              title: '角色用户',
              html: '<p style="text-align: center">角色用户信息</p>',
              href: '',
              page: {pageCode: 'sys-role-ref-user-list', query: ''}
            },
            {title: '角色权限', html: '<p style="text-align: center">角色权限清单</p>', href: '', page: {}}
          ],
          footer: {
            action: {}
          }
        }
      }
    ]
  }
}

let instance = new SecurityCfg()
// staticCfgManager.register(instance)
export default instance
